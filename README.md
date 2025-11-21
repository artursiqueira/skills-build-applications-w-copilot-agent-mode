# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey artursiqueira!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

- **Who is this for**: Intermediate developers familiar with GitHub Copilot, basic GitHub, and basic web development
- **What you'll learn**: We'll introduce GitHub Copilot agent mode and how to use it for application development.
- **What you'll build**: You'll use GitHub Copilot agent mode to create a fitness application as the gym teacher of a high school.
- **Prerequisites**: Skills Exercise: <a href="https://github.com/skills/getting-started-with-github-copilot">Getting Started with GitHub Copilot</a>.
- **How long**: This course takes less than one hour to complete.

In this exercise, you will:

1. Start up a preconfigured development environment for making a multi-tier application.
1. Prompt in GitHub Copilot Chat and select the edit tab and select agent mode from the edit/agent drop-down.
1. In this exercise I primarily used the latest default LLM.
1. Try other LLM models to see other output.
1. For each step open up a new Copilot Chat session by hitting the plus `+` icon in the Copilot Chat pane.

## OctoFit Tracker - Fitness Application

This repository contains the **OctoFit Tracker**, a full-stack fitness application for high school gym classes. The application helps students track their activities, join teams, compete on leaderboards, and get personalized workout suggestions.

### Features

- 👤 **User Authentication & Profiles** - Manage user profiles with fitness goals
- 📊 **Activity Tracking** - Log workouts with duration, distance, and calories
- 👥 **Team Management** - Create and join teams for group challenges
- 🏆 **Leaderboard** - Competitive rankings based on activity metrics
- 💪 **Workout Suggestions** - Personalized workout recommendations by difficulty level

### Technology Stack

**Backend:**
- Django 4.1.7
- Django REST Framework
- SQLite Database
- CORS support for frontend integration

**Frontend:**
- React 19
- Bootstrap 5
- React Router for navigation
- Responsive design

### Project Structure

```
octofit-tracker/
├── backend/
│   ├── octofit_tracker/       # Django project settings
│   ├── fitness/               # Main fitness app
│   │   ├── models.py         # Data models (UserProfile, Team, Activity, Workout)
│   │   ├── serializers.py    # API serializers
│   │   ├── views.py          # API views and endpoints
│   │   └── admin.py          # Django admin configuration
│   ├── manage.py
│   ├── requirements.txt
│   └── venv/                 # Python virtual environment
└── frontend/
    ├── src/
    │   ├── App.js            # Main React application
    │   ├── App.css           # Styling
    │   └── index.js          # Entry point
    ├── public/
    │   └── octofitapp-small.png  # App logo
    └── package.json
```

### Setup Instructions

#### Prerequisites

- Python 3.12+
- Node.js 20+
- npm 10+

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd octofit-tracker/backend
   ```

2. Create and activate virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

6. Populate sample data:
   ```bash
   python manage.py populate_data
   ```

7. Start the development server:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

The backend API will be available at `http://localhost:8000/api/`

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd octofit-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### API Endpoints

- `GET /api/` - API root with available endpoints
- `GET /api/profiles/` - User profiles
- `GET /api/teams/` - Teams list
- `POST /api/teams/{id}/join/` - Join a team
- `POST /api/teams/{id}/leave/` - Leave a team
- `GET /api/activities/` - Activities list
- `GET /api/activities/my_activities/` - Current user's activities
- `GET /api/activities/leaderboard/` - Leaderboard rankings
- `GET /api/workouts/` - Workout suggestions
- `GET /api/workouts/suggestions/?difficulty=beginner` - Filtered workout suggestions

### Sample Users

After running `populate_data`, you can use these test accounts:
- `john_doe` (Running Warriors team captain)
- `jane_smith` (Running Warriors team member)
- `mike_wilson` (Gym Rats team captain)
- `sarah_jones` (Gym Rats team member)

Password for all test users: `password123`

### Development Notes

- The backend uses Django's built-in authentication
- CORS is enabled for frontend-backend communication
- The frontend uses proxy configuration to forward API requests to the backend
- Both servers must be running for the full application to work

### How to start this exercise

Simply copy the exercise to your account, then give your favorite Octocat (Mona) **about 20 seconds** to prepare the first lesson, then **refresh the page**.

[![](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=arilivigni&template_name=build-applications-w-copilot-agent-mode&owner=%40me&name=skills-build-applications-w-copilot-agent-mode&description=Exercise:+Build+applications+with+GitHub+Copilot+agent+mode&visibility=public)

<details>
<summary>Having trouble? 🤷</summary><br/>

When copying the exercise, we recommend the following settings:

- For owner, choose your personal account or an organization to host the repository.

- We recommend creating a public repository, since private repositories will use Actions minutes.

If the exercise isn't ready in 20 seconds, please check the "Actions" tab of your repository (or visit `https://github.com/<YOUR-USERNAME>/<YOUR-REPO>/actions`).

- Check to see if a job is running. Sometimes it simply takes a bit longer.

- If the page shows a failed job, please submit an issue. Nice, you found a bug! 🐛

</details>
[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/artursiqueira/skills-build-applications-w-copilot-agent-mode/issues/2)

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

