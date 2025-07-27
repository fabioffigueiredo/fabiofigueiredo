
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Code2, User, Briefcase, BookOpen, Award, BarChart3, Settings, FolderOpen, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
}

const Navigation = ({ activeSection, onSectionChange, isAdmin, onToggleAdmin }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { id: 'hero', label: 'main()', icon: Code2 },
    { id: 'about', label: 'about()', icon: User },
    { id: 'skills', label: 'skills()', icon: BookOpen },
    { id: 'projects', label: 'projects()', icon: FolderOpen },
    { id: 'experience', label: 'experience()', icon: Briefcase },
    { id: 'education', label: 'education()', icon: Award },
    { id: 'dashboard', label: 'analytics()', icon: BarChart3 },
    { id: 'admin', label: 'admin.enter()', icon: Settings },
  ];

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setIsOpen(false); // Fecha o menu mobile após seleção
  };

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
                    item.id === 'admin'
                      ? 'text-red-500 hover:bg-red-500/10 hover:text-red-400'
                      : activeSection === item.id 
                        ? 'bg-vs-blue/20 text-vs-blue border border-vs-blue/30' 
                        : 'hover:bg-secondary/80'
                  }`}
                >
                  <Icon className={`h-4 w-4 mr-2 ${item.id === 'admin' ? 'text-red-500' : ''}`} />
                  <span className={item.id === 'admin' ? 'text-red-500' : 'syntax-purple'}>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 sm:w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex items-center space-x-2 px-2 mb-4">
                    <Code2 className="h-5 w-5 text-vs-blue" />
                    <span className="syntax-highlight font-semibold text-sm">
                      <span className="syntax-blue">const</span>{' '}
                      <span className="syntax-yellow">menu</span>
                    </span>
                  </div>
                  
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeSection === item.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleSectionChange(item.id)}
                        className={`w-full justify-start syntax-highlight ${
                          item.id === 'admin'
                            ? 'text-red-500 hover:bg-red-500/10 hover:text-red-400'
                            : activeSection === item.id 
                              ? 'bg-vs-blue/20 text-vs-blue border border-vs-blue/30' 
                              : 'hover:bg-secondary/80'
                        }`}
                      >
                        <Icon className={`h-4 w-4 mr-3 ${item.id === 'admin' ? 'text-red-500' : ''}`} />
                        <span className={item.id === 'admin' ? 'text-red-500' : 'syntax-purple'}>{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
