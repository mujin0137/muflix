import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

import { useAuthStore } from '../stores/useAuthStore';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      login(email);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-black md:bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center bg-no-repeat relative">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 md:bg-black/50 z-0" />
      
      {/* Gradient Overlay for smooth transition */}
       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-0" />


      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header / Logo */}
        <header className="px-4 py-4 md:px-12 md:py-6 flex justify-between items-center">
            <Link to="/" className="text-3xl md:text-4xl font-bold text-primary tracking-tighter hover:scale-105 transition-transform">
                MUFLIX
            </Link>
        </header>

        {/* Login Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[450px] bg-black/75 backdrop-blur-md p-8 md:p-16 rounded-lg shadow-2xl border border-white/10"
          >
            <h1 className="text-3xl font-bold text-white mb-8">로그인</h1>

            {error && (
                <div className="bg-[#e87c03] p-4 rounded-md mb-4 flex items-center gap-3 text-sm text-white">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#333] text-white rounded px-5 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-[#454545] transition peer placeholder-transparent"
                    id="email"
                    placeholder="이메일 주소 또는 전화번호"
                    required
                  />
                  <label 
                    htmlFor="email"
                    className="absolute text-gray-400 text-sm left-5 top-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all duration-200 pointer-events-none"
                  >
                    이메일 주소
                  </label>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#333] text-white rounded px-5 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-[#454545] transition peer placeholder-transparent"
                    id="password"
                    placeholder="비밀번호"
                    required
                  />
                  <label 
                    htmlFor="password"
                    className="absolute text-gray-400 text-sm left-5 top-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all duration-200 pointer-events-none"
                  >
                    비밀번호
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-[#c11119] text-white font-bold py-3.5 rounded transition duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    '로그인'
                )}
              </button>

              <div className="flex justify-between items-center text-[#b3b3b3] text-sm">
                <div className="flex items-center gap-1">
                    <div className="relative flex items-center">
                        <input type="checkbox" id="remember" className="peer w-4 h-4 bg-[#333] border-0 rounded focus:ring-0 checked:bg-[#333] appearance-none cursor-pointer" />
                         <Check className="absolute w-3 h-3 text-black pointer-events-none opacity-0 peer-checked:opacity-100 peer-checked:text-white top-0.5 left-0.5" />
                    </div>
                  <label htmlFor="remember" className="cursor-pointer hover:text-white transition">로그인 정보 저장</label>
                </div>
                <Link to="#" className="hover:underline hover:text-white transition">도움이 필요하신가요?</Link>
              </div>
            </form>

            <div className="mt-16 space-y-4">
              <div className="text-[#737373] text-base">
                MUFLIX 회원이 아니신가요? <Link to="#" className="text-white hover:underline font-medium">지금 가입하세요.</Link>
              </div>
              <div className="text-[#8c8c8c] text-xs leading-tight">
                이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을 확인합니다. <Link to="#" className="text-[#0071eb] hover:underline">자세히 알아보기.</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
