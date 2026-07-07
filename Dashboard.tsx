import { motion } from "motion/react";
import { BookOpen, Camera, Wrench, Calculator, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import imgAiAssistant from "../assets/images/ai_assistant_module_1783364902805.jpg";
import imgFaultDiagnosis from "../assets/images/fault_diagnosis_module_1783364918050.jpg";
import imgCalculators from "../assets/images/calculators_module_1783364928563.jpg";
import imgComponentAnalyzer from "../assets/images/component_analyzer_module_1783364940329.jpg";

export default function Dashboard() {
    const modules = [
        { title: "AI Assistant", icon: BookOpen, desc: "Ask any engineering questions", path: "/chat", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", image: imgAiAssistant },
        { title: "Fault Diagnosis", icon: Wrench, desc: "Identify vehicle issues", path: "/diagnose", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", image: imgFaultDiagnosis },
        { title: "Calculators", icon: Calculator, desc: "Torque, Power, Gear ratios", path: "/calculators", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", image: imgCalculators },
        { title: "Component Analyzer", icon: Camera, desc: "Identify parts via camera", path: "/analyze", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20", image: imgComponentAnalyzer },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 flex-1 flex flex-col"
        >
            <header className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 flex justify-between items-center md:col-span-2">
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Active Course</p>
                        <h3 className="text-lg font-bold text-white">ICE: Thermodynamics</h3>
                        <p className="text-xs text-slate-400 mt-2">Unit 4: Fuel Injection Systems</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 flex items-center justify-center text-xs font-bold text-white">
                        72%
                    </div>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">AI Quick Stats</p>
                    <div className="flex gap-4 mt-3">
                        <div className="flex-1">
                            <p className="text-2xl font-bold text-white">14</p>
                            <p className="text-[10px] text-slate-500">Calculations Solved</p>
                        </div>
                        <div className="flex-1 border-l border-slate-800 pl-4">
                            <p className="text-2xl font-bold text-white">2.4k</p>
                            <p className="text-[10px] text-slate-500">Concepts Mastered</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                {modules.map((mod, i) => {
                    const Icon = mod.icon;
                    return (
                        <Link key={i} to={mod.path} className="flex">
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full bg-[#111114] rounded-3xl border ${mod.border} hover:border-slate-600 shadow-sm transition-all group flex flex-col overflow-hidden`}
                            >
                                <div className="h-40 w-full relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111114] to-transparent z-10" />
                                    <img src={mod.image} alt={mod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                                </div>
                                <div className="p-6 pt-0 flex-1 flex flex-col justify-between relative z-20">
                                    <div className="flex justify-between items-start mb-4 -mt-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${mod.bg} ${mod.color} backdrop-blur-md shadow-lg`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-[#0a0a0c] border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Module {String(i + 1).padStart(2, '0')}</p>
                                        <h3 className="font-bold text-lg text-white">{mod.title}</h3>
                                        <p className="text-sm text-slate-400 mt-1">{mod.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    )
                })}
            </div>
        </motion.div>
    );
}
