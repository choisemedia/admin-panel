import React from 'react';
import { Heart, Share2, MessageCircle, ShoppingBag } from 'lucide-react';
import { Bot } from '../types/bot';

interface BotShopProfileProps {
  bot: Bot;
}

const BotShopProfile: React.FC<BotShopProfileProps> = ({ bot }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${bot.name}'s Shop`,
          text: bot.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-black text-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">@{bot.username}</h1>
        <button onClick={handleShare} className="p-2 hover:bg-gray-800 rounded-full">
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-4 pt-2">
        <div className="flex items-center space-x-4">
          <img
            src={bot.avatar}
            alt={bot.name}
            className="w-20 h-20 rounded-full border-2 border-white"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{bot.name}</h2>
            <p className="text-gray-400">@{bot.username}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around my-6 text-center">
          <div>
            <div className="font-bold">{bot.following.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Following</div>
          </div>
          <div>
            <div className="font-bold">{bot.followers.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Followers</div>
          </div>
          <div>
            <div className="font-bold">{bot.likes.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Likes</div>
          </div>
        </div>

        <p className="text-sm mb-4">{bot.description}</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-1 px-1">
        {bot.products.map((product) => (
          <div key={product.id} className="relative aspect-square group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2 transform transition-transform duration-200 group-hover:translate-y-0">
              <div className="text-sm font-semibold truncate">{product.name}</div>
              <div className="text-sm">${product.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center">
            <Heart className="w-6 h-6" />
            <span className="text-xs mt-1">Like</span>
          </button>
          <button className="flex flex-col items-center">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Comment</span>
          </button>
          <button className="flex flex-col items-center">
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs mt-1">Shop</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotShopProfile;