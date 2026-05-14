'use client'

import React from 'react';
import { Card } from '../../components/ui/card';
import { PageLayout } from '../../components/ui/page-layout';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Gamepad2, Tv, Activity, Heart, Sparkles } from 'lucide-react';

export default function HobbiesPage() {
  const { theme } = useTheme();
  // StarCraft II race
  const sc2Race = 'Terran';

  const backgroundIcons = [
    { Icon: Gamepad2, className: "top-20 right-10 opacity-20" },
    { Icon: Tv, className: "bottom-40 left-10 opacity-15" },
    { Icon: Activity, className: "top-1/3 left-1/4 opacity-10" },
    { Icon: Heart, className: "bottom-20 right-1/4 opacity-15" },
  ];

  return (
    <PageLayout 
      title="My Hobbies" 
      badge="Hobbies" 
      showBackButton
      backgroundIcons={backgroundIcons}
    >
      <div className="relative z-10 flex flex-col items-center gap-20">
        
        {/* StarCraft II Hobby Section */}
        <section className="w-full max-w-4xl">
          <div className="flex flex-col items-center mb-10">
            <div className="p-4 bg-primary/10 rounded-3xl mb-4 animate-pulse">
              <Image
                src="/sc2-logo.png"
                alt="Starcraft II Logo"
                width={64}
                height={64}
                className="drop-shadow-2xl"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-[0.2em] uppercase text-center drop-shadow-sm">
              StarCraft II
            </h2>
          </div>

          <Card className="bg-card/40 backdrop-blur-xl border-primary/20 p-12 flex flex-col items-center group hover:border-primary/40 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-6 bg-primary/5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                <Image 
                  src={theme === 'dark' ? "/logo-white.png" : "/logo-black.png"} 
                  alt="Race Icon" 
                  width={48} 
                  height={48} 
                />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-2">Main Race</span>
              <span className="text-4xl font-black text-primary tracking-tighter italic">{sc2Race}</span>
            </div>
          </Card>
        </section>

        {/* Anime Hobby Section */}
        <section className="w-full max-w-5xl">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">My Top Anime</h2>
            <div className="h-1 w-20 bg-primary/20 rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: "Made in Abyss", img: "/anime/made_in_abyss.jpg", color: "from-pink-500/20" },
              { name: "Quan Zhi Gao Shou", img: "/anime/quan_zhi_gao_shou.jpg", color: "from-blue-500/20" },
              { name: "Bleach", img: "/anime/bleach.jpg", color: "from-orange-500/20" },
              { name: "Grand Blue Dreaming", img: "/anime/grand_blue_dreaming.webp", color: "from-cyan-500/20" },
              { name: "Call of the Night", img: "/anime/call_of_the_night.webp", color: "from-purple-500/20" },
            ].map((anime, index) => (
              <Card 
                key={anime.name} 
                className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/40 transition-all duration-500 group overflow-hidden flex flex-col items-center p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-t ${anime.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                    <Image src={anime.img} alt={anime.name} width={100} height={140} className="object-cover aspect-[2/3]" />
                  </div>
                  <span className="text-sm font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">{anime.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
