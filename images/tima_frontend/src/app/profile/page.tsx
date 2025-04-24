'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setFormData({ ...user });
    }
  }, [user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      const res = await api.put('/profiles/<int:pk>/', formData); // Make sure this is allowed in your Django backend
      setUser(res.data);
      setEditing(false);
      alert('Profile updated!');
    } catch {
      alert('Failed to update profile.');
    }
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <input name="username" value={formData.username} onChange={handleChange} disabled />
      <input name="email" value={formData.email} onChange={handleChange} disabled={!editing} />
      <input name="first_name" value={formData.first_name} onChange={handleChange} disabled={!editing} />
      <input name="last_name" value={formData.last_name} onChange={handleChange} disabled={!editing} />
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEditing(true)}>Edit</button>
      )}
    </div>
  );
}
