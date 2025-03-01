import React, { useState } from 'react';
import { LogIn, Mail, Lock, GraduationCap, Users, UserCog, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type UserRole = 'student' | 'mentor' | 'coordinator' | null;

interface RoleOption {
  id: UserRole;
  title: string;
  icon: React.ElementType;
  description: string;
}

const roles: RoleOption[] = [
  { 
    id: 'student',
    title: 'Student',
    icon: Users,
    description: 'Access projects and take tests'
  },
  { 
    id: 'mentor',
    title: 'Mentor',
    icon: UserCog,
    description: 'Review submissions and manage students'
  },
  { 
    id: 'coordinator',
    title: 'Project Coordinator',
    icon: UserPlus,
    description: 'Oversee projects and assignments'
  }
];

function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve registered users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Find matching user
    const user = storedUsers.find((u: any) => u.email === email && u.password === password && u.role === selectedRole);

    if (!user) {
      alert('Invalid credentials or incorrect role selected.');
      return;
    }

    // Save role & redirect
    localStorage.setItem('userRole', user.role);
    alert(`Welcome, ${user.fullName}!`);
    navigate('/dashboard');
  };

  const handleBack = () => {
    setShowForm(false);
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {showForm ? 'Welcome back' : 'Choose your role'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {showForm 
              ? 'Sign in to your account to continue' 
              : 'Select your role to access the appropriate dashboard'
            }
          </p>
        </div>

        {!showForm ? (
          // Role Selection
          <div className="grid gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-xl
                           hover:border-blue-500 transition-all duration-200 group
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-gray-400 group-hover:text-blue-500" />
                  </div>
                  <div className="ml-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          // Login Form
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            text-gray-900 placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            text-gray-900 placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700
                          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500
                          focus:ring-offset-2 transition-colors font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 relative flex justify-center py-2.5 px-4 border border-transparent
                          rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                          focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
                          font-medium"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
