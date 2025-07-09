'use client'

import React from 'react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { PageLayout } from '../../components/ui/page-layout';
import Image from 'next/image';
import { FaRobot, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from 'next-themes';
// @ts-ignore: react-icons types may be missing if not installed

export default function HobbiesPage() {
  const { theme } = useTheme();
  // StarCraft II stats fetched from Liquipedia
  const sc2Stats = {
    race: 'Terran',
    totalWinnings: '$148',
    yearsActive: '2019 - 2022',
    totalRecord: '49W - 114L',
    winRate: '30.1%',
    earningsByYear: [
      { year: 2020, amount: '$95' },
      { year: 2021, amount: '$53' },
    ],
    matchupWinRates: {
      Protoss: '25.4%',
      Terran: '40%',
      Zerg: '30.7%',
    },
  };

  return (
    <PageLayout title="Hobbies" badge="StarCraft II" showBackButton>
      {/* Enhanced Animated Background with animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full animate-bg-move"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'blur(8px) brightness(1.1)',
            opacity: 0.5,
            mixBlendMode: 'lighten',
          }}
        >
          <defs>
            <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bg-gradient)"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        {/* Existing floating blobs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center" style={{ marginTop: '-3rem' }}>
        {/* Use your logo instead of Terran icon */}
        <Image
          src="/sc2-logo.png"
          alt="Starcraft II Logo"
          width={64}
          height={64}
          className="mb-1 drop-shadow-xl"
        />
        <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg mb-1 tracking-widest uppercase px-2 py-4">
          StarCraft II
        </h1>
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-10">
            <Card className="flex flex-col items-center p-6 card-enhanced-light transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Image src={theme ? theme === 'dark' ? "/logo-white.png" : "/logo-black.png" : "/logo-white.png"} alt="Starcraft II Logo" width={32} height={32} className="mb-2" />
              <span className="text-xs uppercase text-muted-foreground">Race</span>
              <span className="font-semibold text-2xl text-blue-400 mt-1">{sc2Stats.race}</span>
            </Card>
            <Card className="flex flex-col items-center p-6 card-enhanced-light transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <FaTrophy className="text-3xl text-yellow-400 mb-2" />
              <span className="text-xs uppercase text-muted-foreground">Total Winnings</span>
              <span className="font-semibold text-2xl text-blue-400 mt-1">{sc2Stats.totalWinnings}</span>
            </Card>
            <Card className="flex flex-col items-center p-6 card-enhanced-light transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <FaCalendarAlt className="text-3xl text-green-400 mb-2" />
              <span className="text-xs uppercase text-muted-foreground">Years Active</span>
              <span className="font-semibold text-2xl text-blue-400 mt-1">{sc2Stats.yearsActive}</span>
            </Card>
            <Card className="col-span-full p-6 card-enhanced-light transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Overall Record & Win Rate</h3>
              <div className="flex justify-between">
                <span className="font-medium">{sc2Stats.totalRecord}</span>
                <Badge className="bg-green-700 text-green-100 px-3 py-1 rounded-full shadow-sm">
                  {sc2Stats.winRate}
                </Badge>
              </div>
            </Card>
            <Card className="col-span-full p-6 card-enhanced-light transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Earnings by Year</h3>
              <ul className="space-y-1 pl-4 list-disc text-muted-foreground">
                {sc2Stats.earningsByYear.map(({ year, amount }) => (
                  <li key={year}>{year}: {amount}</li>
                ))}
              </ul>
            </Card>
            <Card className="col-span-full p-6 card-enhanced-light transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Matchup Win Rates</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {Object.entries(sc2Stats.matchupWinRates).map(([matchup, rate]) => (
                  <div key={matchup}>
                    <span className="block text-sm text-muted-foreground">vs {matchup}</span>
                    <span className="font-semibold text-blue-400">{rate}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
