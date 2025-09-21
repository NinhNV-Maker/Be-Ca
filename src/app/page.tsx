"use client";
import React, { useState, useEffect } from 'react';
import { Search, Plus, BookOpen, Briefcase, User, Lightbulb, Grid, List, Settings, Bell, Heart } from 'lucide-react';

// Mock data với avatar từ hình ảnh bạn gửi
const initialNotes = [
  {
    id: 1,
    title: "Lịch học của bé cà",
    content: "6h30: Dậy → ăn sáng, uống nước 30p ( nghỉ ngơi nói chuyện với Cu Ninh khi dậy)\n7h: Thể dục và chuẩn bị đi học (15 phút nói chuyện với Cu Ninh)\n7h30 Chuẩn bị đi học\nChào Cu Ninh và đi học",
    category: "học tập",
    date: "21/09/2025",
    avatar: "👩‍🎓"
  },
  {
    id: 2,
    title: "Thời khóa biểu",
    content: "7h30 Chuẩn bị đi học:\n9h -10h: Bắt đâu học được nghỉ ngơi 30 phút nhắn tin với Ninh. Tình hình của vọ\nMăm măm đợi về và ăn cơm\n11h → Ăn cơm măm măm",
    category: "học tập",
    date: "21/09/2025",
    avatar: "📚"
  },
  {
    id: 3,
    title: "Ghi chú cá nhân",
    content: "Hôm nay: Học\nCẩn thận: Bữa toán C24ESQ2SC1\nVới sinh: cơ nhận",
    category: "cá nhân",
    date: "21/09/2025",
    avatar: "💝"
  },
  {
    id: 4,
    title: "Ý tưởng mới",
    content: "Thiết kế app quản lý ghi chú\nSử dụng React + Tailwind\nTích hợp AI chatbot",
    category: "ý tưởng",
    date: "21/09/2025",
    avatar: "🐕"
  }
];

const categories = [
  { id: 'all', name: 'Tất cả ghi chú', icon: Grid, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'học tập', name: 'Học tập', icon: BookOpen, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
  { id: 'công việc', name: 'Công việc', icon: Briefcase, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
  { id: 'cá nhân', name: 'Cá nhân', icon: User, color: 'bg-gradient-to-r from-orange-500 to-red-500' },
  { id: 'ý tưởng', name: 'Ý tưởng', icon: Lightbulb, color: 'bg-gradient-to-r from-yellow-500 to-orange-500' }
];

const NotesDashboard = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });

  const filteredNotes = notes.filter(note => {
    const matchesCategory = currentCategory === 'all' || note.category === currentCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (note = null) => {
    if (note) {
      setEditingNote(note);
      setFormData({
        title: note.title,
        content: note.content,
        category: note.category
      });
    } else {
      setEditingNote(null);
      setFormData({ title: '', content: '', category: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setFormData({ title: '', content: '', category: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingNote) {
      setNotes(notes.map(note =>
        note.id === editingNote.id
          ? { ...note, ...formData }
          : note
      ));
    } else {
      const newNote = {
        id: Math.max(...notes.map(n => n.id)) + 1,
        ...formData,
        date: new Date().toLocaleDateString('vi-VN'),
        avatar: getRandomAvatar()
      };
      setNotes([newNote, ...notes]);
    }

    closeModal();
  };

  const getRandomAvatar = () => {
    const avatars = ['👩‍🎓', '👨‍💻', '📚', '💝', '🐕', '🎯', '🌟', '🚀', '💡', '🎨'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">📝</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Notes Dashboard</h1>
                <p className="text-purple-200 text-sm">Quản lý ghi chú thông minh</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="text-4xl cursor-pointer hover:scale-110 transition-transform">
                🐕
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-8">
              <button
                onClick={() => openModal()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Tạo ghi chú mới</span>
              </button>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <span>📚</span>
                  <span>Danh mục</span>
                </h3>

                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setCurrentCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${currentCategory === category.id
                          ? `${category.color} text-white shadow-lg transform scale-105`
                          : 'text-purple-100 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{category.name}</span>
                      <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
                        {category.id === 'all' ? notes.length : notes.filter(n => n.category === category.id).length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Fun decorative elements */}
              <div className="mt-8 p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-300/20">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">💝</span>
                  <span className="text-white font-medium">Cute Zone</span>
                </div>
                <div className="flex justify-center space-x-2">
                  <span className="text-xl hover:scale-125 transition-transform cursor-pointer">🐕</span>
                  <span className="text-xl hover:scale-125 transition-transform cursor-pointer">💕</span>
                  <span className="text-xl hover:scale-125 transition-transform cursor-pointer">🌟</span>
                  <span className="text-xl hover:scale-125 transition-transform cursor-pointer">🦄</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              {/* Search and View Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="🔍 Tìm kiếm ghi chú..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all ${viewMode === 'grid'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-purple-300 hover:bg-white/20'
                      }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all ${viewMode === 'list'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-purple-300 hover:bg-white/20'
                      }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Notes Grid/List */}
              {filteredNotes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🐕</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Chưa có ghi chú nào</h3>
                  <p className="text-purple-300 mb-6">Hãy tạo ghi chú đầu tiên của bạn!</p>
                  <button
                    onClick={() => openModal()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                  >
                    Tạo ghi chú ngay
                  </button>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }>
                  {filteredNotes.map((note, index) => (
                    <div
                      key={note.id}
                      className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20 cursor-pointer ${viewMode === 'list' ? 'flex items-start space-x-4' : ''
                        }`}
                      onClick={() => openModal(note)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'flex justify-between items-start mb-4'}`}>
                        <div className="text-3xl">{note.avatar}</div>
                        {viewMode === 'grid' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                          {note.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {note.content.split('\n').slice(0, 3).join(' • ')}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{note.date}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categories.find(c => c.id === note.category)?.color || 'bg-gray-500'
                            } text-white`}>
                            {note.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <span className="text-3xl">{editingNote ? '✏️' : '✨'}</span>
                <span>{editingNote ? 'Chỉnh sửa ghi chú' : 'Tạo ghi chú mới'}</span>
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📝 Tiêu đề
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Nhập tiêu đề ghi chú..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📁 Danh mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.slice(1).map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📄 Nội dung
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Viết nội dung ghi chú của bạn..."
                  required
                />
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-medium transform hover:scale-105"
                >
                  {editingNote ? '💾 Cập nhật' : '✨ Tạo mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesDashboard;