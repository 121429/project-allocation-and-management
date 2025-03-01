import React from 'react';
import { FileCheck, Clock } from 'lucide-react';
import { mockProjects } from '../../data/mockData';

function MyProjects() {
  const assignedProjects = mockProjects.filter(project => project.status === 'assigned');

  const handleSubmit = (projectId: string) => {
    alert('Project submission functionality will be implemented here');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignedProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {project.status}
              </span>
            </div>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Deadline: {project.deadline}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Mentor:</span>
              <span className="ml-2">{project.mentor}</span>
            </div>
            <button
              onClick={() => handleSubmit(project.id)}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent
                       rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileCheck className="h-4 w-4 mr-2" />
              Submit Project
            </button>
          </div>
        ))}
      </div>
      
      {assignedProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects assigned yet.</p>
        </div>
      )}
    </div>
  );
}

export default MyProjects;