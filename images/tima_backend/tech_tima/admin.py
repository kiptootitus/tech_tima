from django.contrib import admin
from .models import Address, Profile

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('street', 'city', 'state', 'country', 'postal_code', 'user', 'created_at', 'updated_at')
    search_fields = ('street', 'city', 'state', 'country', 'postal_code')
    list_filter = ('country',)
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 20
    fieldsets = (
        (None, {
            'fields': ('street', 'city', 'state', 'country', 'postal_code')
        }),
        ('User Information', {
            'fields': ('user',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'profile_picture', 'address', 'birth_date', 'website', 'is_active', 'is_verified', 'created_at', 'updated_at')
    search_fields = ('user__username', 'bio')
    list_filter = ('is_active', 'is_verified')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 20
    fieldsets = (
        (None, {
            'fields': ('user', 'bio', 'profile_picture')
        }),
        ('Address Information', {
            'fields': ('address',)
        }),
        ('Personal Information', {
            'fields': ('birth_date', 'website', 'social_media_links')
        }),
        ('Status Information', {
            'fields': ('is_active', 'is_verified')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
