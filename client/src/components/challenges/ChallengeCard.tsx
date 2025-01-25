import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Challenge } from '../../data/mockData';
import { format } from 'date-fns';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onJoin }) => {
  const isUpcoming = new Date(challenge.deadline) > new Date();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {challenge.title}
          </h3>
          <span className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
            {challenge.theme}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{challenge.description}</p>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              Deadline: {format(new Date(challenge.deadline), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>{challenge.participants.length} participants</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/profile/${challenge.creator._id}`}
            className="flex items-center space-x-2"
          >
            <img
              src={challenge.creator.profilePicture}
              alt={challenge.creator.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">
              Created by {challenge.creator.name}
            </span>
          </Link>

          {isUpcoming && (
            <button
              onClick={() => onJoin?.(challenge._id)}
              className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              Join Challenge
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;