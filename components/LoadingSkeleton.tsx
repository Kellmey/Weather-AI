import React from 'react';

const Pulse: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-white/50 dark:bg-white/5 animate-pulse rounded-xl ${className}`} />
);

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 dark:border-white/10">
        <div className="flex justify-between items-center mb-6">
          <Pulse className="h-8 w-48" />
          <Pulse className="h-8 w-32" />
        </div>
        <div className="flex items-center gap-8">
          <Pulse className="w-32 h-32 rounded-full" />
          <div className="flex-grow space-y-3">
            <Pulse className="h-14 w-40" />
            <Pulse className="h-5 w-56" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Pulse className="h-20 w-24" />
            <Pulse className="h-20 w-24" />
          </div>
        </div>
      </div>
      <Pulse className="h-40 w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Pulse className="h-72 w-full" />
        <Pulse className="h-72 w-full" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
