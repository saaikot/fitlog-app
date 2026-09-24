import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 text-white py-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-[#ccff00]" />
          <span className="font-bold text-lg tracking-wider uppercase">FitLog</span>
        </div>
        <p className="text-zinc-500 text-sm text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}