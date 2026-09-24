import Image from 'next/image';
import { Dumbbell } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-zinc-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col items-start gap-6">
          <span className="text-[#ccff00] font-bold tracking-widest text-sm uppercase">
            WORKOUT LIBRARY
          </span>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter">
            TRAIN WITH INTENT. <br />
            <span className="text-zinc-500">LOG EVERY SET.</span>
          </h1>
          
          <p className="text-zinc-400 text-lg max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <a 
            href="#library" 
            className="mt-4 flex items-center gap-2 bg-[#ccff00] text-black font-bold uppercase px-8 py-4 rounded-full hover:bg-[#b3e600] transition-colors"
          >
            <Dumbbell className="h-5 w-5" />
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="relative w-full h-80 lg:h-[500px] rounded-2xl overflow-hidden border border-zinc-800">
          <Image 
            src="/banner.png" 
            alt="FitLog Banner" 
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}