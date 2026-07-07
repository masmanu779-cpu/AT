import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Markdown from "react-markdown";

export default function Chat() {
    const [messages, setMessages] = useState<{role: string, parts: string}[]>([
        { role: "model", parts: "Hello Alex. Submit symptoms or a fault code. I'm currently analyzing OBD-II Code P0300 data models." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", parts: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userMsg, history: messages })
            });
            const data = await res.json();
            
            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, { role: "model", parts: data.text }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: "model", parts: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full space-y-6">
            <header className="shrink-0 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="text-blue-500 font-mono text-sm">01</span>
                        Gemini AI Assistant
                    </h1>
                </div>
                <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-1 rounded border border-blue-500/20 uppercase font-bold">Mode: Advanced</span>
            </header>

            <div className="flex-1 bg-[#111114] rounded-3xl border border-slate-800 overflow-hidden flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${m.role === 'user' ? 'bg-slate-700 text-white' : 'bg-blue-600 text-white'}`}>
                                {m.role === 'user' ? 'U' : 'AI'}
                            </div>
                            <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                                m.role === 'user' 
                                ? 'bg-blue-600/10 border border-blue-500/20 text-slate-200 rounded-tr-none' 
                                : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none'
                            }`}>
                                {m.role === 'user' ? (
                                    <p>{m.parts}</p>
                                ) : (
                                    <div className="markdown-body prose prose-invert prose-sm max-w-none prose-p:leading-relaxed text-slate-300">
                                        <Markdown>{m.parts}</Markdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                                AI
                            </div>
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                                <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
                
                <div className="p-4 bg-slate-900 border-t border-slate-800">
                    <div className="relative flex items-center">
                        <input 
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Describe engine behavior or ask a question..."
                            className="w-full pl-4 pr-12 py-3 rounded-xl bg-[#0a0a0c] border border-slate-700 focus:border-blue-500 text-sm outline-none text-white transition-colors"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className="absolute right-2 p-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
