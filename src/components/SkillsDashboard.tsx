import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Rocket, TrendingUp, Code, Database, Brain } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'backend' | 'database' | 'ai' | 'tools';
  color: string;
}

const SkillsDashboard = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [skills] = useState<Skill[]>([
    { name: 'Python', level: 98, category: 'backend', color: 'vs-blue' },
    { name: 'SQL Server', level: 75, category: 'database', color: 'vs-red' },
    { name: 'MariaDB', level: 75, category: 'database', color: 'vs-orange' },
    { name: 'Docker', level: 70, category: 'tools', color: 'vs-cyan' },
    { name: 'Django', level: 70, category: 'backend', color: 'vs-green' },
    { name: 'FastAPI', level: 60, category: 'backend', color: 'vs-yellow' },
    { name: 'Power BI', level: 55, category: 'tools', color: 'vs-purple' }
  ]);

  const categoryIcons = {
    backend: Code,
    database: Database,
    ai: Brain,
    tools: TrendingUp
  };

  const categoryColors = {
    backend: 'text-vs-green',
    database: 'text-vs-red',
    ai: 'text-vs-purple',
    tools: 'text-vs-cyan'
  };

  // Animate progress when component comes into view
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 2;
          });
        }, 30);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section ref={ref} className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 syntax-highlight">
            <span className="syntax-blue">const</span>{' '}
            <span className="syntax-yellow">dashboard</span>{' '}
            <span className="syntax-purple">=</span>{' '}
            <span className="syntax-green">"Skills Analytics"</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dashboard interativo de competências técnicas e evolução profissional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Skills Grid */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              const colorClass = categoryColors[category as keyof typeof categoryColors];
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
                >
                  <Card className="p-6 card-shadow">
                    <div className="flex items-center mb-4">
                      <Icon className={`h-5 w-5 mr-2 ${colorClass}`} />
                      <h3 className="text-lg font-semibold capitalize">{category}</h3>
                      <Badge variant="outline" className="ml-auto">
                        {categorySkills.length} skills
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {categorySkills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: (categoryIndex * 0.2) + (index * 0.1), duration: 0.6 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <span className={`text-sm font-bold text-${skill.color}`}>
                              {skill.level}%
                            </span>
                          </div>
                          <Progress 
                            value={inView ? skill.level : 0}
                            className="h-2"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Professional Development Chart */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Card className="p-6 card-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Crescimento Profissional</h3>
                  <p className="text-sm text-muted-foreground">
                    Evolução contínua na carreira de tecnologia
                  </p>
                </div>

                {/* Rocket Progress Animation */}
                <div className="relative h-64 bg-gradient-to-t from-muted/20 to-transparent rounded-lg overflow-hidden">
                  {/* Progress Track */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-muted">
                    <motion.div
                      className="w-full bg-gradient-to-t from-vs-blue to-vs-purple"
                      initial={{ height: '0%' }}
                      animate={inView ? { height: `${animatedProgress}%` } : {}}
                      transition={{ duration: 3, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Percentage Markers */}
                  {[0, 25, 50, 75, 100].map((percent) => (
                    <motion.div
                      key={percent}
                      className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
                      style={{ bottom: `${percent}%` }}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 + (percent / 100), duration: 0.5 }}
                    >
                      <div className="w-8 h-0.5 bg-muted-foreground"></div>
                      <span className="ml-2 text-xs text-muted-foreground font-mono">
                        {percent}%
                      </span>
                    </motion.div>
                  ))}

                  {/* Animated Rocket */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ bottom: '0%' }}
                    animate={inView ? {
                      y: `-${animatedProgress * 2.4}px`,
                      x: [0, 10, -10, 5, -5, 0],
                      rotate: [0, 5, -5, 3, -3, 0]
                    } : {}}
                    transition={{
                      y: { duration: 3, ease: 'easeOut' },
                      x: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                      rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  >
                    <Rocket className="h-8 w-8 text-vs-orange transform -rotate-45" />
                    {/* Rocket trail */}
                    <motion.div
                      className="absolute top-2 left-2 w-2 h-8 bg-gradient-to-t from-vs-orange/60 to-transparent rounded-full"
                      animate={inView ? {
                        opacity: [0.6, 1, 0.6],
                        scaleY: [1, 1.5, 1]
                      } : {}}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.div>

                  {/* Achievement Badges */}
                  <div className="absolute top-4 right-4 space-y-2">
                    {animatedProgress > 25 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <Badge className="bg-vs-green/20 text-vs-green border-vs-green/30">
                          Infrastructure Expert
                        </Badge>
                      </motion.div>
                    )}
                    {animatedProgress > 50 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 2 }}
                      >
                        <Badge className="bg-vs-blue/20 text-vs-blue border-vs-blue/30">
                          Python Developer
                        </Badge>
                      </motion.div>
                    )}
                    {animatedProgress > 75 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 2.5 }}
                      >
                        <Badge className="bg-vs-purple/20 text-vs-purple border-vs-purple/30">
                          Data Analyst
                        </Badge>
                      </motion.div>
                    )}
                    {animatedProgress > 90 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 3 }}
                      >
                        <Badge className="bg-vs-orange/20 text-vs-orange border-vs-orange/30">
                          AI Specialist
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-vs-blue"
                      animate={inView ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ delay: 3, duration: 0.6 }}
                    >
                      {Math.round(animatedProgress)}%
                    </motion.div>
                    <p className="text-sm text-muted-foreground">
                      Evolução para Data Science & IA
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsDashboard;