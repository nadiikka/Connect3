import React, { useState } from "react";
import { Award, Sparkles, Footprints, Droplets, Pill, X, Check } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  points: number;
  icon?: React.ReactNode;
}

type AppHeaderProps = {
  onMenuClick?: () => void;
  onTextSizeToggle?: () => void;
  textSizeMultiplier?: number;
};

export default function AppHeader({ onMenuClick, onTextSizeToggle, textSizeMultiplier = 1 }: AppHeaderProps) {
  const [tasks, setTasks] = useState<Task[]>([
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

  const [internalTextSize, setInternalTextSize] = useState(1);
  const [showTasksDialog, setShowTasksDialog] = useState(false);

  const completedTasks = tasks.filter(t => t.completed).length;
  const tasksLeft = tasks.length - completedTasks;
  const totalPoints = tasks
    .filter(t => t.completed)
    .reduce((sum, t) => sum + t.points, 0);
  const currentStreak = 7;

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev);
    if (onMenuClick) onMenuClick();
  };

  const displayTextSize = typeof textSizeMultiplier === 'number' ? textSizeMultiplier : internalTextSize;

  const handleTextSizeToggle = () => {
    setInternalTextSize((v) => (v === 1 ? 1.5 : 1));
    if (onTextSizeToggle) onTextSizeToggle();
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-b from-blue-50 to-purple-50 pb-3 pt-3 h-24 shadow-md">
      <div className="max-w-lg mx-auto px-4 flex items-center justify-between gap-3 relative">
        {/* Menu Button */}
            <button
              onClick={handleMenuClick}
            className="bg-white rounded-full p-4 shadow-lg border-2 border-purple-200 hover:bg-purple-50 transition-colors flex-shrink-0"
            title="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-700"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

        {/* Daily Tasks Button */}
        <button
          onClick={() => {
            setShowTasksDialog(true);
          }}
          className="flex-1 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full px-4 py-4 shadow-lg border-2 border-amber-200 hover:shadow-xl transition-all active:scale-98"
        >
          <div className="flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-amber-600" strokeWidth={2.5} />
            <span className="text-base font-bold text-gray-800">Daily Tasks</span>
            <span className="text-base text-amber-600">{totalPoints} pts</span>
          </div>
        </button>

        {/* Text Size Toggle */}
        <button
          onClick={() => {
            handleTextSizeToggle();
            if (onTextSizeToggle) onTextSizeToggle();
          }}
          className="bg-white rounded-full p-4 shadow-lg border-2 border-purple-200 hover:bg-purple-50 transition-colors flex-shrink-0"
          title="Toggle larger text"
        >
          <span className="text-xl font-bold text-purple-700">
            {displayTextSize === 1.5 ? "A-" : "A+"}
          </span>
        </button>
      </div>

      {/* Local Menu Dropdown (also notifies parent via onMenuClick) */}
      {showMenu && (
        <div className="absolute left-4 top-full mt-3 z-40 bg-white rounded-3xl p-3 shadow-xl border-2 border-gray-100 min-w-[200px]">
          <button
            onClick={() => {
              if (onMenuClick) onMenuClick();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-3 rounded-2xl text-xl font-bold transition-colors flex items-center gap-3 text-gray-700 hover:bg-gray-100"
          >
            My Profile
          </button>
          <button
            onClick={() => {
              if (onMenuClick) onMenuClick();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-3 rounded-2xl text-xl font-bold transition-colors flex items-center gap-3 text-gray-700 hover:bg-gray-100"
          >
            Settings
          </button>
          <div className="border-t-2 border-gray-200 my-2" />
          <button
            onClick={() => {
              if (onMenuClick) onMenuClick();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-3 rounded-2xl text-xl font-bold transition-colors flex items-center gap-3 text-gray-700 hover:bg-gray-100"
          >
            Voice Control Mode
          </button>
        </div>
      )}

    </div>

    {/* Spacer placed outside the fixed header so it pushes page content down */}
    <div className="h-28" aria-hidden="true"></div>

      {/* Daily Tasks Dialog */}
      {showTasksDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b-2 border-gray-200 sticky top-0 bg-white rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award
                    className="w-9 h-9 text-amber-600"
                    strokeWidth={2.5}
                  />
                  <h2 className="text-3xl font-bold text-gray-800">
                    Daily Tasks
                  </h2>
                </div>
                <button
                  onClick={() => setShowTasksDialog(false)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-colors"
                >
                  <X
                    className="w-8 h-8 text-gray-600"
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Stats */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl px-6 py-4 border-2 border-amber-200">
                  <p className="text-lg text-gray-600">
                    Points
                  </p>
                  <p className="text-3xl font-bold text-amber-600">
                    {totalPoints}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl px-6 py-4 border-2 border-amber-200">
                  <p className="text-lg text-gray-600">
                    Streak
                  </p>
                  <p className="text-3xl font-bold text-amber-600">{currentStreak}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl px-6 py-4 border-2 border-purple-200">
                  <p className="text-lg text-gray-600">Left</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {tasksLeft}
                  </p>
                </div>
              </div>

              {/* Tasks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-2xl p-6 border-2 transition-all ${
                      task.completed
                        ? "bg-white border-green-200"
                        : "bg-amber-50/50 border-amber-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`rounded-xl p-3 ${
                          task.completed ? "bg-green-50" : "bg-white"
                        }`}
                      >
                        {task.icon}
                      </div>
                      <h3
                        className={`text-2xl font-bold ${
                          task.completed ? "text-gray-600 line-through" : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`w-full rounded-xl px-4 py-3 text-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                        task.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-500 text-white hover:bg-amber-600"
                      }`}
                    >
                      {task.completed ? (
                        <>
                          <Check
                            className="w-6 h-6"
                            strokeWidth={2.5}
                          />
                          Done
                        </>
                      ) : (
                        "Complete"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
