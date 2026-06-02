import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface PostBodyProps {
  content: string;
}

export const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <article className="prose prose-invert prose-zinc max-w-none lg:prose-lg prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-500 hover:prose-a:text-teal-400 prose-code:text-teal-400 prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-xl prose-img:rounded-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h2: ({ node, ...props }) => {
            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return <h2 id={id} {...props} />;
          },
          pre: ({ node, ...props }) => (
            <div className="relative group">
              <pre {...props} className="!mt-0 !mb-0" />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
