import { Routes, Route, Navigate } from "react-router-dom";

import HomeScreen from "./components/HomeScreen";
import FamilyScreen from "./components/FamilyScreen";
import EventsScreen from "./components/EventsScreen";
import RemindersScreen from "./components/RemindersScreen";
import LoginScreen from "./components/LoginScreen";
import VoiceControlMode from "./components/VoiceControlMode";

function App() {
  return (
    <Routes>

      {/* Стартовий екран */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Всі основні екрани */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/family" element={<FamilyScreen />} />
      <Route path="/events" element={<EventsScreen />} />
      <Route path="/reminders" element={<RemindersScreen />} />
      <Route path="/voice" element={<VoiceControlMode />} />

    </Routes>
  );
}

export default App;
