import React, { useState } from 'react';
import { UserProgress, Theme } from '../types';
import { COURSES } from '../constants';
import { Trophy, Flame, Code, Zap, Palette, Loader2, Check } from 'lucide-react';

interface ProfileProps {
  progress: UserProgress;
  playgroundUsage: number;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const THEMES: { id: Theme; name: string; colors: string[] }[] = [
  { id: 'classic', name: 'Classic', colors: ['#6366f1', '#ec4899'] },
  { id: 'ocean', name: 'Ocean', colors: ['#06b6d4', '#3b82f6'] },
  { id: 'sunset', name: 'Sunset', colors: ['#f97316', '#e11d48'] },
  { id: 'forest', name: 'Forest', colors: ['#10b981', '#059669'] },
  { id: 'midnight', name: 'Midnight', colors: ['#7c3aed', '#4f46e5'] },
];

export const Profile: React.FC<ProfileProps> = ({ progress, playgroundUsage, currentTheme, onThemeChange }) => {
  const [loadingTheme, setLoadingTheme] = useState<Theme | null>(null);

  const totalChaptersCompleted = Object.values(progress).reduce<number>((acc, lang: any) => {
    return acc + (lang.completedChapters?.length || 0);
  }, 0);

  const totalPossibleChapters = COURSES.reduce<number>((acc, course) => acc + course.chapters.length, 0);
  const completionPercentage = totalPossibleChapters > 0 ? Math.round((totalChaptersCompleted / totalPossibleChapters) * 100) : 0;

  const handleThemeClick = (themeId: Theme) => {
    if (themeId === currentTheme) return;
    setLoadingTheme(themeId);
    
    // Simulate loading buffer
    setTimeout(() => {
        onThemeChange(themeId);
        setLoadingTheme(null);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-8">
       {/* Header */}
       <div className="text-center space-y-2 animate-slide-up">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center text-white shadow-lg mb-4">
             <Trophy size={48} className="animate-pulse" />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-800">Your Progress</h2>
          <p className="text-slate-500">Keep up the streak! You're becoming a pro.</p>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up delay-100">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
             <div className="text-primary mb-2 flex justify-center"><Check size={24} /></div>
             <div className="text-2xl font-bold text-slate-800">{totalChaptersCompleted}</div>
             <div className="text-xs text-slate-400 font-bold uppercase">Chapters Done</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
             <div className="text-orange-500 mb-2 flex justify-center"><Flame size={24} /></div>
             <div className="text-2xl font-bold text-slate-800">{completionPercentage}%</div>
             <div className="text-xs text-slate-400 font-bold uppercase">Completion</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
             <div className="text-blue-500 mb-2 flex justify-center"><Code size={24} /></div>
             <div className="text-2xl font-bold text-slate-800">{Object.keys(progress).length}</div>
             <div className="text-xs text-slate-400 font-bold uppercase">Languages Active</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
             <div className="text-yellow-500 mb-2 flex justify-center"><Zap size={24} /></div>
             <div className="text-2xl font-bold text-slate-800">{playgroundUsage}</div>
             <div className="text-xs text-slate-400 font-bold uppercase">AI Assists</div>
          </div>
       </div>

       {/* Course Progress */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-slide-up delay-200">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Course Breakdown</h3>
          <div className="space-y-4">
             {COURSES.map(course => {
                const courseProgress = progress[course.id] || { completedChapters: [] };
                const percent = Math.round((courseProgress.completedChapters.length / course.chapters.length) * 100);
                
                return (
                   <div key={course.id}>
                      <div className="flex justify-between text-sm mb-1">
                         <span className="font-bold text-slate-700 flex items-center gap-2">
                            <span className="text-lg">{course.icon}</span> {course.name}
                         </span>
                         <span className="text-primary font-bold">{percent}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${percent}%` }}
                         ></div>
                      </div>
                   </div>
                );
             })}
          </div>
       </div>

       {/* Theme Selector */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-slide-up delay-300 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
             <Palette className="text-primary" size={20} />
             <h3 className="font-bold text-lg text-slate-800">App Theme</h3>
          </div>
          <p className="text-slate-500 text-sm mb-6">Choose a style that fits your vibe.</p>
          
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
             {THEMES.map(theme => (
                <button
                   key={theme.id}
                   onClick={() => handleThemeClick(theme.id)}
                   className={`group relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${currentTheme === theme.id ? 'ring-4 ring-offset-2 ring-primary scale-105' : 'hover:scale-105 hover:shadow-lg'}`}
                   style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}
                >
                   {loadingTheme === theme.id ? (
                      <Loader2 className="text-white animate-spin" size={24} />
                   ) : currentTheme === theme.id ? (
                      <div className="bg-white/20 p-1 rounded-full backdrop-blur-sm">
                         <Check className="text-white" size={20} strokeWidth={3} />
                      </div>
                   ) : null}
                   
                   <span className="absolute -bottom-8 text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {theme.name}
                   </span>
                </button>
             ))}
          </div>

          {/* Loading Overlay for Theme Switch */}
          {loadingTheme && (
             <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-bold text-primary animate-pulse">Applying Theme...</p>
             </div>
          )}
       </div>
    </div>
  );
};