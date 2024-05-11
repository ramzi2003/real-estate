from django.contrib import admin
from .models import Agents, AuthGroup, AuthGroupPermissions, AuthPermission, AuthUser, AuthUserGroups, AuthUserUserPermissions, ClientPropertyReservations, Clients, DjangoAdminLog, DjangoContentType, DjangoMigrations, DjangoSession, Properties

# Register your models here.

@admin.register(Agents)
class AgentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email')
    search_fields = ('name', 'email')

@admin.register(AuthGroup)
class AuthGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(AuthGroupPermissions)
class AuthGroupPermissionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'group', 'permission')
    search_fields = ('group__name', 'permission__name')

@admin.register(AuthPermission)
class AuthPermissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'content_type', 'codename')
    search_fields = ('name', 'codename')

@admin.register(AuthUser)
class AuthUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name')

@admin.register(AuthUserGroups)
class AuthUserGroupsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'group')
    search_fields = ('user__username', 'group__name')

@admin.register(AuthUserUserPermissions)
class AuthUserUserPermissionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'permission')
    search_fields = ('user__username', 'permission__name')

@admin.register(ClientPropertyReservations)
class ClientPropertyReservationsAdmin(admin.ModelAdmin):
    list_display = ('client', 'property')
    search_fields = ('client__name', 'property__address')

@admin.register(Clients)
class ClientsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email')
    search_fields = ('name', 'email')

@admin.register(DjangoAdminLog)
class DjangoAdminLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'action_time', 'user', 'content_type', 'object_repr', 'action_flag')
    search_fields = ('user__username', 'object_repr')

@admin.register(DjangoContentType)
class DjangoContentTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'app_label', 'model')
    search_fields = ('app_label', 'model')

@admin.register(DjangoMigrations)
class DjangoMigrationsAdmin(admin.ModelAdmin):
    list_display = ('id', 'app', 'name', 'applied')
    search_fields = ('app', 'name')

@admin.register(DjangoSession)
class DjangoSessionAdmin(admin.ModelAdmin):
    list_display = ('session_key', 'expire_date')
    search_fields = ('session_key',)

@admin.register(Properties)
class PropertiesAdmin(admin.ModelAdmin):
    list_display = ('id', 'address', 'city', 'country', 'price')
    search_fields = ('address', 'city', 'country')

