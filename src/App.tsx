import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import FamilyScreen from './components/FamilyScreen';
import EventsScreen from './components/EventsScreen';
import RemindersScreen from './components/RemindersScreen';
import VoiceControlMode from './components/VoiceControlMode';

function App() {
  const navigate = useNavigate();

  const handleNavigate = (screen: 
    | "family"
    | "events" 
    | "reminders"
    | "feed"
    | "diary"
    | "settings"
    | "profile"
  ) => {
    navigate(`/${screen}`);
  };

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  const handleTextSizeToggle = () => {
    console.log('Text size toggle');
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginScreen />} />
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
      
      {/* Додайте маршрути для інших екранів */}
      <Route path="/feed" element={<div>Feed Screen</div>} />
      <Route path="/diary" element={<div>Diary Screen</div>} />
      <Route path="/settings" element={<div>Settings Screen</div>} />
      <Route path="/profile" element={<div>Profile Screen</div>} />
    </Routes>
  );
}

export default App;