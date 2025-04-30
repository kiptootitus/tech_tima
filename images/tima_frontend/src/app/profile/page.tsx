'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      const res = await api.get('/profiles/me/');
      setProfile(res.data);
      setFormData(res.data); // populate form with user profile
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  }

  function handleAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev: any) => {
        return ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        });
    });
  }

  async function handleSave() {
    if (!profile?.id) return alert("Profile ID missing");

    try {
      const res = await api.put(`/profiles/${profile.id}/`, formData);
      setUser(res.data); // update global auth context
      setEditing(false);
      alert('Profile updated!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile.');
    }
  }

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Profile</h2>

      <label>Bio</label>
      <textarea
        name="bio"
        value={formData.bio || ''}
        onChange={handleChange}
        disabled={!editing}
      />

      <label>Birth Date</label>
      <input
        type="date"
        name="birth_date"
        value={formData.birth_date || ''}
        onChange={handleChange}
        disabled={!editing}
      />

      <label>Website</label>
      <input
        type="url"
        name="website"
        value={formData.website || ''}
        onChange={handleChange}
        disabled={!editing}
      />

      <h3>Address</h3>
      <input
        name="street"
        placeholder="Street"
        value={formData.address?.street || ''}
        onChange={handleAddressChange}
        disabled={!editing}
      />
      <input
        name="city"
        placeholder="City"
        value={formData.address?.city || ''}
        onChange={handleAddressChange}
        disabled={!editing}
      />
      <input
        name="state"
        placeholder="State"
        value={formData.address?.state || ''}
        onChange={handleAddressChange}
        disabled={!editing}
      />
      <input
        name="country"
        placeholder="Country"
        value={formData.address?.country || ''}
        onChange={handleAddressChange}
        disabled={!editing}
      />
      <input
        name="postal_code"
        placeholder="Postal Code"
        value={formData.address?.postal_code || ''}
        onChange={handleAddressChange}
        disabled={!editing}
      />

      <div style={{ marginTop: '1rem' }}>
        {editing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
}
