import React from 'react';
import { useParams } from 'react-router-dom';
import { challenges } from '../data/mockData';
import { Calendar, Users, Trophy } from 'lucide-react';
import { format } from 'date-fns';

const ChallengeDetail = () => {
  const { id } = useParams();
  const challenge = challenges.find(c => c._id === id);

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{challenge.title}</h1>
            <span className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
              {challenge.theme}
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-8">{challenge.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">Deadline</p>
                <p>{format(new Date(challenge.deadline), 'MMM d, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Users className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">Participants</p>
                <p>{challenge.participants.length} writers</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Trophy className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">Submissions</p>
                <p>{challenge.submissions.length} entries</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Participants</h2>
            <div className="flex flex-wrap gap-4">
              {challenge.participants.map(participant => (
                <div
                  key={participant._id}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={participant.profilePicture}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-900">{participant.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Join Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;