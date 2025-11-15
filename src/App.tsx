import React, { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  Bell,
  Mic,
  Menu,
  Image,
  BookOpen,
  User,
  Settings,
  PhoneCall,
} from "lucide-react";

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import FamilyScreen from './components/FamilyScreen';
import EventsScreen from './components/EventsScreen';
import RemindersScreen from './components/RemindersScreen';
import VoiceControlMode from './components/VoiceControlMode';
import FamilyFeedScreen from './components/FamilyFeedScreen';
import PersonalDiaryScreen from './components/PersonalDiaryScreen';
import SettingsScreen from './components/SettingsScreen';
import ProfileScreen from './components/ProfileScreen';

function App() {
  const navigate = useNavigate();

  const [showModeMenu, setShowModeMenu] = useState(false);
  const [textSizeMultiplier, setTextSizeMultiplier] = useState(1);

  const handleNavigate = (screen: 
    | "family"
    | "events" 
    | "reminders"
    | "feed"
    | "diary"
    | "settings"
    | "profile"
    | "home"
  ) => {
    navigate(`/${screen}`);
  };

  const handleMenuClick = () => {
    setShowModeMenu(!showModeMenu);
  };

  const handleTextSizeToggle = () => {
    setTextSizeMultiplier(textSizeMultiplier === 1 ? 1.5 : 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
  <div className="flex-1 overflow-y-auto pb-40">
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/home"
        element={
          <HomeScreen
            onNavigate={handleNavigate}
            onMenuClick={handleMenuClick}
            onTextSizeToggle={handleTextSizeToggle}
            textSizeMultiplier={1}
          />
        }
      />
      <Route path="/family" element={<FamilyScreen />} />
      <Route path="/events" element={<EventsScreen />} />
      <Route path="/reminders" element={<RemindersScreen />} />
      <Route path="/voice" element={<VoiceControlMode />} />
      <Route path="/feed"  element={<FamilyFeedScreen
        onMenuClick={() => console.log('Menu clicked')}
        onTextSizeToggle={() => console.log('Text size toggle')}
        textSizeMultiplier={1}/>}/>
      <Route
    path="/diary"
    element={
      <PersonalDiaryScreen
        onMenuClick={handleMenuClick}
        onTextSizeToggle={handleTextSizeToggle}
        textSizeMultiplier={1}
      />
    }
  />
  <Route
    path="/settings"
    element={
      <SettingsScreen
        onMenuClick={handleMenuClick}
        onTextSizeToggle={handleTextSizeToggle}
        textSizeMultiplier={1}
      />
    }
  />
  <Route
  path="/profile"
  element={
    <ProfileScreen
      onMenuClick={() => setShowModeMenu(!showModeMenu)}
      onTextSizeToggle={() => setTextSizeMultiplier(textSizeMultiplier === 1 ? 1.5 : 1)}
      textSizeMultiplier={textSizeMultiplier}
    />
  }
/>

    </Routes>
    {showModeMenu && (
  <div className="fixed top-20 left-4 bg-white rounded-3xl p-4 shadow-xl border-2 border-purple-200 z-50 space-y-3 min-w-[280px]">
    <button
      onClick={() => {
        navigate("/profile");
        setShowModeMenu(false);
      }}
      className="w-full text-left px-6 py-4 rounded-2xl text-xl font-bold transition-colors flex items-center gap-3 text-gray-700 hover:bg-gray-100"
    >
      <User className="w-6 h-6" />
      My Profile
    </button>
    <button
      onClick={() => {
        navigate("/settings");
        setShowModeMenu(false);
      }}
      className="w-full text-left px-6 py-4 rounded-2xl text-xl font-bold transition-colors flex items-center gap-3 text-gray-700 hover:bg-gray-100"
    >
      <Settings className="w-6 h-6" />
      Settings
    </button>
    <div className="border-t-2 border-gray-200 my-2"></div>
    <button
      onClick={() => {
        navigate("/voice");
        setShowModeMenu(false);
      }}
      className="w-full text-left px-6 py-4 rounded-2xl text-xl font-bold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3"
    >
      <Mic className="w-6 h-6" />
      Voice Control Mode
    </button>
  </div>
)}

  </div>

  {/* Persistent Mic Button */}
    <button
      onClick={() => alert("Voice Assistant activated")}
      className="fixed bottom-28 right-4 z-40 rounded-full p-4 shadow-lg transition-all active:scale-95 bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-xl"
      title="Voice Assistant"
    >
      <Mic className="w-8 h-8 text-white" strokeWidth={2.5} />
    </button>

    {/* Emergency Call Button */}
    <button
      onClick={() => alert("Calling 112")}
      className="fixed bottom-28 left-4 bg-red-500 rounded-full p-4 shadow-lg hover:shadow-xl transition-all active:scale-95 z-50 border-2 border-red-700"
      title="Emergency Call - Tap to call 112"
    >
      <PhoneCall className="w-8 h-8 text-white" strokeWidth={3} />
    </button>

    {/* Bottom Navigation */}
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-purple-200 shadow-lg">
      <div className="max-w-6xl mx-auto grid grid-cols-6 items-center py-2 px-1">
        <button
          onClick={() => handleNavigate("home")}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors text-gray-600`}
        >
          <Home className="w-7 h-7" strokeWidth={2.5} />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button
          onClick={() => handleNavigate("feed")}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors text-gray-600`}
        >
          <Image className="w-7 h-7" strokeWidth={2.5} />
          <span className="text-xs font-semibold">Photos</span>
        </button>
        <button
          onClick={() => handleNavigate("family")}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors text-gray-600`}
        >
          <Users className="w-7 h-7" strokeWidth={2.5} />
          <span className="text-xs font-semibold">Family</span>
        </button>
        <button
          onClick={() => handleNavigate("events")}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors text-gray-600`}
        >
          <Calendar className="w-7 h-7" strokeWidth={2.5} />
          <span className="text-xs font-semibold">Events</span>
        </button>
        <button
          onClick={() => handleNavigate("diary")}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors text-gray-600`}
        >
          <BookOpen className="w-7 h-7" strokeWidth={2.5} />
          <span className="text-xs font-semibold">Diary</span>
        </button>
        <button
          onClick={() => handleNavigate("reminders")}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors text-gray-600`}
        >
          <Bell className="w-7 h-7" strokeWidth={2.5} />
          <span className="text-xs font-semibold">Meds</span>
        </button>
      </div>
    </nav>
</div>
  );
}

export default App;