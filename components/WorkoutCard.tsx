import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';

interface WorkoutProps {
  workout: {
    id: string | number;
    name: string;
    category: string[];
    equipment: string;
    duration: number;
    calories: number;
    rating: number;
    image?: string;
  };
}

export default function WorkoutCard({ workout }: WorkoutProps) {
  return (
    <Link 
      href={`/workout/${workout.id}`} 
      className="group block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#ccff00] transition-all duration-300 w-full"
    >
      <div className="h-48 overflow-hidden relative bg-zinc-800 w-full">
        <img 
          src={workout.image || '/banner.png'} 
          alt={workout.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {workout.category?.map((cat) => (
            <span 
              key={cat} 
              className="text-[10px] font-bold uppercase tracking-wider text-[#ccff00] bg-[#ccff00]/10 px-2 py-1 rounded"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-[#ccff00] transition-colors">
          {workout.name}
        </h3>
        <p className="text-sm text-zinc-400">{workout.equipment}</p>

        <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2 border-t border-zinc-800 pt-4">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-zinc-500" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={14} className="text-zinc-500" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1.5 text-[#ccff00]">
            <Star size={14} /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}