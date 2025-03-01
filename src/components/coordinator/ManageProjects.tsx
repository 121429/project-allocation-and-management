import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash, Edit } from 'lucide-react';
import { mockProjects, Project } from '../../data/mockData';

function ManageProjects() {
  // Load projects from localStorage or fallback to mock data
  const [projects, setProjects] = useState<Project[]>(() => {
    const storedProjects = localStorage.getItem('projectsData');
    return storedProjects ? JSON.parse(storedProjects) : mockProjects;
  });

  const [newProject, setNewProject] = useState<Project>({
    id: '',
    title: '',
    description: '',
    mentor: '',
    status: 'available',
    deadline: '',
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    localStorage.setItem('projectsData', JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.mentor || !newProject.deadline) {
      alert('Please fill all fields.');
      return;
    }

    const newEntry = { ...newProject, id: (projects.length + 1).toString() };
    const updatedProjects = [...projects, newEntry];
    setProjects(updatedProjects);
    setNewProject({ id: '', title: '', description: '', mentor: '', status: 'available', deadline: '' });

    localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
    alert('Project added successfully!');
  };

  const handleEditProject = () => {
    if (!editingProject) return;

    const updatedProjects = projects.map(project =>
      project.id === editingProject.id ? editingProject : project
    );

    setProjects(updatedProjects);
    setEditingProject(null);
    localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
    alert('Project updated successfully!');
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
  };

  return (
    <div className="space-y-6">
      {/* Add Project Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Project Title"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mentor Name"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={newProject.mentor}
            onChange={(e) => setNewProject({ ...newProject, mentor: e.target.value })}
          />
          <input
            type="date"
            placeholder="Deadline"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={newProject.deadline}
            onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
          />
          <textarea
            placeholder="Project Description"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
        </div>
        <button
          onClick={handleAddProject}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </div>

      {/* List of Projects */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Projects</h3>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects available.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <p className="text-sm text-gray-500">
                    Mentor: <span className="font-medium">{project.mentor}</span> | Deadline: {project.deadline}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Project Section */}
      {editingProject && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Title"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Mentor Name"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={editingProject.mentor}
              onChange={(e) => setEditingProject({ ...editingProject, mentor: e.target.value })}
            />
            <input
              type="date"
              placeholder="Deadline"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={editingProject.deadline}
              onChange={(e) => setEditingProject({ ...editingProject, deadline: e.target.value })}
            />
            <textarea
              placeholder="Project Description"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
            />
          </div>
          <button
            onClick={handleEditProject}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageProjects;
