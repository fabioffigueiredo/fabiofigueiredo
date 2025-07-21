import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, Star, Brain, Award } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
  highlights: string[];
  logo?: string;
}

const EducationSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const education: Education[] = [
    {
      id: '1',
      degree: 'Pós-Graduação em Inteligência Artificial, Machine Learning e Deep Learning',
      institution: 'Infnet',
      period: '2025 - 2026',
      status: 'in-progress',
      description: 'Programa avançado focado em técnicas modernas de IA, aprendizado de máquina e deep learning.',
      highlights: [
        'Algoritmos de Machine Learning',
        'Redes Neurais e Deep Learning',
        'Processamento de Linguagem Natural',
        'Computer Vision',
        'Projetos Práticos com TensorFlow e PyTorch'
      ]
    },
    {
      id: '2',
      degree: 'Bootcamp Python Santander',
      institution: 'DIO (Digital Innovation One)',
      period: '2025 - 2025',
      status: 'completed',
      description: 'Bootcamp intensivo focado em desenvolvimento Python e tecnologias modernas.',
      highlights: [
        'Linguagem Python',
        'Programação Orientada a Objetos',
        'Modularização',
        'Banco de Dados',
        'Docker',
        'FastAPI'
      ]
    },
    {
      id: '3',
      degree: 'Especialização em Análise de Dados',
      institution: 'Cursos Complementares',
      period: '2023 - 2024',
      status: 'completed',
      description: 'Formação complementar em análise de dados, estatística e visualização.',
      highlights: [
        'Python para Data Science',
        'Estatística Aplicada',
        'Pandas e NumPy',
        'Power BI e Visualização',
        'SQL Avançado'
      ]
    },
    {
      id: '4',
      degree: 'Bacharelado em Sistemas de Informação',
      institution: 'Universidade Estácio',
      period: '2015 - 2020',
      status: 'completed',
      description: 'Formação sólida em sistemas, desenvolvimento e gestão de tecnologia.',
      highlights: [
        'Desenvolvimento de Sistemas',
        'Banco de Dados',
        'Redes e Infraestrutura',
        'Engenharia de Software',
        'Gestão de Projetos de TI'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-vs-green';
      case 'in-progress': return 'text-vs-blue';
      case 'planned': return 'text-vs-orange';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return Award;
      case 'in-progress': return Brain;
      case 'planned': return Star;
      default: return GraduationCap;
    }
  };

  return (
    <section ref={ref} className="py-20 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 syntax-highlight">
            <span className="syntax-blue">const</span>{' '}
            <span className="syntax-yellow">education</span>{' '}
            <span className="syntax-purple">=</span>{' '}
            <span className="syntax-green">"Continuous Learning"</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jornada educacional com foco em <span className="text-vs-purple font-semibold">tecnologias emergentes</span> e 
            <span className="text-vs-blue font-semibold"> aprendizado contínuo</span>
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => {
            const StatusIcon = getStatusIcon(edu.status);
            
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <Card className="h-full p-6 card-shadow hover:shadow-lg transition-all duration-300 hover:scale-105">
                  
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(edu.status)}`} />
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(edu.status)} border-current`}
                        >
                          {edu.status === 'completed' ? 'Concluído' : 
                           edu.status === 'in-progress' ? 'Em Andamento' : 'Planejado'}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-vs-blue mb-2 leading-tight">
                      {edu.degree}
                    </h3>
                    
                    <div className="space-y-1">
                      <p className="font-semibold text-vs-green">{edu.institution}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.period}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {edu.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex-1">
                    <h4 className="font-semibold mb-3 flex items-center text-vs-purple">
                      <Star className="h-4 w-4 mr-1" />
                      Principais Tópicos
                    </h4>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: (index * 0.2) + (i * 0.1), duration: 0.5 }}
                          className="text-sm flex items-start"
                        >
                          <span className="text-vs-green mr-2 mt-0.5">▸</span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Progress Indicator for In-Progress */}
                  {edu.status === 'in-progress' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                      className="mt-4 p-3 bg-vs-blue/10 rounded-lg border border-vs-blue/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-vs-blue">Progresso Atual</span>
                        <span className="text-xs text-vs-blue">10%</span>
                      </div>
                      <div className="w-full bg-vs-blue/20 rounded-full h-1.5">
                        <motion.div
                          className="bg-vs-blue h-1.5 rounded-full"
                          initial={{ width: '0%' }}
                          animate={inView ? { width: '10%' } : {}}
                          transition={{ delay: index * 0.2 + 1, duration: 1.5 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 text-center card-shadow bg-gradient-to-r from-vs-blue/5 to-vs-purple/5">
            <Brain className="h-12 w-12 text-vs-purple mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4 text-vs-blue">
              Filosofia de Aprendizado Contínuo
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Acredito que a tecnologia evolui constantemente, e o profissional de sucesso é aquele que 
              nunca para de aprender. Minha jornada educacional reflete esse compromisso com a 
              <span className="text-vs-green font-semibold"> evolução contínua</span> e a 
              <span className="text-vs-blue font-semibold"> adaptação às novas tecnologias</span>.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4">
                <div className="text-2xl font-bold text-vs-green">9+</div>
                <div className="text-sm text-muted-foreground">Anos de Experiência</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-vs-blue">Infnet</div>
                <div className="text-sm text-muted-foreground">Pós-Graduação em IA</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-vs-purple">∞</div>
                <div className="text-sm text-muted-foreground">Aprendizado Contínuo</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;