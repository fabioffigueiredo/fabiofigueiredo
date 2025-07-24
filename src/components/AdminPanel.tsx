import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, Save, RefreshCw, X, Lock, Edit2, Eye } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // State for different sections
  const [heroContent, setHeroContent] = useState<any>(null);
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [softSkills, setSoftSkills] = useState<any[]>([]);
  const [techFocus, setTechFocus] = useState<any[]>([]);

  const handleLogin = () => {
    if (loginEmail === 'fabioinformacao@gmail.com' && loginPassword === 'F@bi1984') {
      setIsAuthenticated(true);
      toast({
        title: 'Sucesso',
        description: 'Login realizado com sucesso',
      });
      loadAllData();
    } else {
      toast({
        title: 'Erro',
        description: 'Credenciais inválidas',
        variant: 'destructive',
      });
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        heroRes,
        aboutRes,
        socialRes,
        projectsRes,
        experiencesRes,
        educationRes,
        skillsRes,
        softSkillsRes,
        techFocusRes
      ] = await Promise.all([
        supabase.from('hero_content').select('*').limit(1).single(),
        supabase.from('about_content').select('*').limit(1).single(),
        supabase.from('social_links').select('*').order('display_order'),
        supabase.from('projects').select('*').order('display_order'),
        supabase.from('experiences').select('*').order('display_order'),
        supabase.from('education').select('*').order('display_order'),
        supabase.from('skills').select('*').order('display_order'),
        supabase.from('soft_skills').select('*').order('display_order'),
        supabase.from('tech_focus').select('*').order('display_order')
      ]);

      setHeroContent(heroRes.data);
      setAboutContent(aboutRes.data);
      setSocialLinks(socialRes.data || []);
      setProjects(projectsRes.data || []);
      setExperiences(experiencesRes.data || []);
      setEducation(educationRes.data || []);
      setSkills(skillsRes.data || []);
      setSoftSkills(softSkillsRes.data || []);
      setTechFocus(techFocusRes.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar dados',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHeroContent = async () => {
    if (!heroContent) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('hero_content')
        .update(heroContent)
        .eq('id', heroContent.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Conteúdo do Hero atualizado com sucesso',
      });
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar conteúdo',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAboutContent = async () => {
    if (!aboutContent) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('about_content')
        .update(aboutContent)
        .eq('id', aboutContent.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Conteúdo Sobre atualizado com sucesso',
      });
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar conteúdo',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (table: 'projects' | 'experiences' | 'education' | 'skills' | 'social_links' | 'soft_skills', id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Item deletado com sucesso',
      });
      
      loadAllData();
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao deletar item',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addNewProject = async () => {
    const newProject = {
      name: 'Novo Projeto',
      description: 'Descrição do projeto',
      github_url: 'https://github.com/user/repo',
      live_url: null,
      technologies: ['React', 'TypeScript'],
      stars: 0,
      forks: 0,
      is_active: true,
      display_order: projects.length
    };

    setLoading(true);
    try {
      const { error } = await supabase
        .from('projects')
        .insert([newProject]);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Projeto adicionado com sucesso',
      });
      
      loadAllData();
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao adicionar projeto',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {!isAuthenticated ? (
          // Login Form
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Acesso Administrativo</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Digite seu email"
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Digite sua senha"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Entrar
              </Button>
            </div>
          </div>
        ) : (
          // Admin Panel Content
          <>
            <div className="p-6 border-b border-border bg-card/50">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-primary">Painel Administrativo</h1>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={loadAllData} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">
                Gerencie todos os conteúdos do seu portfólio
              </p>
            </div>
            
            <div className="overflow-y-auto max-h-[70vh]">
              <Tabs defaultValue="hero" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 p-4">
                  <TabsTrigger value="hero">Hero</TabsTrigger>
                  <TabsTrigger value="about">Sobre</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="projects">Projetos</TabsTrigger>
                  <TabsTrigger value="experience">Experiência</TabsTrigger>
                  <TabsTrigger value="education">Educação</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
                </TabsList>

                <div className="p-6">
                  {/* Hero Content */}
                  <TabsContent value="hero">
                    <Card>
                      <CardHeader>
                        <CardTitle>Conteúdo do Hero</CardTitle>
                        <CardDescription>Edite as informações principais da seção hero</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {heroContent && (
                          <>
                            <div>
                              <Label htmlFor="name">Nome</Label>
                              <Input
                                id="name"
                                value={heroContent.name || ''}
                                onChange={(e) => setHeroContent({...heroContent, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="role">Cargo</Label>
                              <Input
                                id="role"
                                value={heroContent.role || ''}
                                onChange={(e) => setHeroContent({...heroContent, role: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="focus">Foco</Label>
                              <Input
                                id="focus"
                                value={heroContent.focus || ''}
                                onChange={(e) => setHeroContent({...heroContent, focus: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="description">Descrição</Label>
                              <Textarea
                                id="description"
                                value={heroContent.description || ''}
                                onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="experience_years">Anos de Experiência</Label>
                              <Input
                                id="experience_years"
                                type="number"
                                value={heroContent.experience_years || 0}
                                onChange={(e) => setHeroContent({...heroContent, experience_years: parseInt(e.target.value)})}
                              />
                            </div>
                            <Button onClick={updateHeroContent} disabled={loading}>
                              <Save className="h-4 w-4 mr-2" />
                              Salvar Alterações
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* About Content */}
                  <TabsContent value="about">
                    <Card>
                      <CardHeader>
                        <CardTitle>Conteúdo Sobre</CardTitle>
                        <CardDescription>Edite as informações da seção sobre</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {aboutContent && (
                          <>
                            <div>
                              <Label htmlFor="section_title">Título da Seção</Label>
                              <Input
                                id="section_title"
                                value={aboutContent.section_title || ''}
                                onChange={(e) => setAboutContent({...aboutContent, section_title: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="personal_story">História Pessoal</Label>
                              <Textarea
                                id="personal_story"
                                value={aboutContent.personal_story || ''}
                                onChange={(e) => setAboutContent({...aboutContent, personal_story: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="professional_goal">Objetivo Profissional</Label>
                              <Textarea
                                id="professional_goal"
                                value={aboutContent.professional_goal || ''}
                                onChange={(e) => setAboutContent({...aboutContent, professional_goal: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="support_experience">Experiência de Suporte</Label>
                              <Textarea
                                id="support_experience"
                                value={aboutContent.support_experience || ''}
                                onChange={(e) => setAboutContent({...aboutContent, support_experience: e.target.value})}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="people_supported">Pessoas Atendidas</Label>
                                <Input
                                  id="people_supported"
                                  type="number"
                                  value={aboutContent.people_supported || 0}
                                  onChange={(e) => setAboutContent({...aboutContent, people_supported: parseInt(e.target.value)})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="satisfaction_rate">Taxa de Satisfação (%)</Label>
                                <Input
                                  id="satisfaction_rate"
                                  type="number"
                                  value={aboutContent.satisfaction_rate || 0}
                                  onChange={(e) => setAboutContent({...aboutContent, satisfaction_rate: parseInt(e.target.value)})}
                                />
                              </div>
                            </div>
                            <Button onClick={updateAboutContent} disabled={loading}>
                              <Save className="h-4 w-4 mr-2" />
                              Salvar Alterações
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Projects */}
                  <TabsContent value="projects">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Projetos</CardTitle>
                            <CardDescription>Gerencie seus projetos</CardDescription>
                          </div>
                          <Button onClick={addNewProject} disabled={loading}>
                            <Plus className="h-4 w-4 mr-2" />
                            Novo Projeto
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {projects.map((project) => (
                            <div key={project.id} className="p-4 border rounded-lg space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{project.name}</h4>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={project.is_active ? "default" : "secondary"}>
                                    {project.is_active ? "Ativo" : "Inativo"}
                                  </Badge>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteItem('projects', project.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies?.map((tech: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ⭐ {project.stars} • 🍴 {project.forks}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Other tabs with similar structure */}
                  <TabsContent value="social">
                    <Card>
                      <CardHeader>
                        <CardTitle>Links Sociais</CardTitle>
                        <CardDescription>Gerencie seus links de redes sociais</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {socialLinks.map((link) => (
                            <div key={link.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold">{link.platform}</span>
                                  <Badge variant={link.is_active ? "default" : "secondary"}>
                                    {link.is_active ? "Ativo" : "Inativo"}
                                  </Badge>
                                </div>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteItem('social_links', link.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">{link.url}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="experience">
                    <Card>
                      <CardHeader>
                        <CardTitle>Experiências</CardTitle>
                        <CardDescription>Gerencie suas experiências profissionais</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {experiences.map((exp) => (
                            <div key={exp.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold">{exp.title}</h4>
                                  <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                                </div>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteItem('experiences', exp.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm mt-2">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="education">
                    <Card>
                      <CardHeader>
                        <CardTitle>Educação</CardTitle>
                        <CardDescription>Gerencie sua formação acadêmica</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {education.map((edu) => (
                            <div key={edu.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold">{edu.degree}</h4>
                                  <p className="text-sm text-muted-foreground">{edu.institution} • {edu.period}</p>
                                </div>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteItem('education', edu.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm mt-2">{edu.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="skills">
                    <Card>
                      <CardHeader>
                        <CardTitle>Habilidades Técnicas</CardTitle>
                        <CardDescription>Gerencie suas habilidades técnicas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {skills.map((skill) => (
                            <div key={skill.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{skill.name}</span>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteItem('skills', skill.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Categoria: {skill.category}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Nível: {skill.proficiency_level}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="soft-skills">
                    <Card>
                      <CardHeader>
                        <CardTitle>Soft Skills</CardTitle>
                        <CardDescription>Gerencie suas habilidades comportamentais</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {softSkills.map((skill) => (
                            <div key={skill.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{skill.title}</h4>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteItem('soft_skills', skill.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">{skill.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;