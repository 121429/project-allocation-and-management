import React, { useState, useEffect } from 'react';
import { UserPlus, Check } from 'lucide-react';
import { mockStudents, Student } from '../../data/mockData';

function AssignStudents() {
  // Load stored data or use mock data
  const [students, setStudents] = useState<Student[]>(() => {
    const storedStudents = localStorage.getItem('studentsData');
    return storedStudents ? JSON.parse(storedStudents) : mockStudents;
  });

  // Extract unique mentors from mock data
  const mentors = [...new Set(mockStudents.map(student => student.mentor).filter(Boolean))];

  // Function to assign a mentor and persist data
  const handleAssignMentor = (studentId: string, mentor: string) => {
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, mentor } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents)); // Save to localStorage
  };

  // Load saved student data from localStorage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
      setStudents(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Assign Students to Mentors
          </h3>

          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {student.mentor ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Assigned to:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {student.mentor}
                        </span>
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <select
                        onChange={(e) => handleAssignMentor(student.id, e.target.value)}
                        className="block w-48 rounded-md border-gray-300 shadow-sm
                                 focus:border-blue-500 focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Mentor
                        </option>
                        {mentors.map((mentor) => (
                          <option key={mentor} value={mentor}>
                            {mentor}
                          </option>
                        ))}
                      </select>
                    )}
                    {student.mentor && (
                      <button
                        onClick={() => handleAssignMentor(student.id, '')}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignStudents;
