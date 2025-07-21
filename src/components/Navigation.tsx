
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Code2, User, Briefcase, BookOpen, Award, BarChart3, Settings, FolderOpen } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
}

const Navigation = ({ activeSection, onSectionChange, isAdmin, onToggleAdmin }: NavigationProps) => {
  const menuItems = [
    { id: 'hero', label: 'main()', icon: Code2 },
    { id: 'about', label: 'about()', icon: User },
    { id: 'skills', label: 'skills()', icon: BookOpen },
    { id: 'projects', label: 'projects()', icon: FolderOpen },
    { id: 'experience', label: 'experience()', icon: Briefcase },
    { id: 'education', label: 'education()', icon: Award },
    { id: 'dashboard', label: 'analytics()', icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-vs-blue" />
            <span className="syntax-highlight font-semibold">
              <span className="syntax-blue">const</span>{' '}
              <span className="syntax-yellow">portfolio</span>{' '}
              <span className="syntax-purple">=</span>{' '}
              <span className="syntax-green">"Fabio Figueiredo"</span>
            </span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                  className={`syntax-highlight ${
                    activeSection === item.id 
                      ? 'bg-vs-blue/20 text-vs-blue border border-vs-blue/30' 
                      : 'hover:bg-secondary/80'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="syntax-purple">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Admin Toggle - Removed */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-border bg-card/90">
        <div className="px-4 py-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={`w-full justify-start syntax-highlight ${
                  activeSection === item.id 
                    ? 'bg-vs-blue/20 text-vs-blue border border-vs-blue/30' 
                    : 'hover:bg-secondary/80'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                <span className="syntax-purple">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
