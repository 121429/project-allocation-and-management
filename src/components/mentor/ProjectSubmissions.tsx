import React, { useState } from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { mockSubmissions, Submission } from '../../data/mockData';

function ProjectSubmissions() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [feedback, setFeedback] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

  const handleReview = (submissionId: string) => {
    if (!feedback.trim()) {
      alert('Please provide feedback before marking as reviewed.');
      return;
    }

    setSubmissions(prevSubmissions =>
      prevSubmissions.map(submission =>
        submission.id === submissionId
          ? { ...submission, status: 'reviewed' as Submission['status'], feedback }
          : submission
      )
    );
    setFeedback('');
    setSelectedSubmission(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {submission.projectTitle}
                </h3>
                <p className="text-sm text-gray-500">
                  Submitted by {submission.studentName} on {submission.submissionDate}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  submission.status === 'reviewed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {submission.status}
              </span>
            </div>

            {submission.feedback && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900">Feedback</h4>
                <p className="mt-1 text-sm text-gray-600">{submission.feedback}</p>
              </div>
            )}

            {submission.status === 'pending' && (
              <div className="mt-6 space-y-4">
                {selectedSubmission === submission.id ? (
                  <>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Enter your feedback..."
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleReview(submission.id)}
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent
                                 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Reviewed
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSubmission(null);
                          setFeedback('');
                        }}
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300
                                 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedSubmission(submission.id)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent
                             rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Provide Feedback
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {submissions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No project submissions to review.</p>
        </div>
      )}
    </div>
  );
}

export default ProjectSubmissions;