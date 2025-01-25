// Mock data based on MongoDB schemas
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  profilePicture: string;
  interests: string[];
  followers: string[];
  following: string[];
  savedPosts: string[];
  bookmarks: string[];
  badges: string[];
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: User;
  files: string[];
  status: string;
  views: number;
  likes: string[];
  comments: string[];
  createdAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  post: string;
  createdAt: string;
}

export interface Challenge {
  _id: string;
  title: string;
  description: string;
  theme: string;
  creator: User;
  participants: User[];
  deadline: string;
  submissions: string[];
  createdAt: string;
}

export interface Message {
  _id: string;
  sender: User;
  receiver: User;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  _id: string;
  user: string;
  type: string;
  sender: User;
  post: Post;
  read: boolean;
  createdAt: string;
}

export const users: User[] = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'user',
    bio: 'Passionate poet and storyteller',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    interests: ['Poetry', 'Modern Literature', 'Creative Writing'],
    followers: ['2', '3'],
    following: ['2'],
    savedPosts: ['1', '2'],
    bookmarks: ['3'],
    badges: ['Early Adopter', 'Poetry Master', 'Creative Mind']
  },
  {
    _id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'user',
    bio: 'Exploring the world through words',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    interests: ['Short Stories', 'Poetry'],
    followers: ['1'],
    following: ['1', '3'],
    savedPosts: [],
    bookmarks: ['1'],
    badges: ['Storyteller']
  }
];

export const posts: Post[] = [
  {
    _id: '1',
    title: 'The Art of Poetry',
    content: 'Poetry is the rhythmical creation of beauty in words...',
    tags: ['Poetry', 'Writing', 'Art'],
    author: users[0],
    files: [],
    status: 'published',
    views: 120,
    likes: ['2', '3'],
    comments: ['1', '2'],
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    _id: '2',
    title: 'Modern Storytelling',
    content: 'In the digital age, storytelling has evolved...',
    tags: ['Stories', 'Digital', 'Modern'],
    author: users[1],
    files: [],
    status: 'published',
    views: 85,
    likes: ['1'],
    comments: ['3'],
    createdAt: '2024-03-14T15:30:00Z'
  }
];

export const comments: Comment[] = [
  {
    _id: '1',
    content: 'Beautiful perspective on poetry!',
    author: users[1],
    post: '1',
    createdAt: '2024-03-15T11:00:00Z'
  },
  {
    _id: '2',
    content: 'This resonates deeply with me.',
    author: users[0],
    post: '1',
    createdAt: '2024-03-15T12:30:00Z'
  }
];

export const challenges: Challenge[] = [
  {
    _id: '1',
    title: 'Spring Poetry Challenge',
    description: 'Write a poem celebrating the arrival of spring',
    theme: 'Nature',
    creator: users[0],
    participants: [users[1]],
    deadline: '2024-04-01T23:59:59Z',
    submissions: [],
    createdAt: '2024-03-01T00:00:00Z'
  },
  {
    _id: '2',
    title: 'Digital Age Stories',
    description: 'Write a story about technology and human connection',
    theme: 'Modern Life',
    creator: users[1],
    participants: [users[0]],
    deadline: '2024-04-15T23:59:59Z',
    submissions: [],
    createdAt: '2024-03-10T00:00:00Z'
  }
];

export const messages: Message[] = [
  {
    _id: '1',
    sender: users[0],
    receiver: users[1],
    content: 'Loved your latest story!',
    isRead: false,
    createdAt: '2024-03-15T09:00:00Z'
  },
  {
    _id: '2',
    sender: users[1],
    receiver: users[0],
    content: 'Thank you! Would love to collaborate sometime.',
    isRead: true,
    createdAt: '2024-03-15T09:05:00Z'
  }
];

export const notifications: Notification[] = [
  {
    _id: '1',
    user: '1',
    type: 'like',
    sender: users[1],
    post: posts[0],
    read: false,
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    _id: '2',
    user: '1',
    type: 'comment',
    sender: users[1],
    post: posts[0],
    read: false,
    createdAt: '2024-03-15T11:00:00Z'
  }
];