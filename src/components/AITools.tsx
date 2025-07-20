import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  FileText, 
  Copy, 
  Download, 
  Wand2,
  Bot,
  Lightbulb,
  Target
} from 'lucide-react';

const AITools = () => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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

        {/* Additional AI Tools Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center card-shadow opacity-75">
            <Lightbulb className="h-8 w-8 text-vs-yellow mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Análise de Skills</h4>
            <p className="text-sm text-muted-foreground">
              IA que analisa vagas e sugere melhorias no perfil
            </p>
            <Badge variant="outline" className="mt-2">Em breve</Badge>
          </Card>

          <Card className="p-6 text-center card-shadow opacity-75">
            <Target className="h-8 w-8 text-vs-purple mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Match de Vagas</h4>
            <p className="text-sm text-muted-foreground">
              Calcula compatibilidade entre perfil e vagas
            </p>
            <Badge variant="outline" className="mt-2">Em breve</Badge>
          </Card>

          <Card className="p-6 text-center card-shadow opacity-75">
            <FileText className="h-8 w-8 text-vs-green mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Otimização CV</h4>
            <p className="text-sm text-muted-foreground">
              Sugestões automáticas para melhorar o currículo
            </p>
            <Badge variant="outline" className="mt-2">Em breve</Badge>
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