import React from "react";

interface BlogLayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function BlogLayout({ header, sidebar, children }: BlogLayoutProps) {
  return (
    <div className="w-full bg-black text-white font-sans">
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8">
        {header}
        <div className="flex flex-col lg:grid lg:grid-cols-[250px_1fr] gap-8 mt-8">
          {sidebar}
          <main className="flex-1 w-full min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
