import React from 'react';
import { challenges } from '../data/mockData';
import ChallengeCard from '../components/challenges/ChallengeCard';

const Challenges = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Writing Challenges</h1>
      <div className="space-y-6">
        {challenges.map(challenge => (
          <ChallengeCard
            key={challenge._id}
            challenge={challenge}
            onJoin={(id) => console.log('Join challenge:', id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Challenges;