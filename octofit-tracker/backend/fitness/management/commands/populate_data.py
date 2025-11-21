from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from fitness.models import UserProfile, Team, Activity, Workout
from datetime import date, timedelta
import random


class Command(BaseCommand):
    help = 'Populate database with sample fitness data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating database with sample data...')
        
        # Create sample users
        users_data = [
            {'username': 'john_doe', 'email': 'john@example.com', 'first_name': 'John', 'last_name': 'Doe'},
            {'username': 'jane_smith', 'email': 'jane@example.com', 'first_name': 'Jane', 'last_name': 'Smith'},
            {'username': 'mike_wilson', 'email': 'mike@example.com', 'first_name': 'Mike', 'last_name': 'Wilson'},
            {'username': 'sarah_jones', 'email': 'sarah@example.com', 'first_name': 'Sarah', 'last_name': 'Jones'},
        ]
        
        users = []
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name']
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(f'Created user: {user.username}')
            users.append(user)
        
        # Create user profiles
        for user in users:
            profile, created = UserProfile.objects.get_or_create(
                user=user,
                defaults={
                    'age': random.randint(15, 18),
                    'height': random.randint(160, 185),
                    'weight': random.randint(55, 80),
                    'fitness_goal': random.choice([
                        'Build muscle', 'Lose weight', 'Improve endurance', 'Stay healthy'
                    ])
                }
            )
            if created:
                self.stdout.write(f'Created profile for: {user.username}')
        
        # Create teams
        teams_data = [
            {'name': 'Running Warriors', 'description': 'We love to run!'},
            {'name': 'Gym Rats', 'description': 'Strength training enthusiasts'},
        ]
        
        teams = []
        for i, team_data in enumerate(teams_data):
            team, created = Team.objects.get_or_create(
                name=team_data['name'],
                defaults={
                    'description': team_data['description'],
                    'captain': users[i]
                }
            )
            if created:
                team.members.set(users[:2] if i == 0 else users[2:])
                self.stdout.write(f'Created team: {team.name}')
            teams.append(team)
        
        # Create activities
        activity_types = ['running', 'cycling', 'swimming', 'walking', 'weightlifting', 'yoga']
        for user in users:
            for i in range(10):
                activity_date = date.today() - timedelta(days=random.randint(0, 30))
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 90)
                
                Activity.objects.get_or_create(
                    user=user,
                    date=activity_date,
                    activity_type=activity_type,
                    defaults={
                        'duration': duration,
                        'distance': random.uniform(1, 15) if activity_type in ['running', 'cycling', 'walking'] else None,
                        'calories': duration * random.randint(5, 12),
                        'notes': f'Great {activity_type} session!'
                    }
                )
        
        self.stdout.write(f'Created activities for {len(users)} users')
        
        # Create workouts
        workouts_data = [
            {
                'title': 'Beginner Full Body Workout',
                'description': 'A complete full-body workout suitable for beginners. Includes push-ups, squats, and planks.',
                'difficulty_level': 'beginner',
                'duration': 30,
                'target_muscles': 'Full body',
                'equipment_needed': 'None'
            },
            {
                'title': 'Intermediate Cardio Blast',
                'description': 'High-intensity cardio workout with burpees, mountain climbers, and jumping jacks.',
                'difficulty_level': 'intermediate',
                'duration': 45,
                'target_muscles': 'Cardiovascular system',
                'equipment_needed': 'None'
            },
            {
                'title': 'Advanced Strength Training',
                'description': 'Intense strength training with weights. Includes bench press, deadlifts, and squats.',
                'difficulty_level': 'advanced',
                'duration': 60,
                'target_muscles': 'Chest, back, legs',
                'equipment_needed': 'Dumbbells, barbell'
            },
            {
                'title': 'Beginner Yoga Flow',
                'description': 'Gentle yoga flow focusing on flexibility and relaxation.',
                'difficulty_level': 'beginner',
                'duration': 30,
                'target_muscles': 'Full body flexibility',
                'equipment_needed': 'Yoga mat'
            },
        ]
        
        for workout_data in workouts_data:
            workout, created = Workout.objects.get_or_create(
                title=workout_data['title'],
                defaults=workout_data
            )
            if created:
                self.stdout.write(f'Created workout: {workout.title}')
        
        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample data!'))
