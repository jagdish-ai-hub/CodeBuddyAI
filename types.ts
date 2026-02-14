
export interface Chapter {
  id: string;
  title: string;
  definition: string;
  whyItMatters: string;
  keyPoints: string[];
  sampleCode: string;
  commonMistakes: string[];
  practiceQuestion: {
    question: string;
    starterCode: string;
    hint: string;
    // Simple regex or keyword check for local validation to save API calls
    validationRegex?: RegExp;
    expectedKeywords?: string[];
  };
}

export interface LanguageCourse {
  id: string;
  name: string;
  icon: string; // Emoji or Lucide icon name
  color: string;
  description: string;
  chapters: Chapter[];
}

export interface UserProgress {
  [languageId: string]: {
    completedChapters: string[]; // List of chapter IDs
    // Cache for AI responses to minimize API usage
    chapterAiCache: {
      [chapterId: string]: string; 
    };
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type Screen = 'HOME' | 'COURSE' | 'PLAYGROUND' | 'PROFILE';

export type Theme = 'classic' | 'ocean' | 'sunset' | 'forest' | 'midnight';

export interface AppState {
  currentScreen: Screen;
  selectedLanguageId: string | null;
  selectedChapterId: string | null;
  progress: UserProgress;
  theme: Theme;
  playgroundUsage: number;
}
