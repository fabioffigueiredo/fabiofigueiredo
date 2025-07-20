import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/fabioffigueiredo',
      color: 'text-vs-blue'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/fabio-figueiredo-295a8191',
      color: 'text-vs-cyan'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:fabioinformacao@gmail.com',
      color: 'text-vs-green'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/5521964641561',
      color: 'text-vs-yellow'
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{ boxShadow: ["0 0 20px hsl(var(--vs-blue) / 0.3)", "0 0 40px hsl(var(--vs-blue) / 0.6)", "0 0 20px hsl(var(--vs-blue) / 0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-40 h-40 mx-auto lg:mx-0 rounded-full bg-gradient-to-r from-vs-blue to-vs-purple p-1"
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-6xl font-bold text-vs-blue">
                  FF
                </div>
              </motion.div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold syntax-highlight"
              >
                <span className="syntax-blue">class</span>{' '}
                <span className="syntax-yellow">FabioFigueiredo</span>{' '}
                <span className="syntax-purple">{'{'}</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-2 syntax-highlight ml-4"
              >
                <p className="text-lg">
                  <span className="syntax-cyan">constructor</span>
                  <span className="syntax-purple">()</span>{' '}
                  <span className="syntax-purple">{'{'}</span>
                </p>
                <p className="text-lg ml-4">
                  <span className="syntax-red">this</span>
                  <span className="syntax-purple">.</span>
                  <span className="syntax-yellow">role</span>{' '}
                  <span className="syntax-purple">=</span>{' '}
                  <span className="syntax-green">"Programador Python Júnior"</span>
                  <span className="syntax-purple">;</span>
                </p>
                <p className="text-lg ml-4">
                  <span className="syntax-red">this</span>
                  <span className="syntax-purple">.</span>
                  <span className="syntax-yellow">focus</span>{' '}
                  <span className="syntax-purple">=</span>{' '}
                  <span className="syntax-green">"Data Science & AI"</span>
                  <span className="syntax-purple">;</span>
                </p>
                <p className="text-lg ml-4">
                  <span className="syntax-red">this</span>
                  <span className="syntax-purple">.</span>
                  <span className="syntax-yellow">experience</span>{' '}
                  <span className="syntax-purple">=</span>{' '}
                  <span className="syntax-orange">9</span>
                  <span className="syntax-purple">;</span>{' '}
                  <span className="syntax-gray">// anos em TI</span>
                </p>
                <p className="text-lg">
                  <span className="syntax-purple">{'}'}</span>
                </p>
                <p className="text-lg">
                  <span className="syntax-purple">{'}'}</span>
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg text-muted-foreground max-w-2xl"
              >
                Profissional em transição estratégica para <span className="text-vs-blue font-semibold">Programação Python</span>, 
                <span className="text-vs-green font-semibold"> Inteligência Artificial</span> e 
                <span className="text-vs-purple font-semibold"> Análise de Dados</span>. 
                Pós-graduando em IA, ML e Deep Learning pelo MIT.
              </motion.p>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-center lg:justify-start space-x-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors ${social.color} hover:shadow-lg`}
                    title={social.label}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="p-6 bg-card border-border card-shadow">
              <div className="space-y-3 syntax-highlight text-sm">
                <div className="flex items-center space-x-2 pb-3 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-vs-red"></div>
                  <div className="w-3 h-3 rounded-full bg-vs-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-vs-green"></div>
                  <span className="text-xs text-muted-foreground ml-2">skills.py</span>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="space-y-2"
                >
                  <p><span className="syntax-purple">from</span> <span className="syntax-yellow">data_science</span> <span className="syntax-purple">import</span> <span className="syntax-cyan">pandas</span><span className="syntax-purple">,</span> <span className="syntax-cyan">numpy</span></p>
                  <p><span className="syntax-purple">from</span> <span className="syntax-yellow">ml</span> <span className="syntax-purple">import</span> <span className="syntax-cyan">tensorflow</span><span className="syntax-purple">,</span> <span className="syntax-cyan">pytorch</span></p>
                  <p><span className="syntax-purple">from</span> <span className="syntax-yellow">databases</span> <span className="syntax-purple">import</span> <span className="syntax-cyan">sql_server</span><span className="syntax-purple">,</span> <span className="syntax-cyan">mariadb</span></p>
                  <br />
                  <p><span className="syntax-blue">class</span> <span className="syntax-yellow">DataScientist</span><span className="syntax-purple">:</span></p>
                  <p className="ml-4"><span className="syntax-blue">def</span> <span className="syntax-green">__init__</span><span className="syntax-purple">(</span><span className="syntax-orange">self</span><span className="syntax-purple">):</span></p>
                  <p className="ml-8"><span className="syntax-orange">self</span><span className="syntax-purple">.</span><span className="syntax-cyan">python_level</span> <span className="syntax-purple">=</span> <span className="syntax-orange">98</span></p>
                  <p className="ml-8"><span className="syntax-orange">self</span><span className="syntax-purple">.</span><span className="syntax-cyan">sql_level</span> <span className="syntax-purple">=</span> <span className="syntax-orange">75</span></p>
                  <p className="ml-8"><span className="syntax-orange">self</span><span className="syntax-purple">.</span><span className="syntax-cyan">docker_level</span> <span className="syntax-purple">=</span> <span className="syntax-orange">70</span></p>
                  <br />
                  <p className="ml-4"><span className="syntax-blue">def</span> <span className="syntax-green">current_focus</span><span className="syntax-purple">(</span><span className="syntax-orange">self</span><span className="syntax-purple">):</span></p>
                  <p className="ml-8"><span className="syntax-purple">return</span> <span className="syntax-green">"AI & Machine Learning"</span></p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;