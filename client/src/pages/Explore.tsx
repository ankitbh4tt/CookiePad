import React from 'react';
import { posts, users } from '../data/mockData';
import PostCard from '../components/posts/PostCard';
import { Compass, TrendingUp, Users } from 'lucide-react';

const Explore = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-2 mb-8">
        <Compass className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold">Explore</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Trending Posts</h2>
          {posts.map(post => (
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

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Trending Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Poetry', 'Writing', 'Art', 'Stories', 'Modern'].map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Suggested Writers</h2>
            </div>
            <div className="space-y-4">
              {users.map(user => (
                <div key={user._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.bio}</p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;