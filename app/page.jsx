"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const animTimer = setTimeout(() => setProgress(100), 100);
    
    const redirectTimer = setTimeout(() => {
      router.push("/manage-leads");
    }, 2000);
    
    return () => {
      clearTimeout(animTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center justify-center relative">
        {/* Logo and Text */}
        <div className="flex flex-col items-center gap-6 mb-8 relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" className="w-16 h-16 md:w-20 md:h-20 shadow-lg rounded-[25%]">
            <rect width="512" height="512" rx="128" fill="#25B990"/>
            <circle cx="256" cy="180" r="48" fill="white"/>
            <circle cx="160" cy="340" r="48" fill="white"/>
            <circle cx="352" cy="340" r="48" fill="white"/>
            <path d="M228 214 L188 296" stroke="white" strokeWidth="32" strokeLinecap="round"/>
            <path d="M284 214 L324 296" stroke="white" strokeWidth="32" strokeLinecap="round"/>
            <path d="M200 340 L312 340" stroke="white" strokeWidth="32" strokeLinecap="round"/>
          </svg>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#25B990] tracking-tight text-center">
            Assignment
          </h1>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-56 h-1 bg-gray-100 rounded-full overflow-hidden relative z-10">
          {/* Animated Progress Bar */}
          <div 
            className="h-full bg-[#25B990] rounded-full transition-all ease-in-out" 
            style={{ width: `${progress}%`, transitionDuration: '1800ms' }}
          ></div>
        </div>
        
      </div>
    </div>
  );
}