import { BookOpen, Zap, Settings, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function Learning() {
    const categories = [
        {
            title: "Engines",
            icon: Settings,
            color: "text-red-400",
            bg: "bg-red-500/10",
            topics: ["Petrol Engines", "Diesel Engines", "Two Stroke Engines", "Four Stroke Engines"]
        },
        {
            title: "Electric & Hybrid",
            icon: Zap,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            topics: ["Electric Vehicles", "Hybrid Vehicles", "Battery Management Systems", "Regenerative Braking"]
        },
        {
            title: "Systems",
            icon: BookOpen,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            topics: ["Transmission", "Clutch", "Gearbox", "Steering", "Suspension", "Braking Systems"]
        },
        {
            title: "Workshop Safety",
            icon: Shield,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            topics: ["PPE", "Fire Safety", "Electrical Safety", "Chemical Handling"]
        }
    ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <header className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BookOpen className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-200">Learning Modules</h1>
                    <p className="text-sm text-slate-500 mt-2">Explore structured automobile engineering content.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#111114] rounded-3xl p-6 border border-slate-800 shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.bg} ${cat.color} shadow-inner`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-200">{cat.title}</h2>
                            </div>
                            
                            <ul className="space-y-3">
                                {cat.topics.map((topic, j) => (
                                    <li key={j} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1a1a20] transition-colors cursor-pointer group border border-transparent hover:border-slate-800">
                                        <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">{topic}</span>
                                        <div className="w-6 h-6 rounded-full bg-[#0a0a0c] flex items-center justify-center group-hover:bg-blue-500/10 border border-slate-800 group-hover:border-blue-500/20 transition-colors">
                                            <BookOpen className="w-3 h-3 text-slate-600 group-hover:text-blue-400" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
}
