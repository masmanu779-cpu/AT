import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Camera } from "lucide-react";
import Markdown from "react-markdown";

export default function ImageAnalyzer() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            setResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!imageFile) return;
        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const res = await fetch("/api/analyze-image", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data.text);
        } catch (error) {
            console.error(error);
            setResult("Failed to analyze image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <header className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-green-500 font-mono text-sm">03</span>
                    Visual Identification
                </h1>
                <p className="text-xs text-slate-500 mt-2">Upload a photo of an automobile part for AI identification.</p>
            </header>

            <div className="bg-[#111114] rounded-3xl p-6 border border-slate-800">
                <input 
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                
                {!imagePreview ? (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-slate-900 transition-all text-slate-500 group bg-[#0a0a0c]"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-slate-400" />
                        </div>
                        <span className="font-medium text-slate-300 text-sm">Upload Component Image</span>
                        <span className="text-[10px] text-slate-500 mt-1">AI will identify & explain working principle</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0c] border border-slate-800 aspect-video flex items-center justify-center">
                            <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 text-white p-2 rounded-xl backdrop-blur-md transition-colors border border-slate-700"
                            >
                                <Camera className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <button 
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full py-3.5 bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 disabled:opacity-50 text-green-400 rounded-xl font-medium transition-colors text-sm"
                        >
                            {loading ? "Analyzing Component..." : "Analyze Image"}
                        </button>
                    </div>
                )}
            </div>

            {result && (
                <div className="bg-[#111114] rounded-3xl p-6 md:p-8 border border-slate-800">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-6 uppercase tracking-widest pb-4 border-b border-slate-800">
                        <ImageIcon className="w-5 h-5 text-green-500" />
                        Analysis Result
                    </h3>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none text-slate-300">
                        <Markdown>{result}</Markdown>
                    </div>
                </div>
            )}
        </div>
    );
}
