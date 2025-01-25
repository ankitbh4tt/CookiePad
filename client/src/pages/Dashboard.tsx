import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award } from 'lucide-react';
import { users as  mockUsers,posts as  mockPosts, challenges as mockChallenges } from '../data/mockData';
import PostCard from '../components/posts/PostCard';
import ChallengeCard from '../components/challenges/ChallengeCard';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
}

const Dashboard = () => {
  const currentUser = mockUsers[0]; // Using Sarah as the current user

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          Welcome back, {currentUser.name}
        </motion.h1>
        <p className="mt-2 text-gray-600">Here's what's happening in your creative world</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon={<Users className="w-6 h-6 text-blue-600" />}
          title="Followers"
          value={currentUser.followers.length.toString()}
          change="+12%"
        />
        <StatsCard
          icon={<BookOpen className="w-6 h-6 text-green-600" />}
          title="Posts"
          value={mockPosts.filter(post => post.author._id === currentUser._id).length.toString()}
          change="+3"
        />
        <StatsCard
          icon={<Award className="w-6 h-6 text-purple-600" />}
          title="Badges"
          value={currentUser.badges.length.toString()}
          change="+1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
          {mockPosts.slice(0, 3).map(post => (
            <PostCard
              key={post._id}
              post={post}
              onLike={(id) => console.log('Like post:', id)}
              onComment={(id) => console.log('Comment on post:', id)}
              onBookmark={(id) => console.log('Bookmark post:', id)}
              onShare={(id) => console.log('Share post:', id)}
            />
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Active Challenges</h2>
          {mockChallenges.map(challenge => (
            <ChallengeCard
              key={challenge._id}
              challenge={challenge}
              onJoin={(id) => console.log('Join challenge:', id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, change }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <span className="text-sm font-medium text-green-600">{change}</span>
    </div>
  </motion.div>
);

export default Dashboard;