
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code2, Star, GitFork } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  stars?: number;
  forks?: number;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Meu Currículo Interativo',
      description: 'Currículo interativo desenvolvido com HTML, CSS e JavaScript, com design responsivo e animações.',
      githubUrl: 'https://github.com/fabioffigueiredo/-meu-curriculo-interativo',
      liveUrl: 'https://fabioffigueiredo.github.io/-meu-curriculo-interativo/',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      stars: 5,
      forks: 2
    },
    {
      id: '2',
      name: 'Análise de Dados Python',
      description: 'Projeto de análise de dados utilizando Python, Pandas e visualizações com Matplotlib.',
      githubUrl: 'https://github.com/fabioffigueiredo/analise-dados-python',
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
      stars: 12,
      forks: 4
    },
    {
      id: '3',
      name: 'Dashboard Power BI',
      description: 'Dashboard interativo desenvolvido no Power BI para análise de vendas e métricas de negócio.',
      githubUrl: 'https://github.com/fabioffigueiredo/dashboard-powerbi',
      technologies: ['Power BI', 'SQL', 'DAX'],
      stars: 8,
      forks: 3
    },
    {
      id: '4',
      name: 'Analisador de Logs Windows Server',
      description: 'Projeto voltada a analise de logs de sistema do Windows server, com implementação de monitoramento em tempo real. Estudo de Docker e Django',
      githubUrl: 'https://github.com/fabioffigueiredo/Analisador-de-Logs-Windows-Server',
      technologies: ['Docker', 'Django', 'Python'],
      stars: 1,
      forks: 0
    }
  ]);

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              variants={itemVariants}
              className="syntax-highlight"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="syntax-blue">const</span>{' '}
                <span className="syntax-yellow">projetos</span>{' '}
                <span className="syntax-purple">=</span>{' '}
                <span className="syntax-green">[</span>
              </h2>
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Explore alguns dos meus projetos desenvolvidos com diversas tecnologias,
              desde análise de dados até desenvolvimento web.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-card/50 border-border hover:border-vs-blue/50 transition-all duration-300 card-shadow hover:glow-effect">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Code2 className="h-6 w-6 text-vs-blue" />
                        <CardTitle className="syntax-highlight text-lg group-hover:text-vs-blue transition-colors">
                          <span className="syntax-yellow">{project.name}</span>
                        </CardTitle>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {project.stars && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                        {project.forks && (
                          <div className="flex items-center space-x-1">
                            <GitFork className="h-4 w-4" />
                            <span>{project.forks}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CardDescription className="text-foreground/80 line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-vs-blue/10 text-vs-blue border border-vs-blue/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-3 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="syntax-highlight hover:bg-vs-blue/10 hover:border-vs-blue/50"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2"
                        >
                          <Github className="h-4 w-4" />
                          <span className="syntax-purple">GitHub</span>
                        </a>
                      </Button>

                      {project.liveUrl && (
                        <Button
                          size="sm"
                          asChild
                          className="syntax-highlight bg-vs-green/20 hover:bg-vs-green/30 text-vs-green border border-vs-green/30"
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Demo</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* GitHub Profile Link */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-12"
          >
            <Button
              size="lg"
              asChild
              className="syntax-highlight bg-vs-purple/20 hover:bg-vs-purple/30 text-vs-purple border border-vs-purple/30"
            >
              <a
                href="https://github.com/fabioffigueiredo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <Github className="h-5 w-5" />
                <span>Ver todos os projetos no GitHub</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          {/* Closing Bracket */}
          <motion.div
            variants={itemVariants}
            className="text-center syntax-highlight"
          >
            <span className="text-4xl syntax-green">];</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsSection;
