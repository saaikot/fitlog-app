import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl md:text-9xl font-black text-[#ccff00] tracking-tighter">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter mt-4 mb-4">
        PAGE NOT FOUND
      </h2>
      <p className="text-zinc-400 mb-8 max-w-md">
        Looks like you skipped leg day and got lost. Let's get you back on track.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-[#ccff00] text-black font-bold uppercase px-6 py-3 rounded-full hover:bg-[#b3e600] transition-colors"
      >
        <Dumbbell size={18} />
        Back to Home
      </Link>
    </div>
  );
}