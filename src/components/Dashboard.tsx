import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X,
  LayoutDashboard,
  FolderKanban,
  FileSearch,
  GraduationCap,
  ClipboardList,
  Users,
  BookOpen,
  FileCheck,
  Settings,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import role-specific components
import MyProjects from './student/MyProjects';
import AvailableProjects from './student/AvailableProjects';
import TakeTest from './student/TakeTest';
import StudentApplications from './mentor/StudentApplications';
import ProjectSubmissions from './mentor/ProjectSubmissions';
import ReviewTests from './mentor/ReviewTests';
import ManageProjects from './coordinator/ManageProjects';
import AssignStudents from './coordinator/AssignStudents';
import MonitorTests from './coordinator/MonitorTests';

interface NavItem {
  name: string;
  icon: React.ElementType;
  roles: string[];
  component: React.ComponentType;
}

const navigation: NavItem[] = [
  { name: 'My Projects', icon: FolderKanban, roles: ['student'], component: MyProjects },
  { name: 'Available Projects', icon: FileSearch, roles: ['student'], component: AvailableProjects },
  { name: 'Take Test', icon: ClipboardList, roles: ['student'], component: TakeTest },
  { name: 'Student Applications', icon: Users, roles: ['mentor'], component: StudentApplications },
  { name: 'Project Submissions', icon: FileCheck, roles: ['mentor'], component: ProjectSubmissions },
  { name: 'Review Tests', icon: BookOpen, roles: ['mentor'], component: ReviewTests },
  { name: 'Manage Projects', icon: Settings, roles: ['coordinator'], component: ManageProjects },
  { name: 'Assign Students', icon: GraduationCap, roles: ['coordinator'], component: AssignStudents },
  { name: 'Monitor Tests', icon: ClipboardList, roles: ['coordinator'], component: MonitorTests },
];

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>('');

  useEffect(() => {
    // Get user details from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
      navigate('/');
      return;
    }

    const loggedInUser = storedUsers.find((u: any) => u.role === userRole);

    if (!loggedInUser) {
      alert('Invalid session. Please log in again.');
      localStorage.removeItem('userRole');
      navigate('/');
      return;
    }

    setUser({ fullName: loggedInUser.fullName, role: userRole });

    const defaultItem = navigation.find(item => item.roles.includes(userRole))?.name;
    if (defaultItem) {
      setSelectedItem(defaultItem);
    }
  }, [navigate]);

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const renderContent = () => {
    const navItem = navigation.find(item => item.name === selectedItem);
    if (!navItem) return null;

    const Component = navItem.component;
    return (
      <div className="p-6 w-full flex flex-col items-start">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{selectedItem}</h2>
        <div className="w-full">
          <Component />
        </div>
      </div>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Dashboard</span>
            </div>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* User info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold uppercase">
                    {user.fullName.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedItem(item.name)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedItem === item.name
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64 flex-1 flex flex-col items-start justify-start">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 lg:hidden w-full bg-white shadow-md">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <button
              className="text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <LayoutDashboard className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* Render the dynamic content */}
        <main className="flex-1 w-full">{renderContent()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
