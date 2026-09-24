import Hero from "@/components/Hero";
import Library from "@/components/Library";

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Hero />
      <Library />
    </div>
  );
}