import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { mockProjects, Project, mockApplications, Application } from '../../data/mockData';

function AvailableProjects() {
  // Load projects and applications from localStorage or use mock data
  const [availableProjects, setAvailableProjects] = useState<Project[]>(() => {
    const storedProjects = localStorage.getItem('projectsData');
    return storedProjects ? JSON.parse(storedProjects) : mockProjects;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const storedApplications = localStorage.getItem('applicationsData');
    return storedApplications ? JSON.parse(storedApplications) : mockApplications;
  });

  useEffect(() => {
    // Load saved data from localStorage when the component mounts
    const storedProjects = localStorage.getItem('projectsData');
    if (storedProjects) setAvailableProjects(JSON.parse(storedProjects));

    const storedApplications = localStorage.getItem('applicationsData');
    if (storedApplications) setApplications(JSON.parse(storedApplications));
  }, []);

  const handleApply = (projectId: string) => {
    const studentId = 'std1'; // Placeholder - should be dynamically set from logged-in user
    const studentName = 'John Doe'; // Placeholder - should be dynamically set from logged-in user

    // Check if student has already applied for this project
    if (applications.some(app => app.studentId === studentId && app.projectId === projectId)) {
      alert('You have already applied for this project.');
      return;
    }

    // Update project status to 'assigned'
    const updatedProjects = availableProjects.map(project =>
      project.id === projectId
        ? { ...project, status: 'assigned' as Project['status'] }
        : project
    );

    // Create new application entry
    const newApplication: Application = {
      id: `${applications.length + 1}`,
      studentId,
      studentName,
      projectId,
      projectTitle: availableProjects.find(p => p.id === projectId)?.title || '',
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    const updatedApplications = [...applications, newApplication];

    // Update state and persist data
    setAvailableProjects(updatedProjects);
    setApplications(updatedApplications);
    localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
    localStorage.setItem('applicationsData', JSON.stringify(updatedApplications));

    alert('Application submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableProjects
          .filter(project => project.status === 'available')
          .map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Available
                </span>
              </div>
              <p className="text-gray-600">{project.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Mentor:</span>
                <span className="ml-2">{project.mentor}</span>
              </div>
              <button
                onClick={() => handleApply(project.id)}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent
                         rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send className="h-4 w-4 mr-2" />
                Apply for Project
              </button>
            </div>
          ))}
      </div>

      {availableProjects.filter(project => project.status === 'available').length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No available projects at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default AvailableProjects;
