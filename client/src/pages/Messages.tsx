import React, { useState } from 'react';
import { messages, users } from '../data/mockData';
import { format } from 'date-fns';

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(users[1]);
  const currentUser = users[0]; // Using Sarah as current user

  const userMessages = messages.filter(
    m => (m.sender._id === currentUser._id && m.receiver._id === selectedUser._id) ||
         (m.sender._id === selectedUser._id && m.receiver._id === currentUser._id)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-3">
          {/* Contacts List */}
          <div className="border-r">
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="overflow-y-auto h-[calc(100vh-13rem)]">
              {users.filter(u => u._id !== currentUser._id).map(user => (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 ${
                    selectedUser._id === user._id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <span className="text-xs text-gray-500">
                        {format(new Date(), 'HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      Click to view messages
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-2 flex flex-col h-[calc(100vh-13rem)]">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center space-x-4">
              <img
                src={selectedUser.profilePicture}
                alt={selectedUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-medium text-gray-900">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500">Active now</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {userMessages.map(message => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.sender._id === currentUser._id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      message.sender._id === currentUser._id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender._id === currentUser._id
                        ? 'text-indigo-200'
                        : 'text-gray-500'
                    }`}>
                      {format(new Date(message.createdAt), 'HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;