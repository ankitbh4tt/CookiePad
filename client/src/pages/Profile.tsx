import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { users, posts } from '../data/mockData';
import PostCard from '../components/posts/PostCard';
import { Users, BookOpen, Award } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const user = users.find(u => u._id === id);
  const userPosts = posts.filter(p => p.author._id === id);
  const [activeTab, setActiveTab] = useState('posts');

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600 mt-1">{user.bio}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Link to={`/profile/${id}/followers`} className="text-sm text-gray-600 hover:text-indigo-600">
                  <span className="font-semibold">{user.followers.length}</span> Followers
                </Link>
                <Link to={`/profile/${id}/following`} className="text-sm text-gray-600 hover:text-indigo-600">
                  <span className="font-semibold">{user.following.length}</span> Following
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Users className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
              <div className="text-2xl font-bold">{user.followers.length}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <BookOpen className="w-6 h-6 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold">{userPosts.length}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Award className="w-6 h-6 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold">{user.badges.length}</div>
              <div className="text-sm text-gray-600">Badges</div>
            </div>
          </div>
        </div>

        <div className="border-t">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'posts'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'badges'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Badges
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'bookmarks'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Bookmarks
            </button>
          </nav>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'posts' && (
          <>
            {userPosts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                onLike={(id) => console.log('Like post:', id)}
                onComment={(id) => console.log('Comment on post:', id)}
                onBookmark={(id) => console.log('Bookmark post:', id)}
                onShare={(id) => console.log('Share post:', id)}
              />
            ))}
          </>
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {user.badges.map((badge, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Award className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
                <h3 className="font-medium text-gray-900">{badge}</h3>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <>
            {posts
              .filter(post => user.bookmarks.includes(post._id))
              .map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={(id) => console.log('Like post:', id)}
                  onComment={(id) => console.log('Comment on post:', id)}
                  onBookmark={(id) => console.log('Bookmark post:', id)}
                  onShare={(id) => console.log('Share post:', id)}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;