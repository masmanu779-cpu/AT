import { useState } from "react";
import { CheckSquare, AlertCircle, Wrench } from "lucide-react";
import Markdown from "react-markdown";

export default function Viva() {
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");
    
    const [question, setQuestion] = useState<string | null>(null);
    const [answer, setAnswer] = useState("");
    
    const [evaluation, setEvaluation] = useState<any>(null);
    
    const [loadingQuestion, setLoadingQuestion] = useState(false);
    const [loadingEval, setLoadingEval] = useState(false);

    const generateQuestion = async () => {
        if (!topic.trim()) return;
        setLoadingQuestion(true);
        setQuestion(null);
        setAnswer("");
        setEvaluation(null);

        try {
            const res = await fetch("/api/viva/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, difficulty })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setQuestion(data.text);
        } catch (err) {
            console.error(err);
            setQuestion("Failed to generate question. Please try again.");
        } finally {
            setLoadingQuestion(false);
        }
    };

    const submitAnswer = async () => {
        if (!answer.trim() || !question) return;
        setLoadingEval(true);

        try {
            const res = await fetch("/api/viva/evaluate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, answer })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setEvaluation(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingEval(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <header className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <CheckSquare className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-200">AI Viva Practice</h1>
                    <p className="text-sm text-slate-500 mt-2">Prepare for oral exams with AI-generated questions and evaluations.</p>
                </div>
            </header>

            {!question ? (
                <div className="bg-[#111114] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Topic</label>
                        <input 
                            type="text" 
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                            placeholder="e.g., Four Stroke Diesel Engine"
                            className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-slate-200 transition-all placeholder:text-slate-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                        <select 
                            value={difficulty}
                            onChange={e => setDifficulty(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-slate-200 transition-all appearance-none"
                        >
                            <option value="beginner" className="bg-[#111114]">Beginner</option>
                            <option value="intermediate" className="bg-[#111114]">Intermediate</option>
                            <option value="advanced" className="bg-[#111114]">Advanced</option>
                        </select>
                    </div>
                    <button 
                        onClick={generateQuestion}
                        disabled={!topic.trim() || loadingQuestion}
                        className="w-full py-3.5 mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-900/20"
                    >
                        {loadingQuestion ? "Generating..." : "Generate Question"}
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-blue-500/10 rounded-3xl p-6 border border-blue-500/20 shadow-inner">
                        <div className="flex items-center gap-2 text-blue-400 font-semibold mb-3">
                            <CheckSquare className="w-5 h-5" />
                            Question
                        </div>
                        <div className="text-slate-200 text-lg leading-relaxed">
                            <Markdown>{question}</Markdown>
                        </div>
                    </div>

                    {!evaluation ? (
                        <div className="bg-[#111114] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Your Answer</label>
                                <textarea 
                                    value={answer}
                                    onChange={e => setAnswer(e.target.value)}
                                    rows={5}
                                    placeholder="Type your explanation here..."
                                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-slate-200 resize-none transition-all placeholder:text-slate-600"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setQuestion(null)}
                                    className="px-6 py-3.5 bg-[#0a0a0c] hover:bg-slate-800 text-slate-300 rounded-xl font-medium transition-colors border border-slate-800 hover:border-slate-700"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={submitAnswer}
                                    disabled={!answer.trim() || loadingEval}
                                    className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-emerald-900/20"
                                >
                                    {loadingEval ? "Evaluating..." : "Submit Answer"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#111114] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                <h3 className="text-lg font-bold text-slate-200">Evaluation Result</h3>
                                <div className="text-2xl font-black text-emerald-400">
                                    {evaluation.marks}/10
                                </div>
                            </div>
                            
                            <div className="space-y-4 text-sm">
                                <div>
                                    <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-1">
                                        <CheckSquare className="w-4 h-4 text-emerald-500" />
                                        Correct Explanation
                                    </h4>
                                    <p className="text-slate-400">{evaluation.explanation}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-1">
                                        <AlertCircle className="w-4 h-4 text-orange-500" />
                                        Suggestions
                                    </h4>
                                    <p className="text-slate-400">{evaluation.suggestions}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-1">
                                        <Wrench className="w-4 h-4 text-blue-500" />
                                        Improvement Tips
                                    </h4>
                                    <p className="text-slate-400">{evaluation.tips}</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    setQuestion(null);
                                    setAnswer("");
                                    setEvaluation(null);
                                }}
                                className="w-full py-3.5 bg-[#0a0a0c] hover:bg-slate-800 text-slate-300 rounded-xl font-medium transition-colors border border-slate-800 hover:border-slate-700"
                            >
                                Practice Another Topic
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
