
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsDashboard from './SkillsDashboard';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import AITools from './AITools';
import AdminPanel from './AdminPanel';

const PortfolioMain = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'admin') {
      setIsAdminMode(true);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setActiveSection(sectionId);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'dashboard', 'ai-tools'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation 
        activeSection={activeSection}
        onSectionChange={scrollToSection}
        isAdmin={isAdminMode}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Skills Dashboard */}
        <section id="skills">
          <SkillsDashboard />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <ExperienceSection />
        </section>

        {/* Education Section */}
        <section id="education">
          <EducationSection />
        </section>

        {/* Analytics Dashboard */}
        <section id="dashboard">
          <SkillsDashboard />
        </section>

        {/* AI Tools */}
        <section id="ai-tools">
          <AITools />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="syntax-highlight"
            >
              <p className="text-lg">
                <span className="syntax-gray">// Obrigado por visitar meu portfólio!</span>
              </p>
              <p className="text-lg">
                <span className="syntax-blue">console</span>
                <span className="syntax-purple">.</span>
                <span className="syntax-yellow">log</span>
                <span className="syntax-purple">(</span>
                <span className="syntax-green">"Vamos construir o futuro com tecnologia!"</span>
                <span className="syntax-purple">);</span>
              </p>
            </motion.div>
            
            <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
              <span>© 2025 Fabio Figueiredo</span>
              <span>•</span>
              <span>Programador Python e IA Especialista</span>
              <span>•</span>
              <span>Rio de Janeiro, RJ</span>
              <span>•</span>
              <button 
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="text-muted-foreground hover:text-primary transition-colors text-xs opacity-30 hover:opacity-100"
                title="Admin"
              >
                •••
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={isAdminMode}
        onClose={() => setIsAdminMode(false)}
      />

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 bg-vs-blue rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollToSection('hero')}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↑
        </motion.div>
      </motion.button>
    </div>
  );
};

export default PortfolioMain;
