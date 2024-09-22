import useAppStore from "@/store/AppStore";

interface BlogPageProps {
  post: {
    title: string;
    date: string;
    content: string;
  };
  handleBack: () => void;
}

export default function BlogPage({ post, handleBack }: BlogPageProps) {

  const { darkModeEnabled } = useAppStore();

  const darkModeClass = darkModeEnabled ? "dark-mode" : "light-mode";

  return (
    <div className={`${darkModeClass} p-4 mb-20 mx-auto max-w-4xl`}> {/* max-w ensures a reasonable width but allows expansion */}
      <button
        onClick={handleBack}
        className="flex mb-2 text-blue-400 hover:underline"
      >
        ← Blog Posts
      </button>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <div
        className={`prose ${darkModeEnabled? 'prose-invert':''} text-left p-2 mx-auto max-w-4xl leading-relaxed`} // Apply Tailwind's prose class for better text formatting
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
