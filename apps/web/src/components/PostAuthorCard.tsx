import React from 'react';

interface PostAuthorCardProps {
  author: {
    name: string;
    avatarUrl?: string;
  };
}

export const PostAuthorCard: React.FC<PostAuthorCardProps> = ({ author }) => {
  return (
    <div className="mt-16 p-8 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col md:flex-row gap-6 items-center">
      <div className="w-20 h-20 rounded-full bg-zinc-800 border border-white/10 overflow-hidden shrink-0">
        {author.avatarUrl ? (
          <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-500 to-blue-600" />
        )}
      </div>
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h4 className="text-xl font-bold text-white tracking-tight">{author.name}</h4>
        <p className="text-zinc-400 leading-relaxed max-w-xl">
          Founder and Lead Architect at Lunaris. Specializing in autonomous agentic frameworks 
          and high-fidelity digital experiences.
        </p>
      </div>
    </div>
  );
};
