'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, Flame, Star, Dumbbell, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WorkoutDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToPlan = () => {
    toast.success('Added to today\'s plan');
  };

  const handleSaveForLater = () => {
    toast.success('Saved for later');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ccff00]"></div>
        <span className="ml-4 text-zinc-400 text-lg">Loading details...</span>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-zinc-400">
        Workout not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => router.back()} 
        className="text-zinc-400 hover:text-[#ccff00] mb-8 flex items-center gap-2 transition-colors"
      >
        &larr; Back to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="relative w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
          <img 
            src={workout.image || '/banner.png'} 
            alt={workout.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-4">
              {workout.name}
            </h1>
            <p className="text-zinc-400 text-lg">
              {workout.description || "A compound movement that builds strength and power from a stable base."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {workout.category?.map((cat: string) => (
              <span 
                key={cat} 
                className="text-xs font-bold uppercase tracking-wider text-[#ccff00] bg-[#ccff00]/10 px-3 py-1.5 rounded"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Key Specs
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">EQUIPMENT</span>
                <span className="text-white font-medium text-right">{workout.equipment}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">DIFFICULTY</span>
                <span className="text-white font-medium text-right">{workout.difficulty || 'Intermediate'}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">SETS</span>
                <span className="text-white font-medium text-right">{workout.sets || '4'}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">REPS</span>
                <span className="text-white font-medium text-right">{workout.reps || '6-8'}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">DURATION</span>
                <span className="text-white font-medium text-right">{workout.duration} min</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">CALORIES</span>
                <span className="text-white font-medium text-right">{workout.calories} kcal</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">RATING</span>
                <span className="text-[#ccff00] font-bold text-right flex items-center gap-1 justify-end">
                  <Star size={14} /> {workout.rating}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Instructions
            </h3>
            <ol className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((step) => (
                <li key={step} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 text-[#ccff00] flex items-center justify-center font-bold text-sm">
                    {step}
                  </span>
                  <p className="text-zinc-300 pt-1">
                    Step {step} of the exercise. Maintain proper form and control throughout the movement.
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button 
              onClick={handleAddToPlan}
              className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold uppercase px-6 py-4 rounded-full hover:bg-[#b3e600] transition-colors"
            >
              <Dumbbell size={18} />
              Add to today's plan
            </button>
            <button 
              onClick={handleSaveForLater}
              className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 text-white font-bold uppercase px-6 py-4 rounded-full hover:bg-zinc-800 transition-colors"
            >
              <Bookmark size={18} />
              Save for later
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}