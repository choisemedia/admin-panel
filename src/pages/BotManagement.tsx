import React, { useState } from 'react';
import { Plus, Bot as BotIcon, Trash2, Package } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addBot, removeBot } from '../store/slices/botsSlice';
import { RootState } from '../store';
import { Bot } from '../types/bot';
import { Link } from 'react-router-dom';

const BotManagement = () => {
  const dispatch = useDispatch();
  const { items: bots, loading, error } = useSelector((state: RootState) => state.bots);
  const [isAddingBot, setIsAddingBot] = useState(false);
  const [newBot, setNewBot] = useState({
    name: '',
    username: '',
    token: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const botData: Omit<Bot, 'createdAt' | 'updatedAt'> = {
      ...newBot,
      id: Date.now().toString(),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${newBot.username}`,
      followers: 0,
      following: 0,
      likes: 0,
      products: [],
    };
    
    dispatch(addBot(botData));
    setIsAddingBot(false);
    setNewBot({ name: '', username: '', token: '', description: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bot Management</h1>
        <button
          onClick={() => setIsAddingBot(true)}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Bot
        </button>
      </div>

      {/* Add Bot Form */}
      {isAddingBot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Bot</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Bot Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newBot.name}
                    onChange={(e) => setNewBot({ ...newBot, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newBot.username}
                    onChange={(e) => setNewBot({ ...newBot, username: e.target.value })}
                    required
                    pattern="^[a-zA-Z0-9_]{3,15}$"
                    title="Username must be 3-15 characters long and can only contain letters, numbers, and underscores"
                  />
                </div>
                <div>
                  <label className="form-label">Bot Token</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newBot.token}
                    onChange={(e) => setNewBot({ ...newBot, token: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    value={newBot.description}
                    onChange={(e) => setNewBot({ ...newBot, description: e.target.value })}
                    rows={3}
                    maxLength={500}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingBot(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Bot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bots List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bots.map((bot) => (
          <div key={bot.id} className="card">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <BotIcon className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{bot.name}</h3>
                <p className="text-sm text-gray-500">@{bot.username}</p>
              </div>
              <button
                onClick={() => dispatch(removeBot(bot.id))}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                title="Delete Bot"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Package className="w-4 h-4 mr-2" />
                {bot.products.length} Products
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/shop/${bot.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Shop Profile →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bots.length === 0 && (
        <div className="text-center py-12">
          <BotIcon className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No bots yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first bot.</p>
        </div>
      )}
    </div>
  );
};

export default BotManagement;