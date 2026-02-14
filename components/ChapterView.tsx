import React, { useState, useEffect } from 'react';
import { Chapter } from '../types';
import { getLearnMoreExplanation, getVoiceExplanation, playGeneratedAudio } from '../services/geminiService';
import { Play, Check, X, Sparkles, Volume2, Loader2, ArrowRight, Share2, Linkedin, Link as LinkIcon, MessageCircle, Languages } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChapterViewProps {
  chapter: Chapter;
  languageName: string;
  onComplete: () => void;
  cachedAiContent: string | null;
  onCacheAiContent: (content: string) => void;
  onNext: () => void;
  onGoBack: () => void;
}

const SUPPORTED_LANGUAGES = [
  "English",
  "Hindi",
  "Hinglish (Hindi + English)",
  "Bengali",
  "Tamil",
  "Telugu"
];

export const ChapterView: React.FC<ChapterViewProps> = ({ 
  chapter, 
  languageName, 
  onComplete, 
  cachedAiContent, 
  onCacheAiContent, 
  onNext,
  onGoBack
}) => {
  const [userCode, setUserCode] = useState(chapter.practiceQuestion.starterCode);
  const [feedback, setFeedback] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(cachedAiContent);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Reset state when chapter changes
  useEffect(() => {
    setUserCode(chapter.practiceQuestion.starterCode);
    setFeedback('IDLE');
    setFeedbackMsg('');
    setAiContent(cachedAiContent);
    setIsCompleted(false);
    setShowSuccessModal(false);
    // Scroll to top on change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapter, cachedAiContent]);

  const handleRunCode = () => {
    const { validationRegex, expectedKeywords } = chapter.practiceQuestion;
    let isCorrect = false;

    // Local Validation Logic (No API)
    if (validationRegex) {
      isCorrect = validationRegex.test(userCode);
    } else if (expectedKeywords) {
      isCorrect = expectedKeywords.every(kw => userCode.includes(kw));
    } else {
      // Fallback if no validation defined, just check length
      isCorrect = userCode.length > 10;
    }

    if (isCorrect) {
      setFeedback('SUCCESS');
      setFeedbackMsg("🎉 Great job! You got it right!");
      setIsCompleted(true);
      onComplete();
    } else {
      setFeedback('ERROR');
      setFeedbackMsg("🤔 Not quite. Check the hint or use the Playground for AI help.");
      setIsCompleted(false);
    }
  };

  const handleLearnMore = async () => {
    setAiLoading(true);
    const result = await getLearnMoreExplanation(chapter.title, `${languageName}: ${chapter.definition}`, selectedLanguage);
    setAiContent(result);
    onCacheAiContent(result);
    setAiLoading(false);
  };

  const handleVoice = async () => {
    if (!aiContent || voiceLoading) return;
    setVoiceLoading(true);
    // Strip markdown for TTS roughly
    const textToRead = aiContent.replace(/[#*]/g, '');
    const audioBase64 = await getVoiceExplanation(textToRead.slice(0, 400)); // Limit length
    setVoiceLoading(false);

    if (audioBase64) {
      playGeneratedAudio(audioBase64);
    }
  };

  const handleShare = (platform: 'linkedin' | 'whatsapp' | 'copy') => {
    const text = `I just completed the "${chapter.title}" chapter in CodeBuddy AI! 🚀 Learning ${languageName} step-by-step.`;
    const url = "https://codebuddy-ai.netlify.app"; // Placeholder

    if (platform === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else {
        navigator.clipboard.writeText(`${text} ${url}`);
        alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6 relative pb-8">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-slide-up">
        <h2 className="text-3xl font-display font-bold text-slate-800 mb-2">{chapter.title}</h2>
        <p className="text-lg text-slate-600">{chapter.definition}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Col: Content */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-slide-up delay-100">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-blue-500">ℹ️</span> Why it matters
            </h3>
            <p className="text-slate-600">{chapter.whyItMatters}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-slide-up delay-200">
             <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-yellow-500">🔑</span> Key Points
            </h3>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              {chapter.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm text-slate-100 overflow-x-auto animate-slide-up delay-300">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Example</h3>
            <pre className="font-mono text-sm whitespace-pre">{chapter.sampleCode}</pre>
          </div>
        </div>

        {/* Right Col: AI & Practice */}
        <div className="space-y-6">
          
          {/* Learn More AI Button */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 animate-slide-in-right delay-200">
             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-indigo-500"/>
                  Deep Dive (AI)
                </h3>
                
                {/* Language Selector */}
                <div className="flex items-center gap-2">
                  <Languages size={16} className="text-indigo-400"/>
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-xs p-1.5 rounded-lg border border-indigo-200 bg-white text-indigo-700 outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
             </div>
             
             {/* Audio Button */}
             {aiContent && (
                <div className="mb-4 flex justify-end animate-fade-in">
                  <button 
                    onClick={handleVoice} 
                    disabled={voiceLoading}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors text-xs font-bold"
                  >
                    {voiceLoading ? <Loader2 className="animate-spin" size={14}/> : <Volume2 size={14}/>}
                    {voiceLoading ? 'Generating Audio...' : 'Listen'}
                  </button>
                </div>
             )}
             
             {!aiContent ? (
               <div className="text-center py-4">
                 <p className="text-sm text-indigo-700 mb-4">Curious? Ask our AI tutor for a simple analogy in {selectedLanguage}!</p>
                 <button 
                  onClick={handleLearnMore}
                  disabled={aiLoading}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-indigo-100 hover:shadow-md transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
                 >
                   {aiLoading ? <Loader2 className="animate-spin" size={16}/> : <Sparkles size={16}/>}
                   Explain in {selectedLanguage}
                 </button>
               </div>
             ) : (
               <div className="prose prose-sm prose-indigo bg-white/50 p-4 rounded-xl max-h-64 overflow-y-auto animate-fade-in">
                 <ReactMarkdown>{aiContent}</ReactMarkdown>
               </div>
             )}
          </div>

          {/* Practice Area */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full animate-slide-in-right delay-300">
            <h3 className="font-bold text-lg mb-2">💻 Your Turn</h3>
            <p className="text-slate-600 text-sm mb-4">{chapter.practiceQuestion.question}</p>
            <div className="flex-1 min-h-[150px] relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
              <textarea 
                value={userCode}
                onChange={(e) => {
                  setUserCode(e.target.value);
                  if (isCompleted) {
                     setIsCompleted(false);
                     setFeedback('IDLE');
                  }
                }}
                className="w-full h-full p-4 font-mono text-sm bg-transparent outline-none resize-none"
                spellCheck={false}
              />
            </div>
            
            {feedback !== 'IDLE' && !isCompleted && (
              <div className={`mt-4 p-3 rounded-lg text-sm flex items-start gap-2 animate-fade-in ${feedback === 'SUCCESS' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {feedback === 'SUCCESS' ? <Check size={16} className="mt-0.5 shrink-0"/> : <X size={16} className="mt-0.5 shrink-0"/>}
                <p>{feedbackMsg}</p>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              {!isCompleted ? (
                <button 
                  onClick={handleRunCode}
                  className="flex-1 bg-primary text-white py-2 rounded-xl font-bold hover:bg-indigo-600 transition-colors flex justify-center items-center gap-2"
                >
                  <Play size={16} fill="currentColor"/>
                  Run Code
                </button>
              ) : (
                 <button 
                  onClick={() => setShowSuccessModal(true)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-green-600 transition-colors flex justify-center items-center gap-2 animate-bounce shadow-lg shadow-green-200"
                >
                  <Check size={18} strokeWidth={3}/>
                  Complete Chapter
                </button>
              )}
            </div>
             <p className="text-xs text-slate-400 mt-2 text-center">
                Hint: {chapter.practiceQuestion.hint}
             </p>
             
             {/* Go Back Button */}
             <button 
                onClick={onGoBack}
                className="w-full mt-4 py-2 text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
             >
                <ArrowRight className="rotate-180" size={14} /> Back to Chapters
             </button>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl scale-100 animate-scale-in relative overflow-hidden">
             {/* Confetti Background Effect */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"></div>
            
            <button 
               onClick={() => setShowSuccessModal(false)}
               className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors"
            >
               <X size={20}/>
            </button>

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner animate-bounce-slow">
              🎉
            </div>
            
            <h3 className="text-2xl font-display font-bold text-slate-800 mb-2">Lesson Completed!</h3>
            <p className="text-slate-600 mb-8">You've mastered <strong>{chapter.title}</strong>.<br/>Keep up the amazing momentum!</p>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Share Achievement</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => handleShare('linkedin')} 
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Linkedin size={18}/>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">LinkedIn</span>
                </button>
                <button 
                  onClick={() => handleShare('whatsapp')} 
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">
                    <MessageCircle size={18}/>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">WhatsApp</span>
                </button>
                <button 
                  onClick={() => handleShare('copy')} 
                  className="flex flex-col items-center gap-1 group"
                >
                   <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-600 group-hover:text-white transition-all">
                    <LinkIcon size={18}/>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">Copy Link</span>
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => {
                onNext();
                setShowSuccessModal(false);
              }}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              Next Lesson <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};