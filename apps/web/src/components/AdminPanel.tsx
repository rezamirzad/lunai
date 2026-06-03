// packages/shared/components/AdminPanel.tsx
"use client";
import React, { useState } from "react";
import { addUser } from "@/app/actions"; // Import the Server Action

interface AdminPanelProps {
  onAddPost: (postData: any) => void;
  isAuthorized: boolean;
}

export const AdminPanel = ({ onAddPost, isAuthorized }: AdminPanelProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "client">("client");
  const [userMessage, setUserMessage] = useState("");

  if (!isAuthorized)
    return <div className="p-4 text-red-500">Access Denied</div>;

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPost({ title, content, date: new Date().toISOString().split("T")[0] });
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserMessage("Adding user...");
    const result = await addUser({ email: userEmail, password: userPassword, role: userRole });
    if (result.success) {
      setUserMessage(`Success: ${result.message}`);
      setUserEmail("");
      setUserPassword("");
      setUserRole("client");
    } else {
      setUserMessage(`Error: ${result.message}`);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg border border-white/10 flex flex-col gap-8">
      {/* Post Management Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">LunAI Admin: Post Orchestrator</h2>
        <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="p-2 bg-black border border-white/20 rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Markdown Content"
            className="p-2 bg-black border border-white/20 h-40 rounded"
          />
          <button type="submit" className="bg-teal-600 py-2 rounded hover:bg-teal-700 transition-colors">
            Deploy Post
          </button>
        </form>
      </div>

      {/* User Management Section */}
      <div className="flex flex-col gap-4 border-t border-white/10 pt-8 mt-8">
        <h2 className="text-2xl font-bold">User Management</h2>
        <form onSubmit={handleAddUser} className="flex flex-col gap-4">
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="User Email"
            className="p-2 bg-black border border-white/20 rounded"
            required
          />
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="User Password"
            className="p-2 bg-black border border-white/20 rounded"
            required
          />
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as "admin" | "client")}
            className="p-2 bg-black border border-white/20 rounded text-white"
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-blue-600 py-2 rounded hover:bg-blue-700 transition-colors">
            Add User
          </button>
          {userMessage && <p className="text-sm text-center mt-2">{userMessage}</p>}
        </form>
      </div>
    </div>
  );
};
