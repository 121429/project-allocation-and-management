import React, { useState } from 'react';
import { Check, X, User } from 'lucide-react';
import { mockApplications, Application } from '../../data/mockData';

function StudentApplications() {
  const [applications, setApplications] = useState(mockApplications);

  const handleStatusUpdate = (applicationId: string, newStatus: Application['status']) => {
    setApplications(prevApplications =>
      prevApplications.map(application =>
        application.id === applicationId
          ? { ...application, status: newStatus }
          : application
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {application.studentName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Applied on {application.appliedDate}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  application.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : application.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {application.status}
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Project</h4>
              <p className="mt-1 text-sm text-gray-600">{application.projectTitle}</p>
            </div>

            {application.status === 'pending' && (
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => handleStatusUpdate(application.id, 'approved')}
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent
                           rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(application.id, 'rejected')}
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent
                           rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No pending applications.</p>
        </div>
      )}
    </div>
  );
}

export default StudentApplications;