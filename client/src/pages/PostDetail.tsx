import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts, comments } from '../data/mockData';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { format } from 'date-fns';

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find(p => p._id === id);
  const postComments = comments.filter(c => c.post === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Link to={`/profile/${post.author._id}`}>
              <img
                src={post.author.profilePicture}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
            </Link>
            <div>
              <Link 
                to={`/profile/${post.author._id}`}
                className="font-medium text-gray-900 hover:text-indigo-600"
              >
                {post.author.name}
              </Link>
              <p className="text-sm text-gray-500">
                {format(new Date(post.createdAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <p className="text-gray-600 mb-6 whitespace-pre-wrap">{post.content}</p>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
                <Heart className="w-5 h-5" />
                <span>{post.likes.length}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                <MessageCircle className="w-5 h-5" />
                <span>{postComments.length}</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-indigo-600">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-indigo-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {postComments.map(comment => (
            <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <Link to={`/profile/${comment.author._id}`}>
                  <img
                    src={comment.author.profilePicture}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
                <div>
                  <Link 
                    to={`/profile/${comment.author._id}`}
                    className="font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {comment.author.name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;