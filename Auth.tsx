import { useState } from "react";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Wrench } from "lucide-react";
import { motion } from "motion/react";

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", cred.user.uid), {
                    email,
                    role,
                    createdAt: new Date().toISOString()
                });
            }
        } catch (err: any) {
            setError(err.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4 text-slate-200 font-sans">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-[#111114] rounded-3xl shadow-xl overflow-hidden border border-slate-800"
            >
                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20">
                            <Wrench className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            AutoMind AI
                        </h1>
                        <p className="text-sm text-slate-500 mt-1 text-center uppercase tracking-widest font-semibold">
                            Engineering Assistant
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-900/20 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-white text-sm"
                                placeholder="student@university.edu"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Password</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-white text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Role</label>
                                <select 
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0c] border border-slate-800 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-white text-sm appearance-none"
                                >
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                </select>
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors mt-8 disabled:opacity-50"
                        >
                            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-xs text-blue-400 font-medium hover:underline tracking-wide"
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
