import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function App() {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const savedUser = localStorage.getItem('octofit_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('octofit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('octofit_user');
    }
  }, [user]);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
          <Route path="/activities" element={user ? <Activities user={user} /> : <Navigate to="/" />} />
          <Route path="/teams" element={user ? <Teams user={user} /> : <Navigate to="/" />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navbar({ user, setUser }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/octofitapp-small.png" alt="OctoFit" height="40" className="d-inline-block align-top me-2" />
          OctoFit Tracker
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm ms-2" onClick={() => setUser(null)}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Home({ setUser }) {
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      // Simple mock login for demo purposes
      setUser({ username: username.trim() });
      // Use a slight delay to ensure state is updated
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <img src="/octofitapp-small.png" alt="OctoFit" className="mb-4" style={{ maxWidth: '200px' }} />
          <h1 className="display-4">Welcome to OctoFit Tracker</h1>
          <p className="lead">Track your fitness journey, compete with your team, and achieve your goals!</p>
          
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Quick Login (Demo)</h5>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username (john_doe, jane_smith, mike_wilson, or sarah_jones)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">📊 Track Activities</h5>
                  <p className="card-text">Log your workouts and monitor your progress</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">👥 Join Teams</h5>
                  <p className="card-text">Compete with classmates and stay motivated</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">🏆 Leaderboard</h5>
                  <p className="card-text">See how you rank against others</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch user stats from API
    fetch(`${API_BASE_URL}/activities/my_activities/`)
      .then(res => res.json())
      .then(data => {
        const totalDuration = data.reduce((sum, act) => sum + act.duration, 0);
        const totalCalories = data.reduce((sum, act) => sum + (act.calories || 0), 0);
        setStats({
          totalActivities: data.length,
          totalDuration,
          totalCalories,
          recentActivities: data.slice(0, 5)
        });
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Welcome back, {user.username}! 👋</h2>
      
      {stats && (
        <>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h3>{stats.totalActivities}</h3>
                  <p className="text-muted">Total Activities</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h3>{stats.totalDuration} min</h3>
                  <p className="text-muted">Total Duration</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h3>{stats.totalCalories}</h3>
                  <p className="text-muted">Calories Burned</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5>Recent Activities</h5>
            </div>
            <div className="card-body">
              {stats.recentActivities.length > 0 ? (
                <ul className="list-group">
                  {stats.recentActivities.map(activity => (
                    <li key={activity.id} className="list-group-item">
                      <strong>{activity.activity_type}</strong> - {activity.duration} min on {activity.date}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No activities yet. Start logging your workouts!</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Activities({ user }) {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    activity_type: 'running',
    duration: '',
    distance: '',
    calories: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    fetch(`${API_BASE_URL}/activities/my_activities/`)
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error('Error fetching activities:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would POST to the API
    console.log('Submitting activity:', formData);
    setShowForm(false);
    // Reset form
    setFormData({
      activity_type: 'running',
      duration: '',
      distance: '',
      calories: '',
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Activities</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Log Activity'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Log New Activity</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Activity Type</label>
                  <select 
                    className="form-select"
                    value={formData.activity_type}
                    onChange={(e) => setFormData({...formData, activity_type: e.target.value})}
                  >
                    <option value="running">Running</option>
                    <option value="cycling">Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="walking">Walking</option>
                    <option value="weightlifting">Weight Lifting</option>
                    <option value="yoga">Yoga</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Distance (km)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="form-control"
                    value={formData.distance}
                    onChange={(e) => setFormData({...formData, distance: e.target.value})}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Calories</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={formData.calories}
                    onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Notes</label>
                  <textarea 
                    className="form-control"
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Save Activity</button>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5>Activity History</h5>
        </div>
        <div className="card-body">
          {activities.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Distance</th>
                    <th>Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map(activity => (
                    <tr key={activity.id}>
                      <td>{activity.date}</td>
                      <td>{activity.activity_type}</td>
                      <td>{activity.duration} min</td>
                      <td>{activity.distance ? `${activity.distance} km` : '-'}</td>
                      <td>{activity.calories || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No activities logged yet. Start tracking your workouts!</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Teams({ user }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/teams/`)
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row mt-4">
        {teams.map(team => (
          <div key={team.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{team.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{team.description}</p>
                <p><strong>Captain:</strong> {team.captain.username}</p>
                <p><strong>Members:</strong> {team.member_count}</p>
                <div>
                  <strong>Team Members:</strong>
                  <ul className="mt-2">
                    {team.members.map(member => (
                      <li key={member.id}>{member.username}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/activities/leaderboard/`)
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>🏆 Leaderboard</h2>
      <div className="card mt-4">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Total Duration (min)</th>
                <th>Total Calories</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.user__id}>
                  <td>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && index + 1}
                  </td>
                  <td>{entry.user__username}</td>
                  <td>{entry.total_duration || 0}</td>
                  <td>{entry.total_calories || 0}</td>
                  <td>{entry.activity_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [difficulty, setDifficulty] = useState('all');

  useEffect(() => {
    const url = difficulty === 'all' 
      ? `${API_BASE_URL}/workouts/`
      : `${API_BASE_URL}/workouts/suggestions/?difficulty=${difficulty}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => console.error('Error fetching workouts:', err));
  }, [difficulty]);

  return (
    <div className="container mt-4">
      <h2>💪 Workout Suggestions</h2>
      
      <div className="mb-4">
        <label className="form-label">Filter by difficulty:</label>
        <select 
          className="form-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="row">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="mb-0">{workout.title}</h5>
                <span className={`badge bg-${
                  workout.difficulty_level === 'beginner' ? 'success' :
                  workout.difficulty_level === 'intermediate' ? 'warning' : 'danger'
                }`}>
                  {workout.difficulty_level}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                <p><strong>Duration:</strong> {workout.duration} minutes</p>
                <p><strong>Target Muscles:</strong> {workout.target_muscles}</p>
                <p><strong>Equipment:</strong> {workout.equipment_needed || 'None'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
