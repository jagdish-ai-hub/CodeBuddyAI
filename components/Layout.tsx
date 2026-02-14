import React from 'react';
import { Home, Code, Award, BadgeCheck } from 'lucide-react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (screen: Screen) => void;
  currentScreen: Screen;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentScreen }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-slate-800 transition-colors duration-500">
      {/* Header */}
      <header className="bg-surface shadow-sm sticky top-0 z-10 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('HOME')}>
            <div className="bg-primary text-white p-2 rounded-lg transition-colors duration-500">
              <Code size={24} />
            </div>
            <h1 className="text-xl font-display font-bold text-slate-800">
              CodeBuddy<span className="text-primary transition-colors duration-500">AI</span>
            </h1>
          </div>
          
          <nav className="flex gap-2 sm:gap-4">
            <button 
              onClick={() => onNavigate('HOME')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${currentScreen === 'HOME' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button 
              onClick={() => onNavigate('PLAYGROUND')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${currentScreen === 'PLAYGROUND' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <Award size={18} />
              <span className="hidden sm:inline">Playground</span>
            </button>
            <button 
              onClick={() => onNavigate('PROFILE')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${currentScreen === 'PROFILE' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <BadgeCheck size={18} />
              <span className="hidden sm:inline">Status</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-slate-100 py-6 mt-8 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} CodeBuddy AI.</p>
        </div>
      </footer>
    </div>
  );
};