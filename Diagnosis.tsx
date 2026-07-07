import { useState } from "react";
import { Wrench, AlertTriangle, ShieldCheck } from "lucide-react";
import Markdown from "react-markdown";

export default function Diagnosis() {
    const [symptoms, setSymptoms] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDiagnose = async () => {
        if (!symptoms.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/diagnose", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symptoms })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data.text);
        } catch (err) {
            console.error(err);
            setResult("Failed to diagnose. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <header className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Wrench className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-200">Fault Diagnosis</h1>
                    <p className="text-sm text-slate-500 mt-2">Describe vehicle symptoms for AI-assisted educational diagnosis.</p>
                </div>
            </header>

            <div className="bg-orange-500/10 text-orange-400 p-4 rounded-2xl flex gap-3 text-sm border border-orange-500/20 shadow-inner">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p><strong>Disclaimer:</strong> This tool is for educational purposes only and should not replace professional mechanical inspection. Always prioritize safety.</p>
            </div>

            <div className="bg-[#111114] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        What are the symptoms?
                    </label>
                    <textarea 
                        value={symptoms}
                        onChange={e => setSymptoms(e.target.value)}
                        rows={4}
                        placeholder="e.g., The car shakes violently when braking at high speeds and makes a squealing noise."
                        className="w-full px-4 py-3 rounded-2xl bg-[#0a0a0c] border border-slate-800 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-slate-200 resize-none transition-all placeholder:text-slate-600"
                    />
                </div>
                
                <button 
                    onClick={handleDiagnose}
                    disabled={!symptoms.trim() || loading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                    {loading ? (
                        "Analyzing Systems..."
                    ) : (
                        <>
                            <Wrench className="w-5 h-5" />
                            Run Diagnosis
                        </>
                    )}
                </button>
            </div>

            {result && (
                <div className="bg-[#111114] rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl">
                    <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        Diagnostic Report
                    </h3>
                    <div className="markdown-body text-slate-300 space-y-4">
                        <Markdown>{result}</Markdown>
                    </div>
                </div>
            )}
        </div>
    );
}
