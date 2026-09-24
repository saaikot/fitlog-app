'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, Bookmark } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  
  const planCount = 0; 
  const savedCount = 0;

  const navLinks = [
    { name: 'Workout', href: '/' },
    { name: 'My Plan', href: '/my-plan' },
  ];

  return (
    <nav className="bg-zinc-950 text-white border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (Left side) */}
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-[#ccff00]" />
            <span className="font-bold text-xl tracking-wider uppercase">FitLog</span>
          </Link>

          {/* Navigation Links (Middle) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive ? 'text-[#ccff00]' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Badges (Right side) */}
          <div className="flex items-center gap-3">
            {/* Plan Badge (Filled) */}
            <Link href="/my-plan" className="flex items-center gap-1.5 bg-[#ccff00] text-black px-3 py-1.5 rounded-full text-xs font-bold">
              <Dumbbell className="h-3.5 w-3.5" />
              Plan <span className="bg-black text-[#ccff00] px-1.5 rounded-full">{planCount}</span>
            </Link>

            {/* Saved Badge (Outline) */}
            <Link href="/my-plan" className="flex items-center gap-1.5 border border-zinc-700 text-white px-3 py-1.5 rounded-full text-xs font-bold">
              <Bookmark className="h-3.5 w-3.5" />
              Saved <span className="text-zinc-400">{savedCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}