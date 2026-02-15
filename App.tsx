import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { COURSES, TIPS } from './constants';
import { AppState, Screen, UserProgress, Theme } from './types';
import { ChapterView } from './components/ChapterView';
import { Playground } from './components/Playground';
import { Profile } from './components/Profile';
import { ChatBot } from './components/ChatBot';
import { Trophy, Star, ChevronRight, Book, Award, Terminal, Image as ImageIcon, Sparkles, ArrowLeft, ScanLine, Globe, Zap, CheckCircle2, Construction } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const STORAGE_KEY = 'codebuddy_progress_v2'; // Bumped version for new state fields

// Theme definitions mapped to CSS variables (R G B)
const THEME_VARS: Record<Theme, { primary: string; secondary: string; accent: string; background: string }> = {
  classic: { primary: '99 102 241', secondary: '236 72 153', accent: '139 92 246', background: '248 250 252' }, // Indigo / Slate
  ocean: { primary: '6 182 212', secondary: '59 130 246', accent: '14 165 233', background: '240 253 250' },   // Cyan / Azure
  sunset: { primary: '249 115 22', secondary: '225 29 72', accent: '245 158 11', background: '255 247 237' },   // Orange / Rose
  forest: { primary: '16 185 129', secondary: '5 150 105', accent: '132 204 22', background: '240 253 244' },   // Emerald / Green
  midnight: { primary: '124 58 237', secondary: '79 70 229', accent: '139 92 246', background: '238 242 255' } // Violet / Indigo (Light bg for now to keep contrast)
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentScreen: 'HOME',
    selectedLanguageId: null,
    selectedChapterId: null,
    progress: {},
    theme: 'sunset',
    playgroundUsage: 0
  });

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(prev => ({
           ...prev,
           ...parsed,
           // Ensure theme is valid or fallback to sunset
           theme: parsed.theme || 'sunset',
           progress: parsed.progress || {},
           playgroundUsage: parsed.playgroundUsage || 0
        }));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  // Apply Theme Side Effects
  useEffect(() => {
    const root = document.documentElement;
    const colors = THEME_VARS[state.theme];
    if (colors) {
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-secondary', colors.secondary);
        root.style.setProperty('--color-accent', colors.accent);
        root.style.setProperty('--color-background', colors.background);
    }
  }, [state.theme]);

  // Persistence Helper
  const persistState = (newState: Partial<AppState>) => {
    setState(prev => {
        const updated = { ...prev, ...newState };
        // Don't save transient UI state like currentScreen
        const { currentScreen, selectedLanguageId, selectedChapterId, ...toSave } = updated;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        return updated;
    });
  };

  const handleNavigate = (screen: Screen) => {
    setState(prev => ({ ...prev, currentScreen: screen, selectedLanguageId: null, selectedChapterId: null }));
  };

  const selectLanguage = (id: string) => {
    setState(prev => ({ ...prev, currentScreen: 'COURSE', selectedLanguageId: id, selectedChapterId: null }));
  };

  const selectChapter = (chapterId: string | null) => {
    setState(prev => ({ ...prev, selectedChapterId: chapterId }));
  };

  const completeChapter = () => {
    const { selectedLanguageId, selectedChapterId, progress } = state;
    if (!selectedLanguageId || !selectedChapterId) return;

    const langProgress = progress[selectedLanguageId] || { completedChapters: [], chapterAiCache: {} };
    if (!langProgress.completedChapters.includes(selectedChapterId)) {
        const newProgress = {
            ...progress,
            [selectedLanguageId]: {
                ...langProgress,
                completedChapters: [...langProgress.completedChapters, selectedChapterId]
            }
        };
        persistState({ progress: newProgress });
    }
  };

  const cacheAiContent = (content: string) => {
    const { selectedLanguageId, selectedChapterId, progress } = state;
    if (!selectedLanguageId || !selectedChapterId) return;

    const langProgress = progress[selectedLanguageId] || { completedChapters: [], chapterAiCache: {} };
    const newProgress = {
        ...progress,
        [selectedLanguageId]: {
            ...langProgress,
            chapterAiCache: {
                ...langProgress.chapterAiCache,
                [selectedChapterId]: content
            }
        }
    };
    persistState({ progress: newProgress });
  };

  const incrementPlaygroundUsage = () => {
      persistState({ playgroundUsage: state.playgroundUsage + 1 });
  };

  const handleThemeChange = (newTheme: Theme) => {
      persistState({ theme: newTheme });
  };

  const handleNextChapter = () => {
    const { selectedLanguageId, selectedChapterId } = state;
    const course = COURSES.find(c => c.id === selectedLanguageId);
    if (!course || !selectedChapterId) return;

    const idx = course.chapters.findIndex(c => c.id === selectedChapterId);
    if (idx < course.chapters.length - 1) {
        selectChapter(course.chapters[idx + 1].id);
    } else {
        selectChapter(null);
    }
  };

  // Render Logic
  const renderContent = () => {
    if (state.currentScreen === 'PROFILE') {
        return (
            <Profile 
                progress={state.progress}
                playgroundUsage={state.playgroundUsage}
                currentTheme={state.theme}
                onThemeChange={handleThemeChange}
            />
        );
    }

    if (state.currentScreen === 'PLAYGROUND') {
      return (
        <div key="playground" className="animate-fade-in h-full">
           <Playground onUsage={incrementPlaygroundUsage}/>
        </div>
      );
    }

    if (state.currentScreen === 'HOME') {
      return (
        <div key="home" className="space-y-8 animate-fade-in pb-8">
          
          {/* New Hero Section */}
          <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-sm border border-slate-100 animate-slide-up">
              {/* Abstract decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 text-center space-y-4 mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wide shadow-lg shadow-slate-200">
                     <Sparkles size={12} className="text-yellow-400" />
                     <span>Your AI-Powered Tutor</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-800 leading-tight">
                    Master Coding, <br className="sm:hidden" /> Easily Like a Game.
                  </h2>
                  <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                    Upload handwritten notes, hear explanations in your local language, and master logic through interactive guided lessons.
                  </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2 transition-transform hover:scale-105">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                          <ScanLine size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-700 text-sm">Scan Code</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Upload Notes</p>
                      </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2 transition-transform hover:scale-105">
                      <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                          <Globe size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-700 text-sm">Local Voice</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Multi-Language</p>
                      </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2 transition-transform hover:scale-105">
                      <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                          <Zap size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-700 text-sm">Instant Fix</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">AI Feedback</p>
                      </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2 transition-transform hover:scale-105">
                      <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                          <CheckCircle2 size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-700 text-sm">Guided Path</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Step-by-Step</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Hero / Playground Entry */}
          <div className="space-y-6 animate-slide-up delay-100">
            <div 
              onClick={() => handleNavigate('PLAYGROUND')}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer border border-slate-700 hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                <Terminal size={140} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30">Free Mode</span>
                  <div className="flex gap-1">
                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="text-yellow-400" size={24} />
                  AI Code Playground
                </h3>
                <p className="text-slate-300 mb-6 max-w-lg text-sm sm:text-base">
                  Stuck? Experiment freely here. Upload handwritten notes or type code—our AI Tutor explains errors in your language instantly.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    className="bg-primary hover:bg-opacity-90 text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
                  >
                    <Terminal size={18} />
                    Open Code Editor
                  </button>
                  
                  <button 
                    className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 backdrop-blur-sm border border-white/10"
                  >
                    <ImageIcon size={18} />
                    Scan Handwriting
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="py-4 animate-slide-up delay-200">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Structured Learning Path</h2>
            <p className="text-slate-500 mb-6">Master the basics with guided practice after every chapter.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map((course, index) => {
                const progress = state.progress[course.id] || { completedChapters: [] };
                const percent = Math.round((progress.completedChapters.length / course.chapters.length) * 100);
                
                return (
                  <div 
                    key={course.id}
                    onClick={() => selectLanguage(course.id)}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${course.color}`}>
                      {course.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                    <p className="text-sm text-slate-500 mb-4 h-10 line-clamp-2">{course.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-400">
                        <span>Progress</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Added "More chapters coming soon" for Home Screen */}
            <div className="text-center mt-8 pb-4 animate-fade-in delay-500">
                 <p className="text-slate-400 font-bold flex items-center justify-center gap-2">
                   <Construction size={16} /> More chapters coming soon...
                 </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 relative overflow-hidden animate-slide-up delay-300 shadow-lg">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor"/> 
                Daily Tip
              </h3>
              <p className="text-lg opacity-90 italic">"{TIPS[Math.floor(Math.random() * TIPS.length)]}"</p>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Award size={100} />
            </div>
          </div>
        </div>
      );
    }

    if (state.currentScreen === 'COURSE' && state.selectedLanguageId) {
      const course = COURSES.find(c => c.id === state.selectedLanguageId);
      if (!course) return null;

      if (state.selectedChapterId) {
        const chapter = course.chapters.find(c => c.id === state.selectedChapterId);
        if (!chapter) return null;

        const langProgress = state.progress[state.selectedLanguageId] || { completedChapters: [], chapterAiCache: {} };
        const cachedAi = langProgress.chapterAiCache[chapter.id] || null;

        return (
          <div key={`chapter-${chapter.id}`} className="animate-fade-in">
             <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
                <button className="hover:text-primary flex items-center gap-1 transition-colors" onClick={() => handleNavigate('HOME')}>
                   <ArrowLeft size={14}/> Home
                </button>
                <ChevronRight size={14} className="text-slate-300"/>
                <button className="hover:text-primary transition-colors" onClick={() => selectChapter(null)}>
                    {course.name}
                </button>
                <ChevronRight size={14} className="text-slate-300"/>
                <span className="font-bold text-slate-800">{chapter.title}</span>
             </div>

            <ChapterView 
              chapter={chapter} 
              languageName={course.name}
              onComplete={completeChapter}
              cachedAiContent={cachedAi}
              onCacheAiContent={cacheAiContent}
              onNext={handleNextChapter}
              onGoBack={() => selectChapter(null)}
            />
          </div>
        );
      }

      // Course Chapter List
      return (
        <div key={`course-${course.id}`} className="space-y-6 animate-fade-in pb-8">
           <div className="flex items-center gap-4 mb-8">
              <button onClick={() => handleNavigate('HOME')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors">
                  <ArrowLeft size={24}/>
              </button>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${course.color}`}>
                  {course.icon}
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-800">{course.name} Course</h2>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-slide-up">
              {course.chapters.map((chapter, index) => {
                 const isCompleted = state.progress[course.id]?.completedChapters.includes(chapter.id);
                 return (
                   <div 
                    key={chapter.id}
                    onClick={() => selectChapter(chapter.id)}
                    className={`p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between group`}
                    style={{ animationDelay: `${index * 50}ms` }}
                   >
                     <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isCompleted ? 'bg-green-100 text-green-600 scale-100' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                           {isCompleted ? <CheckIcon/> : index + 1}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{chapter.title}</h4>
                            <p className="text-xs text-slate-400">{chapter.keyPoints[0]}</p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-3">
                        {isCompleted && (
                            <div className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full animate-scale-in">
                                <Trophy size={12}/> Completed
                            </div>
                        )}
                        <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors group-hover:translate-x-1" size={20}/>
                     </div>
                   </div>
                 )
              })}
           </div>
           
           {/* Added "More chapters coming soon" for Chapter List */}
           <div className="text-center mt-8 pb-8 animate-fade-in delay-500">
                 <p className="text-slate-400 font-bold flex items-center justify-center gap-2">
                   <Construction size={16} /> More chapters coming soon...
                 </p>
           </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Layout currentScreen={state.currentScreen} onNavigate={handleNavigate}>
      {renderContent()}
      <ChatBot />
      <Analytics />
    </Layout>
  );
};

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default App;
