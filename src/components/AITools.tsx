import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  FileText, 
  Copy, 
  Download, 
  Wand2,
  Bot,
  Lightbulb,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  User,
  Upload
} from 'lucide-react';

const AITools = () => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Skills Analysis
  const [skillsAnalysis, setSkillsAnalysis] = useState(null);
  const [isAnalyzingSkills, setIsAnalyzingSkills] = useState(false);
  
  // Job Matching
  const [jobMatch, setJobMatch] = useState(null);
  const [isMatchingJob, setIsMatchingJob] = useState(false);
  
  // CV Optimization
  const [cvText, setCvText] = useState('');
  const [cvOptimization, setCvOptimization] = useState(null);
  const [isOptimizingCV, setIsOptimizingCV] = useState(false);

  const generateCoverLetter = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Atenção",
        description: "Por favor, cole a descrição da vaga primeiro",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const coverLetter = `Prezados recrutadores,

Meu nome é Fabio Figueiredo e venho por meio desta carta demonstrar meu interesse na vaga anunciada. Com 9 anos de sólida experiência em infraestrutura de TI e atualmente em transição estratégica para as áreas de Programação Python, Inteligência Artificial e Análise de Dados, acredito que posso agregar valor significativo à sua equipe.

**Sobre minha experiência:**
- Atuação como Programador Python Júnior com foco em extração de dados de APIs, planilhas e páginas web
- Domínio de bibliotecas como Pandas e NumPy para análise e processamento de dados
- Experiência em infraestrutura de TI, tendo apoiado mais de 50 pessoas em projetos diversos
- Habilidades comprovadas em comunicação e trabalho em equipe

**Formação e desenvolvimento:**
- Cursando Pós-Graduação em Inteligência Artificial, Machine Learning e Deep Learning pelo MIT
- Conhecimentos em Python (98%), SQL Server e MariaDB (75%), Docker (70%), Django (70%), FastAPI (60%) e Power BI (55%)
- Constante busca por aprendizado e adaptação às novas tecnologias

Minha base técnica em infraestrutura, combinada com as novas competências em Python e IA, me permite ter uma visão holística dos projetos, desde a otimização de ambientes até a implementação de soluções inovadoras que transformam dados em insights estratégicos.

Estou ansioso para contribuir com minha experiência e entusiasmo pela tecnologia em sua organização. Agradeço a oportunidade de consideração e fico à disposição para uma conversa.

Atenciosamente,
Fabio Figueiredo
(21) 96464-1561
fabioinformacao@gmail.com
linkedin.com/in/fabio-figueiredo-295a8191`;

      setGeneratedLetter(coverLetter);
      setIsGenerating(false);
      
      toast({
        title: "Sucesso!",
        description: "Carta de apresentação gerada com sucesso",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copiado!",
      description: "Carta copiada para a área de transferência",
    });
  };

  const downloadLetter = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carta-apresentacao-fabio-figueiredo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "Arquivo baixado com sucesso",
    });
  };

  const analyzeSkills = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Atenção",
        description: "Por favor, cole a descrição da vaga primeiro",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzingSkills(true);
    
    setTimeout(() => {
      const analysis = {
        matchedSkills: ['Python', 'SQL', 'Docker', 'FastAPI'],
        missingSkills: ['React', 'TypeScript', 'AWS', 'Kubernetes'],
        recommendations: [
          'Considere fazer um curso de React para expandir suas habilidades frontend',
          'TypeScript é amplamente usado no mercado - seria um diferencial',
          'Conhecimentos em AWS são muito valorizados para esta vaga',
          'Kubernetes complementaria bem suas habilidades em Docker'
        ],
        overallMatch: 75
      };
      
      setSkillsAnalysis(analysis);
      setIsAnalyzingSkills(false);
      
      toast({
        title: "Análise concluída!",
        description: "Skills analisadas com sucesso",
      });
    }, 2500);
  };

  const matchJob = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Atenção",
        description: "Por favor, cole a descrição da vaga primeiro",
        variant: "destructive"
      });
      return;
    }

    setIsMatchingJob(true);
    
    setTimeout(() => {
      const match = {
        compatibility: 82,
        strengths: [
          'Experiência sólida em Python',
          'Background em infraestrutura de TI',
          'Conhecimento em análise de dados',
          'Formação em IA/ML em andamento'
        ],
        improvements: [
          'Adicionar projetos React ao portfólio',
          'Certificação AWS seria um diferencial',
          'Experiência com metodologias ágeis'
        ],
        recommendation: 'Alta compatibilidade! Você tem um perfil muito adequado para esta vaga.'
      };
      
      setJobMatch(match);
      setIsMatchingJob(false);
      
      toast({
        title: "Match calculado!",
        description: `${match.compatibility}% de compatibilidade`,
      });
    }, 2000);
  };

  const optimizeCV = () => {
    if (!cvText.trim()) {
      toast({
        title: "Atenção",
        description: "Por favor, cole seu CV primeiro",
        variant: "destructive"
      });
      return;
    }

    setIsOptimizingCV(true);
    
    setTimeout(() => {
      const optimization = {
        score: 78,
        improvements: [
          {
            section: 'Resumo Profissional',
            suggestion: 'Adicione palavras-chave específicas da área de dados e IA',
            priority: 'Alta'
          },
          {
            section: 'Experiência',
            suggestion: 'Quantifique seus resultados com métricas específicas',
            priority: 'Alta'
          },
          {
            section: 'Habilidades',
            suggestion: 'Organize por categoria: Linguagens, Frameworks, Tools',
            priority: 'Média'
          },
          {
            section: 'Projetos',
            suggestion: 'Inclua links para GitHub e demonstrações ao vivo',
            priority: 'Alta'
          }
        ],
        optimizedSections: [
          'Formatação está adequada',
          'Informações de contato completas',
          'Estrutura lógica e organizada'
        ]
      };
      
      setCvOptimization(optimization);
      setIsOptimizingCV(false);
      
      toast({
        title: "CV analisado!",
        description: `Score atual: ${optimization.score}/100`,
      });
    }, 3000);
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 syntax-highlight">
            <span className="syntax-blue">function</span>{' '}
            <span className="syntax-yellow">generateAI</span>
            <span className="syntax-purple">()</span>{' '}
            <span className="syntax-purple">{'{'}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas de IA interativas para <span className="text-vs-purple font-semibold">otimizar seu processo de recrutamento</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Cover Letter Generator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-6 card-shadow">
              <div className="flex items-center mb-6">
                <Sparkles className="h-6 w-6 text-vs-yellow mr-3" />
                <h3 className="text-xl font-bold text-vs-blue">Gerador de Carta de Apresentação</h3>
                <Badge className="ml-auto bg-vs-purple/20 text-vs-purple border-vs-purple/30">
                  IA Powered
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-vs-green">
                    Cole a descrição da vaga:
                  </label>
                  <Textarea
                    placeholder="Cole aqui a descrição completa da vaga de emprego..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={6}
                    className="w-full"
                  />
                </div>

                <Button 
                  onClick={generateCoverLetter}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-vs-blue to-vs-purple hover:from-vs-blue/80 hover:to-vs-purple/80"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Bot className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Wand2 className="h-4 w-4 mr-2" />
                  )}
                  {isGenerating ? 'Gerando...' : 'Gerar Carta ✨'}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Generated Result */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6 card-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-vs-green mr-3" />
                  <h3 className="text-xl font-bold text-vs-green">Carta Gerada</h3>
                </div>
                
                {generatedLetter && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadLetter}>
                      <Download className="h-3 w-3 mr-1" />
                      Baixar
                    </Button>
                  </div>
                )}
              </div>

              {generatedLetter ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-secondary/20 rounded-lg p-4 max-h-96 overflow-y-auto"
                >
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                    {generatedLetter}
                  </pre>
                </motion.div>
              ) : (
                <div className="bg-secondary/20 rounded-lg p-8 text-center">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Sua carta personalizada aparecerá aqui após a geração
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Additional AI Tools - Now Active */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 space-y-8"
        >
          
          {/* Skills Analysis */}
          <Card className="p-6 card-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Lightbulb className="h-6 w-6 text-vs-yellow mr-3" />
                <h3 className="text-xl font-bold text-vs-yellow">Análise de Skills</h3>
                <Badge className="ml-3 bg-vs-yellow/20 text-vs-yellow border-vs-yellow/30">
                  IA Powered
                </Badge>
              </div>
              <Button 
                onClick={analyzeSkills}
                disabled={isAnalyzingSkills}
                variant="outline"
                className="border-vs-yellow text-vs-yellow hover:bg-vs-yellow/10"
              >
                {isAnalyzingSkills ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Bot className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Lightbulb className="h-4 w-4 mr-2" />
                )}
                {isAnalyzingSkills ? 'Analisando...' : 'Analisar Skills'}
              </Button>
            </div>

            {skillsAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-vs-green mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Skills Compatíveis
                    </h4>
                    <div className="space-y-2">
                      {skillsAnalysis.matchedSkills.map((skill, index) => (
                        <Badge key={index} className="mr-2 bg-vs-green/20 text-vs-green border-vs-green/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-vs-red mb-3 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Skills Sugeridas
                    </h4>
                    <div className="space-y-2">
                      {skillsAnalysis.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="mr-2 border-vs-red text-vs-red">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Recomendações:</h4>
                  <ul className="space-y-2">
                    {skillsAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <TrendingUp className="h-4 w-4 text-vs-blue mr-2 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Match Overall:</span>
                  <Progress value={skillsAnalysis.overallMatch} className="flex-1" />
                  <span className="text-sm font-bold text-vs-purple">{skillsAnalysis.overallMatch}%</span>
                </div>
              </motion.div>
            )}
          </Card>

          {/* Job Matching */}
          <Card className="p-6 card-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Target className="h-6 w-6 text-vs-purple mr-3" />
                <h3 className="text-xl font-bold text-vs-purple">Match de Vagas</h3>
                <Badge className="ml-3 bg-vs-purple/20 text-vs-purple border-vs-purple/30">
                  IA Powered
                </Badge>
              </div>
              <Button 
                onClick={matchJob}
                disabled={isMatchingJob}
                variant="outline"
                className="border-vs-purple text-vs-purple hover:bg-vs-purple/10"
              >
                {isMatchingJob ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Bot className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Target className="h-4 w-4 mr-2" />
                )}
                {isMatchingJob ? 'Calculando...' : 'Calcular Match'}
              </Button>
            </div>

            {jobMatch && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-vs-purple mb-2">{jobMatch.compatibility}%</div>
                  <p className="text-muted-foreground">Compatibilidade com a vaga</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-vs-green mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Seus Pontos Fortes
                    </h4>
                    <ul className="space-y-2">
                      {jobMatch.strengths.map((strength, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-vs-green mr-2 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-vs-yellow mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Áreas de Melhoria
                    </h4>
                    <ul className="space-y-2">
                      {jobMatch.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <TrendingUp className="h-4 w-4 text-vs-yellow mr-2 mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-vs-purple/10 rounded-lg p-4 border border-vs-purple/20">
                  <h4 className="font-semibold text-vs-purple mb-2">Recomendação:</h4>
                  <p className="text-sm">{jobMatch.recommendation}</p>
                </div>
              </motion.div>
            )}
          </Card>

          {/* CV Optimization */}
          <Card className="p-6 card-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-vs-green mr-3" />
                <h3 className="text-xl font-bold text-vs-green">Otimização de CV</h3>
                <Badge className="ml-3 bg-vs-green/20 text-vs-green border-vs-green/30">
                  IA Powered
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-vs-green">
                  Cole seu CV atual:
                </label>
                <Textarea
                  placeholder="Cole aqui o texto do seu currículo..."
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  rows={6}
                  className="w-full"
                />
              </div>

              <Button 
                onClick={optimizeCV}
                disabled={isOptimizingCV}
                className="w-full bg-gradient-to-r from-vs-green to-vs-blue hover:from-vs-green/80 hover:to-vs-blue/80"
              >
                {isOptimizingCV ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Bot className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                {isOptimizingCV ? 'Analisando CV...' : 'Otimizar CV ✨'}
              </Button>

              {cvOptimization && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Score do CV:</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={cvOptimization.score} className="w-32" />
                      <span className="text-lg font-bold text-vs-green">{cvOptimization.score}/100</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-vs-red mb-3 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Melhorias Sugeridas
                    </h4>
                    <div className="space-y-3">
                      {cvOptimization.improvements.map((improvement, index) => (
                        <div key={index} className="bg-secondary/20 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{improvement.section}</span>
                            <Badge 
                              variant="outline" 
                              className={
                                improvement.priority === 'Alta' ? 'border-vs-red text-vs-red' :
                                improvement.priority === 'Média' ? 'border-vs-yellow text-vs-yellow' :
                                'border-vs-green text-vs-green'
                              }
                            >
                              {improvement.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{improvement.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-vs-green mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Pontos Positivos
                    </h4>
                    <ul className="space-y-2">
                      {cvOptimization.optimizedSections.map((section, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-vs-green mr-2 mt-0.5 flex-shrink-0" />
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Closing Brace */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-8"
        >
          <span className="text-2xl syntax-highlight syntax-purple">{'}'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AITools;