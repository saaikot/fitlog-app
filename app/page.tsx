import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Hero />
      
      {/* Ekhane pore amra Library Section ta add korbo */}
      <div id="library" className="py-20 text-center text-zinc-500">
        Library section coming soon...
      </div>
    </div>
  );
}