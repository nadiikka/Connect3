import {
  Calendar,
  MapPin,
  Plus,
  Mic,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import AppHeader from "./AppHeader";

interface ApiEvent {
  id: string;
  name: { fi?: string; en?: string; ru?: string };
  description?: { fi?: string; en?: string; ru?: string };
  images?: { url: string }[];
  location_extra_info?: { fi?: string; en?: string };
  start_time?: string;
  end_time?: string;
}

interface Event {
  id: string;
  title: string;
  type: string;
  location: string;
  distance: string;
  date: string;
  time: string;
  photo: string;
  description: string;
  seniorFriendly: boolean;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function EventsScreen({ onMenuClick, 
  onTextSizeToggle, 
  textSizeMultiplier = 1 ,
}: { onMenuClick?: () => void; 
  onTextSizeToggle?: () => void; 
  textSizeMultiplier?: number;
 }) {

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(today.getMonth() + 1);

        const startDate = today.toISOString().split("T")[0];
        const endDate = nextMonth.toISOString().split("T")[0];

        const url = `https://api.hel.fi/linkedevents/v1/event/?start=${startDate}&end=${endDate}`;
        const response = await fetch(url);
        const data = await response.json();

        
      if (!data?.data) {
        console.warn("No events data found");
        setEvents([]);
        return;
      }
        const seniorKeywords = ["senior", "eläke", "ikääntyneet", "60+", "70+"];

        const mapped: Event[] = data.data
          .filter((ev: ApiEvent) => {
            const name = `${ev.name?.fi ?? ""} ${ev.name?.en ?? ""} ${ev.name?.ru ?? ""}`.toLowerCase();
            return seniorKeywords.some(keyword => name.includes(keyword.toLowerCase()));
          })
          .map((ev: ApiEvent) => {
            const title =
            ev.name?.fi || ev.name?.en || ev.name?.ru || "Untitled event";

            let start: Date | null = null;
            if (ev.start_time) {
              const parsed = new Date(ev.start_time);
              if (!isNaN(parsed.getTime())) start = parsed;
            }
            const date =
              start?.toLocaleDateString("fi-FI") || "Date unknown";
            const time =
              start?.toLocaleTimeString("fi-FI", {
                hour: "2-digit",
                minute: "2-digit",
              }) || "";

            return {
              id: ev.id,
              title,
              type: "Event",
              location:
                ev.location_extra_info?.fi ||
                ev.location_extra_info?.en ||
                "Location unknown",
              distance: "—",
              date,
              time,
              photo: ev.images?.[0]?.url || "",
              description: stripHtml(
              ev.description?.fi ||
              ev.description?.en ||
              ev.description?.ru ||
              "No description"
            ),
              seniorFriendly: true,
            };
          });

        setEvents(mapped);
      } catch (e) {
        console.error("Error loading events:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleAddReminder = (event: Event) => {
    alert(
      `Adding reminder for "${event.title}" on ${event.date} at ${event.time}`
    );
  };

  return (
    <div className="max-w-lg mx-auto">
      <AppHeader onMenuClick={onMenuClick} onTextSizeToggle={onTextSizeToggle} textSizeMultiplier={textSizeMultiplier} />

      <div className="p-6 space-y-6">

        <div className="flex items-center gap-4">
          <Calendar className="w-10 h-10 text-green-600"
strokeWidth={2.5} />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Events in Helsinki</h1>
          </div>
        </div>

        {loading && <p className="text-xl text-gray-500">Loading events...</p>}

        {!loading && events.length === 0 && (
          <p className="text-xl text-gray-700">
            No senior-friendly events found for selected dates.
          </p>
        )}

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden"
            >
              <ImageWithFallback
                src={event.photo}
                alt={event.title}
                className="w-full h-48 object-cover bg-gray-100"
              />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-lg font-semibold">
                        {event.type}
                      </span>
                      <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-lg font-semibold">
                        ✓ Senior Friendly
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xl text-gray-700 mb-4">
                  {event.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-6 h-6 text-green-600" strokeWidth={2.5} />
                    <span className="text-xl">{event.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar
                      className="w-6 h-6 text-blue-600"
                      strokeWidth={2.5}
                    />
                    <span className="text-xl">
                      {event.date} at {event.time}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddReminder(event)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-5 text-2xl font-bold hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-3"
                >
                  <Plus className="w-8 h-8" strokeWidth={2.5} />
                  Add Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}