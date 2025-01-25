import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layout,
  BookOpen,
  Award,
  Bookmark,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="hidden lg:flex flex-col w-64 bg-white border-r h-screen fixed left-0 top-16 pt-6"
    >
      <div className="px-4">
        <div className="space-y-4">
          <SidebarLink to="/dashboard" icon={<Layout size={20} />} text="Dashboard" />
          <SidebarLink to="/my-posts" icon={<BookOpen size={20} />} text="My Posts" />
          <SidebarLink to="/challenges" icon={<Award size={20} />} text="Challenges" />
          <SidebarLink to="/bookmarks" icon={<Bookmark size={20} />} text="Bookmarks" />
          <SidebarLink to="/trending" icon={<TrendingUp size={20} />} text="Trending" />
          <SidebarLink to="/community" icon={<Users size={20} />} text="Community" />
          <SidebarLink to="/events" icon={<Calendar size={20} />} text="Events" />
        </div>
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-indigo-900">Weekly Challenge</h3>
          <p className="text-xs text-indigo-700 mt-1">
            Write a haiku about spring flowers
          </p>
          <Link
            to="/challenges/weekly"
            className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-500 block"
          >
            Join Challenge →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const SidebarLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
  >
    {icon}
    <span className="font-medium">{text}</span>
  </Link>
);

export default Sidebar;