import React, { useState, useRef } from 'react';
import { checkCode, analyzeCodeImage, getVoiceExplanation, playGeneratedAudio } from '../services/geminiService';
import { Play, Upload, Sparkles, Loader2, Image as ImageIcon, Languages, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUPPORTED_LANGUAGES = [
  "English",
  "Hindi",
  "Hinglish (Hindi + English)",
  "Bengali",
  "Tamil",
  "Telugu"
];

interface PlaygroundProps {
    onUsage?: () => void;
}

export const Playground: React.FC<PlaygroundProps> = ({ onUsage }) => {
  const [code, setCode] = useState('// Write your code here...\n// Or scan your handwritten notes using the button above!');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAICheck = async () => {
    setLoading(true);
    setErrorLine(null); // Reset previous error
    if (onUsage) onUsage();
    
    // Pass selected language to checkCode
    const response = await checkCode(code, "Free Playground Experiment", "General", selectedLanguage);
    setOutput(response.text);
    setErrorLine(response.errorLine);
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setErrorLine(null);
    if (onUsage) onUsage();

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const analysis = await analyzeCodeImage(base64);
      setOutput(analysis);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleVoice = async () => {
    if (!output || voiceLoading) return;
    setVoiceLoading(true);
    // Strip markdown for TTS
    const textToRead = output.replace(/[#*`]/g, '');
    const audioBase64 = await getVoiceExplanation(textToRead.slice(0, 400)); // Limit length
    setVoiceLoading(false);

    if (audioBase64) {
      playGeneratedAudio(audioBase64);
    }
  };

  // Calculations for line highlighter
  // Assuming text-sm (20px line height) and p-2 (8px top padding)
  const LINE_HEIGHT = 20;
  const PADDING_TOP = 8;

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] min-h-[500px]">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-surface flex justify-between items-center flex-wrap gap-4 animate-slide-up transition-colors duration-500">
        <div>
           <h2 className="text-2xl font-display font-bold text-slate-800">Playground</h2>
           <p className="text-slate-500 text-sm">Experiment freely. Use AI to check your work.</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold flex items-center gap-2 transition-colors"
          >
            <ImageIcon size={18}/>
            <span>Upload Image</span>
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
          
          <div className="flex items-center gap-1 bg-slate-50 rounded-xl px-2 border border-slate-200">
             <Languages size={16} className="text-slate-400"/>
             <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent py-2 text-sm text-slate-600 outline-none cursor-pointer font-medium"
             >
                {SUPPORTED_LANGUAGES.map(lang => (
                   <option key={lang} value={lang}>{lang}</option>
                ))}
             </select>
          </div>

          <button 
            onClick={handleAICheck}
            disabled={loading}
            className="px-4 py-2 text-white bg-primary hover:bg-opacity-90 rounded-xl font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Sparkles size={18}/>}
            Ask AI Tutor
          </button>
        </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-0">
        <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col animate-slide-up delay-100 shadow-inner">
            <div className="flex gap-2 p-4 pb-2 bg-slate-900 z-10 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="relative flex-1 min-h-0 w-full group">
                {/* Error Highlighter */}
                {errorLine !== null && (
                    <div 
                        className="absolute left-0 right-0 bg-red-500/25 border-l-4 border-red-500 pointer-events-none transition-transform duration-150"
                        style={{
                            top: PADDING_TOP,
                            height: LINE_HEIGHT,
                            transform: `translateY(${(errorLine - 1) * LINE_HEIGHT - scrollTop}px)`
                        }}
                    />
                )}
                
                <textarea 
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        if (errorLine !== null) setErrorLine(null);
                    }}
                    onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
                    className="w-full h-full bg-transparent text-slate-100 font-mono text-sm leading-5 p-2 px-4 outline-none resize-none whitespace-pre"
                    spellCheck={false}
                    placeholder="// Type your code here..."
                />
            </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-surface overflow-y-auto animate-slide-in-right delay-200 transition-colors duration-500">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-4">
                <h3 className="font-bold text-slate-800">AI Feedback & Output</h3>
                {output && (
                    <button 
                        onClick={handleVoice}
                        disabled={voiceLoading} 
                        className="text-slate-400 hover:text-primary transition-colors disabled:opacity-50"
                        title="Read Aloud"
                    >
                        {voiceLoading ? <Loader2 className="animate-spin" size={20}/> : <Volume2 size={20}/>}
                    </button>
                )}
            </div>
            
            {loading ? (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400 gap-3">
                    <Loader2 className="animate-spin text-primary" size={32}/>
                    <p>Thinking...</p>
                </div>
            ) : output ? (
                <div className="prose prose-sm prose-slate max-w-none animate-fade-in">
                    <ReactMarkdown>{output}</ReactMarkdown>
                </div>
            ) : (
                <div className="text-slate-400 text-center mt-10">
                    <p>Write some code or upload a photo of your notes.</p>
                    <p className="text-xs mt-2">Click "Ask AI Tutor" to get feedback in {selectedLanguage}.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};