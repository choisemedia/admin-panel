import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BotShopProfile from '../components/BotShopProfile';

const ShopProfile = () => {
  const { username } = useParams<{ username: string }>();
  const bot = useSelector((state: any) => 
    state.bots.items.find((bot: any) => bot.username === username)
  );

  if (!bot) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Shop Not Found</h1>
          <p className="text-gray-600 mt-2">The shop you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <BotShopProfile bot={bot} />;
};

export default ShopProfile;