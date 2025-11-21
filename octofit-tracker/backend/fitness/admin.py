from django.contrib import admin
from .models import UserProfile, Team, Activity, Workout

# Register your models here.

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'age', 'height', 'weight', 'fitness_goal', 'created_at']
    search_fields = ['user__username', 'user__email']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'captain', 'created_at']
    search_fields = ['name', 'captain__username']
    filter_horizontal = ['members']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'activity_type', 'duration', 'distance', 'calories', 'date', 'created_at']
    list_filter = ['activity_type', 'date']
    search_fields = ['user__username']
    date_hierarchy = 'date'


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['title', 'difficulty_level', 'duration', 'target_muscles', 'created_at']
    list_filter = ['difficulty_level']
    search_fields = ['title', 'description']

