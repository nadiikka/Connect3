import {
  Users,
  Calendar,
  Bell,
  Sun,
  Image,
  Award,
  BookOpen,
  Check,
  Droplets,
  Footprints,
  Pill,
  Sparkles,
  X,
} from "lucide-react";
import { FamilyPhotoCard } from "./FamilyPhotoCard";
import { ActivityTracker } from "./ActivityTracker";
import AppHeader from "./AppHeader";
import { useState } from "react";

interface HomeScreenProps {
  onNavigate: (
    screen:
      | "family"
      | "events"
      | "reminders"
      | "feed"
      | "diary"
      | "settings"
      | "profile",
  ) => void;
  onMenuClick?: () => void;
  onTextSizeToggle?: () => void;
  textSizeMultiplier?: number;
}

export default function HomeScreen({
  onNavigate,
  onMenuClick,
  onTextSizeToggle,
  textSizeMultiplier = 1,
}: HomeScreenProps) {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Morning stretch",
      icon: <Sparkles className="w-6 h-6 text-orange-500" />,
      completed: true,
      points: 10,
    },
    {
      id: "2",
      title: "Walk to shop",
      icon: <Footprints className="w-6 h-6 text-green-500" />,
      completed: false,
      points: 15,
    },
    {
      id: "3",
      title: "Drink water",
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      completed: true,
      points: 5,
    },
    {
      id: "4",
      title: "Medication",
      icon: <Pill className="w-6 h-6 text-purple-500" />,
      completed: true,
      points: 10,
    },
  ]);

  // header/dialog moved to reusable AppHeader

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const greeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  };

  const completedTasks = tasks.filter(
    (t) => t.completed,
  ).length;
  const tasksLeft = tasks.length - completedTasks;
  const totalPoints = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.points, 0);
  const currentStreak = 7;

  return (
    <div className="max-w-lg mx-auto">
      <AppHeader onMenuClick={onMenuClick} onTextSizeToggle={onTextSizeToggle} textSizeMultiplier={textSizeMultiplier} />

      {/* Scrollable Content */}
      <div className="p-6 pt-0 space-y-6">
        {/* Greeting Section */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sun className="w-8 h-8" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold">
              {greeting()}!
            </h1>
          </div>
          <p className="text-lg opacity-90">{dateString}</p>
        </div>

        {/* Activity Tracker */}
        <ActivityTracker />

        {/* Family Updates */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Family Updates
          </h2>
          <div className="space-y-4">
            <FamilyPhotoCard
            name="Sarah"
            status="Available"
            lastActivity="Active now"
            relationship="Daughter"
            photo="/photos/sarah.jpg"
          />

          <FamilyPhotoCard
            name="Michael"
            status="At Work"
            lastActivity="2 hours ago"
            relationship="Son"
            photo="/photos/michael.jpg"
          />

          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate("feed")}
            className="w-full bg-gradient-to-r from-rose-200 to-pink-200 text-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all active:scale-98 flex items-center gap-6"
          >
            <div className="bg-white/80 rounded-2xl p-4">
              <Image
                className="w-12 h-12 text-rose-600"
                strokeWidth={2.5}
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-1">
                Family Photos
              </h2>
              <p className="text-xl text-gray-700">
                See what family is sharing
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate("family")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all active:scale-98 flex items-center gap-6"
          >
            <div className="bg-white/20 rounded-2xl p-4">
              <Users className="w-12 h-12" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-1">
                Family
              </h2>
              <p className="text-xl text-blue-100">
                Call or message your loved ones
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate("events")}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all active:scale-98 flex items-center gap-6"
          >
            <div className="bg-white/20 rounded-2xl p-4">
              <Calendar
                className="w-12 h-12"
                strokeWidth={2.5}
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-1">
                Events Nearby
              </h2>
              <p className="text-xl text-green-100">
                Find activities in your area
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate("diary")}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all active:scale-98 flex items-center gap-6"
          >
            <div className="bg-white/20 rounded-2xl p-4">
              <BookOpen
                className="w-12 h-12"
                strokeWidth={2.5}
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-1">
                My Diary
              </h2>
              <p className="text-xl text-amber-100">
                View your daily activities
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate("reminders")}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all active:scale-98 flex items-center gap-6"
          >
            <div className="bg-white/20 rounded-2xl p-4">
              <Bell className="w-12 h-12" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-1">
                Reminders
              </h2>
              <p className="text-xl text-purple-100">
                View your medications & tasks
              </p>
            </div>
          </button>
        </div>

        {/* Voice Command Hints */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">
            💡 Voice Commands
          </h3>
          <p className="text-xl text-purple-800 mb-3">
            Use the microphone button at the bottom to try:
          </p>
          <ul className="space-y-2 text-lg text-purple-700">
            <li>• "Show family photos"</li>
            <li>• "Call Sarah"</li>
            <li>• "What events are today?"</li>
            <li>• "Show my reminders"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}