import React, { useState } from 'react';
import { GraduationCap, UserPlus, Users, UserCog, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type UserRole = 'student' | 'mentor' | 'coordinator' | null;

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const roles = [
    { id: 'student', title: 'Student', icon: Users, description: 'Apply for projects and take tests' },
    { id: 'mentor', title: 'Mentor', icon: UserCog, description: 'Guide students and review projects' },
    { id: 'coordinator', title: 'Project Coordinator', icon: UserPlus, description: 'Manage projects and oversee progress' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      alert('Please select a role before registering.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Retrieve existing users or create an empty array
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (storedUsers.some((user: any) => user.email === formData.email)) {
      alert('Email is already registered.');
      return;
    }

    // Create new user object
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: selectedRole,
    };

    // Store the updated users list in localStorage
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Account created successfully! You can now log in.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our platform to manage student projects and assessments
          </p>
        </div>

        {!selectedRole ? (
          // Role Selection
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as UserRole)}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 
                           transition-all duration-200 group focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex flex-col items-center text-center">
                  <role.icon className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Registration Form
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* Added Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700
                           hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500
                           focus:ring-offset-2 transition-colors font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 border border-transparent rounded-lg text-white
                           bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Register
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
