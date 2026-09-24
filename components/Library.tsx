'use client';

import { useState, useEffect } from 'react';
import WorkoutCard from './WorkoutCard';

export default function Library() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('duration');

  useEffect(() => {
    fetch('https://api.abcz.workers.dev/api/fitlog')
      .then((res) => res.json())
      .then((data) => {
        const workoutArray = Array.isArray(data) ? data : data.data || [];
        setWorkouts(workoutArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === 'duration') return a.duration - b.duration;
    if (sortBy === 'calories') return a.calories - b.calories;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="library" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 mt-3 text-lg">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg">
          <span className="text-zinc-400 text-sm font-medium">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 text-white font-bold outline-none cursor-pointer border-none focus:ring-0"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ccff00]"></div>
          <span className="ml-4 text-zinc-400 text-lg">Loading workouts...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {sortedWorkouts.map((workout: any) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}