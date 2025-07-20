import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, TrendingUp } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const ExperienceSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const experiences: Experience[] = [
    {
      id: '1',
      title: 'Programador Python Júnior',
      company: 'Atual Posição',
      location: 'Rio de Janeiro, RJ',
      period: '2024 - Presente',
      description: 'Desenvolvimento de soluções em Python com foco em extração e análise de dados de diversas fontes.',
      achievements: [
        'Implementação de sistemas de extração de dados via APIs',
        'Desenvolvimento de automações com pandas e numpy',
        'Integração com planilhas Excel e Google Sheets',
        'Web scraping para coleta de dados estruturados'
      ],
      technologies: ['Python', 'Pandas', 'NumPy', 'APIs', 'Excel', 'Google Sheets']
    },
    {
      id: '2',
      title: 'Especialista em Infraestrutura de TI',
      company: 'Experiência Consolidada',
      location: 'Rio de Janeiro, RJ',
      period: '2015 - 2024',
      description: 'Gestão e otimização de infraestrutura tecnológica, com experiência em suporte a mais de 50 pessoas.',
      achievements: [
        'Gerenciamento de infraestrutura complexa de TI',
        'Suporte técnico especializado para equipes internas',
        'Implementação de soluções de alta disponibilidade',
        'Atendimento a clientes internos e externos',
        'Liderança em projetos de modernização tecnológica'
      ],
      technologies: ['Infraestrutura', 'Servidores', 'Redes', 'Suporte Técnico', 'Gestão de Projetos']
    }
  ];

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 syntax-highlight">
            <span className="syntax-blue">function</span>{' '}
            <span className="syntax-yellow">getExperience</span>
            <span className="syntax-purple">()</span>{' '}
            <span className="syntax-purple">{'{'}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trajetória profissional de <span className="text-vs-orange font-semibold">9 anos em TI</span> com 
            transição estratégica para <span className="text-vs-blue font-semibold">desenvolvimento Python</span> e 
            <span className="text-vs-purple font-semibold"> ciência de dados</span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-vs-blue via-vs-purple to-vs-green"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-vs-blue rounded-full border-4 border-background shadow-lg z-10"></div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <Card className="p-6 card-shadow hover:shadow-lg transition-shadow duration-300">
                    
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-vs-blue">{exp.title}</h3>
                        <Badge variant="outline" className="ml-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.period}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="font-semibold text-vs-green">{exp.company}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 flex items-center text-vs-purple">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Principais Realizações
                      </h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm flex items-start">
                            <span className="text-vs-green mr-2">▸</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-2 text-vs-orange">Tecnologias</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center card-shadow">
            <div className="text-3xl font-bold text-vs-blue mb-2">9+</div>
            <p className="text-muted-foreground">Anos de Experiência</p>
          </Card>
          
          <Card className="p-6 text-center card-shadow">
            <div className="text-3xl font-bold text-vs-green mb-2">50+</div>
            <p className="text-muted-foreground">Pessoas Apoiadas</p>
          </Card>
          
          <Card className="p-6 text-center card-shadow">
            <div className="text-3xl font-bold text-vs-purple mb-2">100%</div>
            <p className="text-muted-foreground">Foco em Evolução</p>
          </Card>
        </motion.div>

        {/* Closing Brace */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-8"
        >
          <span className="text-2xl syntax-highlight syntax-purple">{'}'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;