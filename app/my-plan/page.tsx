'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Clock, Flame, Star, Check, X, Dumbbell } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePlan } from '@/context/PlanContext';

export default function MyPlanPage() {
  const { planItems, savedItems, removeFromPlan, removeFromSaved, markAsDone } = usePlan();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState('duration');
  const [searchQuery, setSearchQuery] = useState('');

  const currentItems = activeTab === 'plan' ? planItems : savedItems;

  const filteredItems = useMemo(() => {
    let items = [...currentItems];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category?.some((cat) => cat.toLowerCase().includes(q))
      );
    }

    items.sort((a, b) => {
      if (sortBy === 'duration') return a.duration - b.duration;
      if (sortBy === 'calories') return a.calories - b.calories;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return items;
  }, [currentItems, sortBy, searchQuery]);

  const totalExercises = planItems.length;
  const totalMinutes = planItems.reduce((sum, item) => sum + (item.duration || 0), 0);
  const totalCalories = planItems.reduce((sum, item) => sum + (item.calories || 0), 0);

  const handleMarkAsDone = (id: string | number) => {
    markAsDone(id);
    toast.success('Marked as done');
  };

  const handleRemove = (id: string | number, tab: 'plan' | 'saved') => {
    if (tab === 'plan') {
      removeFromPlan(id);
      toast.success('Removed from plan');
    } else {
      removeFromSaved(id);
      toast.success('Removed from saved');
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen w-full text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3">
            MY PLAN
          </h1>
          <p className="text-zinc-400 text-lg">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">
              Exercises
            </p>
            <p className="text-3xl font-black text-[#ccff00]">{totalExercises}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">
              Minutes
            </p>
            <p className="text-3xl font-black text-white">{totalMinutes}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">
              Calories
            </p>
            <p className="text-3xl font-black text-white">{totalCalories}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full p-1">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-colors ${
                activeTab === 'plan'
                  ? 'bg-[#ccff00] text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-colors ${
                activeTab === 'saved'
                  ? 'bg-[#ccff00] text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 md:w-48 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-[#ccff00]"
            />
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg">
              <span className="text-zinc-400 text-xs font-medium">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-900 text-white text-sm font-bold outline-none cursor-pointer border-none focus:ring-0"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl py-20 px-6 text-center">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-3">
              NOTHING HERE YET
            </h3>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold uppercase px-6 py-3 rounded-full hover:bg-[#b3e600] transition-colors"
            >
              <Dumbbell size={18} />
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all ${
                  item.done ? 'opacity-50' : ''
                }`}
              >
                <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                  <img
                    src={item.image || '/banner.png'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className={`text-lg font-bold uppercase tracking-wide ${item.done ? 'line-through text-zinc-500' : 'text-white'}`}>
                    {item.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-3">{item.equipment}</p>
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-zinc-500" /> {item.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame size={14} className="text-zinc-500" /> {item.calories} kcal
                    </span>
                    <span className="flex items-center gap-1.5 text-[#ccff00]">
                      <Star size={14} /> {item.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-4 py-2 text-xs font-bold uppercase rounded-full border border-zinc-700 text-white hover:bg-zinc-800 transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button
                      onClick={() => handleMarkAsDone(item.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase rounded-full transition-colors ${
                        item.done
                          ? 'bg-zinc-700 text-white'
                          : 'bg-[#ccff00] text-black hover:bg-[#b3e600]'
                      }`}
                    >
                      <Check size={14} />
                      {item.done ? 'Done' : 'Mark as Done'}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(item.id, activeTab)}
                    className="p-2 rounded-full border border-zinc-700 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-colors"
                    aria-label="Remove"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}