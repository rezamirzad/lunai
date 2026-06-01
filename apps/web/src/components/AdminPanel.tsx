// packages/shared/components/AdminPanel.tsx
"use client";
import React, { useState } from "react";

interface AdminPanelProps {
  onAddPost: (postData: any) => void;
  isAuthorized: boolean;
}

export const AdminPanel = ({ onAddPost, isAuthorized }: AdminPanelProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isAuthorized)
    return <div className="p-4 text-red-500">Access Denied</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPost({ title, content, date: new Date().toISOString().split("T")[0] });
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-4">
        LunAI Admin: Post Orchestrator
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="p-2 bg-black border border-white/20"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Markdown Content"
          className="p-2 bg-black border border-white/20 h-40"
        />
        <button type="submit" className="bg-blue-600 py-2 rounded">
          Deploy Post
        </button>
      </form>
    </div>
  );
};
