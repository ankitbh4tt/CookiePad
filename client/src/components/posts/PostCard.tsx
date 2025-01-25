import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Post } from '../../data/mockData';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onBookmark,
  onShare
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={post.author.profilePicture}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <Link to={`/profile/${post.author._id}`} className="font-medium text-gray-900 hover:text-indigo-600">
              {post.author.name}
            </Link>
            <p className="text-sm text-gray-500">
              {format(new Date(post.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        <Link to={`/post/${post._id}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4">
          {post.content.length > 200
            ? `${post.content.substring(0, 200)}...`
            : post.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              className="text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike?.(post._id)}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
            >
              <Heart className="w-5 h-5" />
              <span>{post.likes.length}</span>
            </button>
            <button
              onClick={() => onComment?.(post._id)}
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onBookmark?.(post._id)}
              className="text-gray-600 hover:text-indigo-600"
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button
              onClick={() => onShare?.(post._id)}
              className="text-gray-600 hover:text-indigo-600"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;