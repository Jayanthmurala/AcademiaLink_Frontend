import React, { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Paperclip } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  projectTitle?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file';
}

const MessagingInterface: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Dr. Anil Kumar',
      lastMessage: 'Great progress on the chatbot project!',
      timestamp: '2 min ago',
      unread: 2,
      avatar: '👨‍🏫',
      online: true,
      projectTitle: 'AI-Powered Chatbot'
    },
    {
      id: '2',
      name: 'Prof. Sunita Verma',
      lastMessage: 'The IoT sensors data looks promising',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: '👩‍🏫',
      online: false,
      projectTitle: 'Smart Campus IoT'
    },
    {
      id: '3',
      name: 'Project Team - Blockchain',
      lastMessage: 'Meeting scheduled for tomorrow',
      timestamp: '3 hours ago',
      unread: 1,
      avatar: '👥',
      online: true,
      projectTitle: 'Blockchain Certificates'
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      senderId: 'faculty1',
      content: 'Hi! How is the progress on the NLP module?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      senderId: currentUser?.id || 'student1',
      content: 'Good morning! I\'ve completed the text preprocessing part and working on the sentiment analysis now.',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: '3',
      senderId: 'faculty1',
      content: 'Excellent! Can you share the code for review?',
      timestamp: '10:40 AM',
      type: 'text'
    },
    {
      id: '4',
      senderId: currentUser?.id || 'student1',
      content: 'Sure! I\'ll push it to the repository in an hour.',
      timestamp: '10:42 AM',
      type: 'text'
    },
    {
      id: '5',
      senderId: 'faculty1',
      content: 'Great progress on the chatbot project! Keep up the good work.',
      timestamp: '11:15 AM',
      type: 'text'
    }
  ];

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (chat.projectTitle && chat.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedChatData = mockChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex overflow-hidden">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    {chat.projectTitle && (
                      <p className="text-xs text-blue-600 mb-1">{chat.projectTitle}</p>
                    )}
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChatData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                      {selectedChatData.avatar}
                    </div>
                    {selectedChatData.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedChatData.name}</h3>
                    {selectedChatData.projectTitle && (
                      <p className="text-sm text-blue-600">{selectedChatData.projectTitle}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {selectedChatData.online ? 'Online' : 'Last seen 2 hours ago'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === currentUser?.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === currentUser?.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-sm">Choose a chat from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;