"use client";

import useAppStore from "@/store/AppStore";
import DarkModeToggle from "@/components/DarkModeToggle";
import BlogList from "@/components/BlogList";
import "./globals.css";

export default function Home() {
  // State to track which section is currently selected
  const { activeSection, setActiveSection } = useAppStore();
  const { darkModeEnabled } = useAppStore();

  // Define the content for each section
  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <p>Welcome to my personal website</p>;
      case "work":
        return <p>Work experience and history will be shown here.</p>;
      case "projects":
        return <p>Here are some of my projects.</p>;
      case "blog":
        return <BlogList />;
      case "contact":
        return <p>Feel free to contact me at: tanay@enkryptai.com</p>;
      default:
        return <p>Welcome to personal website</p>;
    }
  };

  const darkModeClass = darkModeEnabled ? "dark-mode" : "light-mode";

  return (
    <div className={`${darkModeClass} flex justify-center min-h-screen`}>
      <div className="container mx-auto px-4 max-w-6xl text-center mt-20">
        {/* Header */}
        <h1 className="text-4xl font-bold my-8">Tanay Baswa</h1>

        {/* Dark Mode Toggle */}
        <div className="absolute top-20 right-28">
          <DarkModeToggle />
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-center space-x-6 mb-2">
          {["home", "work", "projects", "blog", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 font-medium text-lg ${
                activeSection === section ? "underline text-blue-400" : ""
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
