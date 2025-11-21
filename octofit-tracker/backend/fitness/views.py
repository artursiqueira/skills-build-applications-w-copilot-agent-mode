from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from django.db.models import Sum, Count
from .models import UserProfile, Team, Activity, Workout
from .serializers import UserProfileSerializer, TeamSerializer, ActivitySerializer, WorkoutSerializer, UserSerializer

# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own profile
        if self.request.user.is_staff:
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=self.request.user)


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        # Set the creator as captain
        team = serializer.save(captain=self.request.user)
        team.members.add(self.request.user)
    
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        """Join a team"""
        team = self.get_object()
        team.members.add(request.user)
        return Response({'status': 'joined team'})
    
    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        """Leave a team"""
        team = self.get_object()
        if team.captain == request.user:
            return Response(
                {'error': 'Captain cannot leave the team'},
                status=status.HTTP_400_BAD_REQUEST
            )
        team.members.remove(request.user)
        return Response({'status': 'left team'})


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Users can see their own activities and their team members' activities
        user = self.request.user
        user_teams = user.teams.all()
        team_members = User.objects.filter(teams__in=user_teams).distinct()
        return Activity.objects.filter(user__in=team_members)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_activities(self, request):
        """Get current user's activities"""
        activities = Activity.objects.filter(user=request.user)
        serializer = self.get_serializer(activities, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def leaderboard(self, request):
        """Get leaderboard based on total activity duration"""
        leaderboard_data = Activity.objects.values(
            'user__username', 'user__id'
        ).annotate(
            total_duration=Sum('duration'),
            total_calories=Sum('calories'),
            activity_count=Count('id')
        ).order_by('-total_duration')[:10]
        
        return Response(leaderboard_data)


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def suggestions(self, request):
        """Get workout suggestions based on user's fitness level"""
        difficulty = request.query_params.get('difficulty', 'beginner')
        workouts = Workout.objects.filter(difficulty_level=difficulty)
        serializer = self.get_serializer(workouts, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def api_root(request):
    """API root endpoint"""
    return Response({
        'profiles': '/api/profiles/',
        'teams': '/api/teams/',
        'activities': '/api/activities/',
        'workouts': '/api/workouts/',
        'leaderboard': '/api/activities/leaderboard/',
    })

