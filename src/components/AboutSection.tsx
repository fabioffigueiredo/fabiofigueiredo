import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  Target, 
  Lightbulb, 
  Heart, 
  Zap,
  Brain,
  Code,
  Database,
  Bot
} from 'lucide-react';

const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const softSkills = [
    {
      icon: MessageCircle,
      title: 'Comunicação Efetiva',
      description: 'Facilidade em me comunicar de forma clara e objetiva',
      color: 'text-vs-blue'
    },
    {
      icon: Users,
      title: 'Trabalho em Equipe',
      description: 'Experiência colaborativa em ambientes multidisciplinares',
      color: 'text-vs-green'
    },
    {
      icon: Target,
      title: 'Foco em Resultados',
      description: 'Orientação para entrega de soluções que agregam valor',
      color: 'text-vs-purple'
    },
    {
      icon: Lightbulb,
      title: 'Solução de Problemas',
      description: 'Capacidade analítica para resolver desafios complexos',
      color: 'text-vs-orange'
    }
  ];

  const techFocus = [
    {
      icon: Code,
      title: 'Desenvolvimento Python',
      description: 'Foco em automações e análise de dados',
      technologies: ['Python', 'Django', 'FastAPI', 'Pandas']
    },
    {
      icon: Database,
      title: 'Análise de Dados',
      description: 'Extração de insights valiosos dos dados',
      technologies: ['SQL Server', 'MariaDB', 'Power BI', 'Excel']
    },
    {
      icon: Brain,
      title: 'Inteligência Artificial',
      description: 'Estudos em ML e Deep Learning',
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI']
    },
    {
      icon: Bot,
      title: 'Machine Learning',
      description: 'Algoritmos preditivos e classificação',
      technologies: ['Regression', 'Classification', 'NLP', 'Computer Vision']
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
            <span className="syntax-blue">class</span>{' '}
            <span className="syntax-yellow">AboutMe</span>{' '}
            <span className="syntax-purple">{'{'}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça mais sobre minha jornada, habilidades e paixão por tecnologia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="p-6 card-shadow">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-vs-red mr-2" />
                <h3 className="text-xl font-bold text-vs-blue">Minha História</h3>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="text-justify">
                  Com mais de <span className="text-vs-orange font-semibold">11 anos de jornada em Tecnologia da Informação</span>, 
                  minha paixão é construir pontes entre a infraestrutura de TI, o universo dos dados e o poder da 
                  <span className="text-vs-green font-semibold"> Inteligência Artificial</span>. Eu transformo dados brutos em insights 
                  estratégicos que aceleram a inovação e geram resultados tangíveis para o negócio.
                </p>
                
                <p className="text-justify">
                  Minha carreira foi consolidada sobre uma base sólida em infraestrutura, com vasta experiência na administração de 
                  ecossistemas <span className="text-vs-blue font-semibold">Microsoft on-premise</span> (Active Directory, Servidores de Arquivos) em lidar com usuários internos e 
                  externos. Essa vivência profunda em sistemas corporativos me proporciona hoje uma visão privilegiada sobre 
                  segurança, governança e os desafios reais para implementar soluções de <span className="text-vs-purple font-semibold">Engenharia de Dados e IA</span> de forma robusta 
                  e escalável.
                </p>
                
                <p className="text-justify">
                  Atualmente, como <span className="text-vs-blue font-semibold">Consultor em IA Generativa</span>, 
                  meu foco é aplicar as ferramentas mais avançadas do mercado para 
                  otimizar processos e criar soluções inteligentes. Estou aprofundando meus conhecimentos na <span className="text-vs-orange font-semibold">Pós-Graduação MIT em 
                  Inteligência Artificial, Machine Learning e Deep Learning</span>, aplicando técnicas avançadas de NLP e automação em 
                  projetos práticos.
                </p>
              </div>
            </Card>

            {/* Support Experience */}
            <Card className="p-6 card-shadow">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 text-vs-green mr-2" />
                <h3 className="text-xl font-bold text-vs-green">Experiência em Suporte</h3>
              </div>
              
              <div className="space-y-3">
                <p className="text-muted-foreground text-justify">
                  Tenho ampla experiência em <span className="text-vs-blue font-semibold">comunicação</span> e 
                  <span className="text-vs-purple font-semibold"> trabalho em equipe</span>, tendo trabalhado 
                  apoiando mais de <span className="text-vs-orange font-semibold">100 pessoas</span> em 
                  diferentes projetos e necessidades técnicas.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-vs-blue/10 rounded-lg">
                    <div className="text-2xl font-bold text-vs-blue">100+</div>
                    <div className="text-xs text-muted-foreground">Pessoas Apoiadas</div>
                  </div>
                  <div className="p-3 bg-vs-green/10 rounded-lg">
                    <div className="text-2xl font-bold text-vs-green">100%</div>
                    <div className="text-xs text-muted-foreground">Satisfação</div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm text-justify">
                  Experiência em lidar com <span className="text-vs-cyan font-semibold">clientes internos e externos</span>, 
                  desenvolvendo soluções personalizadas e mantendo relacionamentos profissionais duradouros.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            
            {/* Soft Skills */}
            <Card className="p-6 card-shadow">
              <div className="flex items-center mb-4">
                <Zap className="h-5 w-5 text-vs-yellow mr-2" />
                <h3 className="text-xl font-bold text-vs-yellow">Soft Skills</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <Icon className={`h-5 w-5 mb-2 ${skill.color}`} />
                      <h4 className="font-semibold text-sm mb-1">{skill.title}</h4>
                      <p className="text-xs text-muted-foreground text-justify">{skill.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Technical Focus */}
            <Card className="p-6 card-shadow">
              <div className="flex items-center mb-4">
                <Brain className="h-5 w-5 text-vs-purple mr-2" />
                <h3 className="text-xl font-bold text-vs-purple">Foco Técnico</h3>
              </div>
              
              <div className="space-y-4">
                {techFocus.map((area, index) => {
                  const Icon = area.icon;
                  return (
                    <motion.div
                      key={area.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="p-4 rounded-lg bg-secondary/20"
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 text-vs-blue mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-vs-blue mb-1">{area.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2 text-justify">{area.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {area.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Goal Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
          <Card className="p-8 text-center card-shadow bg-gradient-to-r from-vs-blue/10 to-vs-purple/10">
            <Target className="h-12 w-12 text-vs-purple mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4 text-vs-blue">Objetivo Profissional</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed syntax-highlight text-justify">
              <span className="syntax-red">return</span>{' '}
              <span className="syntax-green">"Combinar minha expertise em infraestrutura com novas habilidades em Python e IA para desenvolver soluções inovadoras que transformem dados brutos em insights estratégicos e gerem valor real para organizações."</span>
              <span className="syntax-purple">;</span>
            </p>
          </Card>
        </motion.div>

        {/* Closing Brace */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-8"
        >
          <span className="text-2xl syntax-highlight syntax-purple">{'}'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;