import { useEffect, useState } from 'react';
import BlogPage from '@/components/BlogPage';

// Interface for blog post metadata
interface BlogPost {
  title: string;
  date: string;
  post: string;
  content: string; // Add the content property
}

// Function to sort blog posts by date and title (in case of ties)
const sortPosts = (posts: BlogPost[]): BlogPost[] => {
  return posts.sort((a: BlogPost, b: BlogPost) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // First compare by date (most recent first)
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;

    // If dates are equal, compare by title alphabetically
    return a.title.localeCompare(b.title);
  });
};

// BlogList component
export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null); // State for the selected post

  useEffect(() => {
    // Fetch the blog posts from the API
    fetch('/api/blog')
      .then((response) => response.json())
      .then((data) => {
        // Sort the fetched posts
        const sortedPosts = sortPosts(data);
        setBlogPosts(sortedPosts);
      })
      .catch((error) => console.error('Error fetching blog posts:', error));
  }, []);

  // Handle going back to the blog list
  const handleBack = () => {
    setSelectedPost(null); // Reset the selected post
  };

  // Fetch content for a specific post by slug
  const fetchBlogContent = async (post: string) => {
    const response = await fetch(`/api/blog/${post}`);
    const data = await response.json();
    setSelectedPost(data); // Set the selected post content
  };

  // Handle clicking a blog post
  const handlePostClick = (post: BlogPost) => {
    fetchBlogContent(post.post); // Fetch the content of the selected post
  };

  // Show the blog list if no post is selected
  if (!selectedPost) {
    return (
      <div className="p-4 m-4 mx-auto w-[30vw]">
        <h2 className="text-2xl font-bold mb-6 mt-6">
          Blog Posts
        </h2>
        <ul className="text-left">
          {blogPosts.map((post) => (
            <li key={post.post} className="mb-4">
              <button
                onClick={() => handlePostClick(post)}
                className="text-blue-400 hover:underline"
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-gray-500">{post.date}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Show the BlogPage when a post is selected
  return <BlogPage post={selectedPost} handleBack={handleBack} />;
}
