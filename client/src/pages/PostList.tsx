import React from 'react';
import { posts } from '../data/mockData';
import PostCard from '../components/posts/PostCard';

const PostList = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
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
  );
};

export default PostList;