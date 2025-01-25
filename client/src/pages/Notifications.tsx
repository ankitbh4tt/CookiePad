import React from 'react';
import { notifications } from '../data/mockData';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Notifications = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification._id}
            className={`bg-white p-4 rounded-xl shadow-sm ${
              !notification.read ? 'border-l-4 border-indigo-600' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {notification.type === 'like' && (
                  <Heart className="w-6 h-6 text-red-500" />
                )}
                {notification.type === 'comment' && (
                  <MessageCircle className="w-6 h-6 text-indigo-500" />
                )}
                {notification.type === 'follow' && (
                  <UserPlus className="w-6 h-6 text-green-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <Link
                    to={`/profile/${notification.sender._id}`}
                    className="font-medium hover:text-indigo-600"
                  >
                    {notification.sender.name}
                  </Link>{' '}
                  {notification.type === 'like' && 'liked your post'}
                  {notification.type === 'comment' && 'commented on your post'}
                  {notification.type === 'follow' && 'started following you'}
                </p>
                {notification.post && (
                  <Link
                    to={`/post/${notification.post._id}`}
                    className="mt-1 text-sm text-gray-500 hover:text-indigo-600"
                  >
                    {notification.post.title}
                  </Link>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {format(new Date(notification.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;