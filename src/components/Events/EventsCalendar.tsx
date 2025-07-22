import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Filter, Search, Video, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  type: 'workshop' | 'seminar' | 'conference' | 'meetup' | 'webinar';
  organizer: string;
  maxAttendees: number;
  currentAttendees: number;
  isRegistered: boolean;
  isOnline: boolean;
  meetingLink?: string;
  tags: string[];
  image?: string;
}

const EventsCalendar: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedView, setSelectedView] = useState<'calendar' | 'list'>('list');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'AI in Healthcare: Future Perspectives',
      description: 'Explore the latest developments in AI applications for healthcare, including machine learning diagnostics and predictive analytics.',
      date: new Date('2024-02-15'),
      time: '2:00 PM',
      duration: '2 hours',
      location: 'Main Auditorium',
      type: 'seminar',
      organizer: 'Dr. Priya Sharma',
      maxAttendees: 200,
      currentAttendees: 156,
      isRegistered: true,
      isOnline: false,
      tags: ['AI', 'Healthcare', 'Machine Learning']
    },
    {
      id: '2',
      title: 'React Advanced Patterns Workshop',
      description: 'Hands-on workshop covering advanced React patterns, performance optimization, and best practices for large-scale applications.',
      date: new Date('2024-02-18'),
      time: '10:00 AM',
      duration: '4 hours',
      location: 'Computer Lab 1',
      type: 'workshop',
      organizer: 'Prof. Amit Singh',
      maxAttendees: 30,
      currentAttendees: 28,
      isRegistered: false,
      isOnline: false,
      tags: ['React', 'JavaScript', 'Web Development']
    },
    {
      id: '3',
      title: 'Blockchain Technology Webinar',
      description: 'Online session discussing blockchain fundamentals, cryptocurrency, and decentralized applications.',
      date: new Date('2024-02-20'),
      time: '6:00 PM',
      duration: '1.5 hours',
      location: 'Online',
      type: 'webinar',
      organizer: 'Dr. Rajesh Kumar',
      maxAttendees: 500,
      currentAttendees: 234,
      isRegistered: true,
      isOnline: true,
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      tags: ['Blockchain', 'Cryptocurrency', 'DeFi']
    },
    {
      id: '4',
      title: 'Tech Career Fair 2024',
      description: 'Annual career fair featuring top tech companies, startups, and networking opportunities for students and professionals.',
      date: new Date('2024-02-25'),
      time: '9:00 AM',
      duration: '6 hours',
      location: 'Sports Complex',
      type: 'conference',
      organizer: 'Career Services',
      maxAttendees: 1000,
      currentAttendees: 567,
      isRegistered: false,
      isOnline: false,
      tags: ['Career', 'Networking', 'Jobs']
    },
    {
      id: '5',
      title: 'IoT Study Group Meetup',
      description: 'Weekly study group for IoT enthusiasts to discuss projects, share knowledge, and collaborate on ideas.',
      date: new Date('2024-02-22'),
      time: '4:00 PM',
      duration: '2 hours',
      location: 'Library Study Room 3',
      type: 'meetup',
      organizer: 'IoT Club',
      maxAttendees: 15,
      currentAttendees: 12,
      isRegistered: true,
      isOnline: false,
      tags: ['IoT', 'Study Group', 'Collaboration']
    }
  ];

  const eventTypes = ['all', 'workshop', 'seminar', 'conference', 'meetup', 'webinar'];

  const filteredEvents = mockEvents.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-800';
      case 'seminar': return 'bg-emerald-100 text-emerald-800';
      case 'conference': return 'bg-purple-100 text-purple-800';
      case 'meetup': return 'bg-orange-100 text-orange-800';
      case 'webinar': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop': return '🛠️';
      case 'seminar': return '🎓';
      case 'conference': return '🏛️';
      case 'meetup': return '👥';
      case 'webinar': return '💻';
      default: return '📅';
    }
  };

  const handleRegister = (eventId: string) => {
    console.log('Registering for event:', eventId);
    // In a real app, this would update the registration status
  };

  const handleCreateEvent = () => {
    setShowCreateForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events Calendar</h1>
          <p className="text-gray-600">Discover workshops, seminars, and networking opportunities</p>
        </div>
        {currentUser?.role === 'faculty' && (
          <button
            onClick={handleCreateEvent}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedView('list')}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedView === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setSelectedView('calendar')}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedView === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getTypeIcon(event.type)}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                      {event.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                {event.isRegistered && (
                  <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                    Registered
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date.toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  {event.isOnline ? (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      <span>Online Event</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{event.currentAttendees}/{event.maxAttendees} attendees</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Registration</span>
                  <span className="font-medium">
                    {Math.round((event.currentAttendees / event.maxAttendees) * 100)}% full
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  by <span className="font-medium">{event.organizer}</span>
                </div>
                <div className="flex space-x-2">
                  {event.isOnline && event.meetingLink && event.isRegistered && (
                    <a
                      href={event.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center space-x-1 text-sm"
                    >
                      <Video className="h-4 w-4" />
                      <span>Join</span>
                    </a>
                  )}
                  {!event.isRegistered && event.currentAttendees < event.maxAttendees && (
                    <button
                      onClick={() => handleRegister(event.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Register
                    </button>
                  )}
                  {event.currentAttendees >= event.maxAttendees && !event.isRegistered && (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed text-sm"
                    >
                      Full
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or check back later</p>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Create New Event</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                      <option value="conference">Conference</option>
                      <option value="meetup">Meetup</option>
                      <option value="webinar">Webinar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your event"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Venue or 'Online'"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;