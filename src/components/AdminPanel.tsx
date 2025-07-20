import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Save, 
  Trash2, 
  Edit, 
  X,
  Code,
  GraduationCap,
  Briefcase,
  Settings,
  Database,
  Image as ImageIcon
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('skills');
  const [newSkill, setNewSkill] = useState({ name: '', level: 0, category: 'backend' });
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    period: '',
    description: '',
    highlights: ''
  });
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    period: '',
    description: '',
    achievements: '',
    technologies: ''
  });

  const adminSections = [
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'education', label: 'Educação', icon: GraduationCap },
    { id: 'experience', label: 'Experiência', icon: Briefcase },
    { id: 'content', label: 'Conteúdo', icon: Database },
    { id: 'media', label: 'Mídia', icon: ImageIcon },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const handleAddSkill = () => {
    if (!newSkill.name || newSkill.level <= 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos corretamente",
        variant: "destructive"
      });
      return;
    }

    // Simulated save
    toast({
      title: "Sucesso!",
      description: `Habilidade "${newSkill.name}" adicionada com ${newSkill.level}%`,
    });
    
    setNewSkill({ name: '', level: 0, category: 'backend' });
  };

  const handleAddEducation = () => {
    if (!newEducation.degree || !newEducation.institution) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o curso e a instituição",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: `Formação "${newEducation.degree}" adicionada`,
    });
    
    setNewEducation({
      degree: '',
      institution: '',
      period: '',
      description: '',
      highlights: ''
    });
  };

  const handleAddExperience = () => {
    if (!newExperience.title || !newExperience.company) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o cargo e a empresa",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: `Experiência "${newExperience.title}" adicionada`,
    });
    
    setNewExperience({
      title: '',
      company: '',
      location: '',
      period: '',
      description: '',
      achievements: '',
      technologies: ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            <Card className="card-shadow">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Settings className="h-6 w-6 text-vs-orange" />
                  <h2 className="text-2xl font-bold syntax-highlight">
                    <span className="syntax-blue">class</span>{' '}
                    <span className="syntax-yellow">AdminPanel</span>{' '}
                    <span className="syntax-purple">{'{'}</span>
                  </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex h-[600px]">
                
                {/* Sidebar */}
                <div className="w-64 border-r border-border bg-muted/20">
                  <nav className="p-4 space-y-2">
                    {adminSections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <Button
                          key={section.id}
                          variant={activeTab === section.id ? "default" : "ghost"}
                          className={`w-full justify-start syntax-highlight ${
                            activeTab === section.id 
                              ? 'bg-vs-blue/20 text-vs-blue border border-vs-blue/30' 
                              : 'hover:bg-secondary/80'
                          }`}
                          onClick={() => setActiveTab(section.id)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          <span className="syntax-purple">{section.label}</span>
                        </Button>
                      );
                    })}
                  </nav>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  
                  {/* Skills Tab */}
                  {activeTab === 'skills' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-vs-blue">Gerenciar Habilidades</h3>
                      
                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 text-vs-green">Adicionar Nova Habilidade</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                            placeholder="Nome da habilidade"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                          />
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Nível (%)"
                            value={newSkill.level || ''}
                            onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value) || 0})}
                          />
                          <select
                            className="px-3 py-2 border border-input rounded-md bg-background"
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                          >
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="tools">Tools</option>
                            <option value="ai">AI/ML</option>
                          </select>
                        </div>
                        <Button className="mt-4" onClick={handleAddSkill}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Habilidade
                        </Button>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 text-vs-purple">Habilidades Atuais</h4>
                        <div className="space-y-2">
                          {['Python (98%)', 'SQL Server (75%)', 'Docker (70%)', 'Django (70%)', 'FastAPI (60%)', 'Power BI (55%)'].map((skill, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-secondary/30 rounded">
                              <span>{skill}</span>
                              <div className="space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* Education Tab */}
                  {activeTab === 'education' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-vs-blue">Gerenciar Educação</h3>
                      
                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 text-vs-green">Adicionar Formação</h4>
                        <div className="space-y-4">
                          <Input
                            placeholder="Curso/Grau"
                            value={newEducation.degree}
                            onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                          />
                          <Input
                            placeholder="Instituição"
                            value={newEducation.institution}
                            onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                          />
                          <Input
                            placeholder="Período (ex: 2020 - 2024)"
                            value={newEducation.period}
                            onChange={(e) => setNewEducation({...newEducation, period: e.target.value})}
                          />
                          <Textarea
                            placeholder="Descrição"
                            value={newEducation.description}
                            onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                          />
                          <Textarea
                            placeholder="Principais tópicos (um por linha)"
                            value={newEducation.highlights}
                            onChange={(e) => setNewEducation({...newEducation, highlights: e.target.value})}
                          />
                        </div>
                        <Button className="mt-4" onClick={handleAddEducation}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Formação
                        </Button>
                      </Card>
                    </div>
                  )}

                  {/* Experience Tab */}
                  {activeTab === 'experience' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-vs-blue">Gerenciar Experiência</h3>
                      
                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 text-vs-green">Adicionar Experiência</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Cargo"
                              value={newExperience.title}
                              onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                            />
                            <Input
                              placeholder="Empresa"
                              value={newExperience.company}
                              onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                            />
                            <Input
                              placeholder="Localização"
                              value={newExperience.location}
                              onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                            />
                            <Input
                              placeholder="Período"
                              value={newExperience.period}
                              onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                            />
                          </div>
                          <Textarea
                            placeholder="Descrição do cargo"
                            value={newExperience.description}
                            onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                          />
                          <Textarea
                            placeholder="Principais realizações (uma por linha)"
                            value={newExperience.achievements}
                            onChange={(e) => setNewExperience({...newExperience, achievements: e.target.value})}
                          />
                          <Textarea
                            placeholder="Tecnologias utilizadas (separadas por vírgula)"
                            value={newExperience.technologies}
                            onChange={(e) => setNewExperience({...newExperience, technologies: e.target.value})}
                          />
                        </div>
                        <Button className="mt-4" onClick={handleAddExperience}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Experiência
                        </Button>
                      </Card>
                    </div>
                  )}

                  {/* Content Tab */}
                  {activeTab === 'content' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-vs-blue">Gerenciar Conteúdo</h3>
                      
                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 text-vs-green">Editar Textos</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Resumo Profissional</label>
                            <Textarea
                              placeholder="Descrição profissional principal"
                              rows={4}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Objetivo Profissional</label>
                            <Textarea
                              placeholder="Objetivo de carreira"
                              rows={3}
                            />
                          </div>
                        </div>
                        <Button className="mt-4">
                          <Save className="h-4 w-4 mr-2" />
                          Salvar Alterações
                        </Button>
                      </Card>
                    </div>
                  )}

                  {/* Media Tab */}
                  {activeTab === 'media' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-vs-blue">Gerenciar Mídia</h3>
                      
                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 text-vs-green">Upload de Imagens</h4>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">
                            Arraste e solte imagens aqui ou clique para selecionar
                          </p>
                          <Button variant="outline">
                            Selecionar Arquivos
                          </Button>
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === 'settings' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-vs-blue">Configurações</h3>
                      
                      <Card className="p-4">
                        <h4 className="font-semibold mb-4 text-vs-green">Informações de Contato</h4>
                        <div className="space-y-4">
                          <Input placeholder="Email" defaultValue="fabioinformacao@gmail.com" />
                          <Input placeholder="Telefone" defaultValue="(21) 96464-1561" />
                          <Input placeholder="LinkedIn" defaultValue="linkedin.com/in/fabio-figueiredo-295a8191" />
                          <Input placeholder="GitHub" defaultValue="github.com/fabioffigueiredo" />
                        </div>
                        <Button className="mt-4">
                          <Save className="h-4 w-4 mr-2" />
                          Salvar Configurações
                        </Button>
                      </Card>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border bg-muted/20">
                <div className="text-center">
                  <span className="text-sm syntax-highlight syntax-purple">{'}'}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Painel administrativo para gerenciamento de conteúdo
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;