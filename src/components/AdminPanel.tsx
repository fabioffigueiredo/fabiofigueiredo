import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, Save, RefreshCw } from 'lucide-react';

interface HeroContent {
  id: string;
  name: string;
  role: string;
  focus: string;
  experience_years: number;
  description: string;
  profile_image_url: string | null;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  github_url: string;
  live_url: string | null;
  technologies: string[];
  stars: number;
  forks: number;
  display_order: number;
  is_active: boolean;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  display_order: number;
  is_active: boolean;
}

interface AboutContent {
  id: string;
  section_title: string;
  personal_story: string;
  support_experience: string;
  people_supported: number;
  satisfaction_rate: number;
  professional_goal: string;
}

interface SoftSkill {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

interface TechFocus {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  display_order: number;
  is_active: boolean;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Estado para Hero Content
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  
  // Estado para Social Links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [newSocialLink, setNewSocialLink] = useState({
    platform: '',
    url: '',
    icon: '',
    color: '',
    display_order: 0
  });
  
  // Estado para About Content
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  
  // Estado para Soft Skills
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);
  const [newSoftSkill, setNewSoftSkill] = useState({
    title: '',
    description: '',
    icon: '',
    color: '',
    display_order: 0
  });
  
  // Estado para Tech Focus
  const [techFocus, setTechFocus] = useState<TechFocus[]>([]);
  const [newTechFocus, setNewTechFocus] = useState({
    title: '',
    description: '',
    icon: '',
    technologies: [] as string[],
    display_order: 0
  });
  
  // Estado para Projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    github_url: '',
    live_url: '',
    technologies: [] as string[],
    stars: 0,
    forks: 0,
    display_order: 0
  });
  
  // Estado para Experiences
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    period: '',
    description: '',
    achievements: [] as string[],
    technologies: [] as string[],
    display_order: 0
  });

  // Carregamento inicial dos dados
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadHeroContent(),
        loadSocialLinks(),
        loadAboutContent(),
        loadSoftSkills(),
        loadTechFocus(),
        loadProjects(),
        loadExperiences()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar dados do painel',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadHeroContent = async () => {
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao carregar hero content:', error);
      return;
    }
    
    setHeroContent(data);
  };

  const loadSocialLinks = async () => {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Erro ao carregar social links:', error);
      return;
    }
    
    setSocialLinks(data || []);
  };

  const loadAboutContent = async () => {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao carregar about content:', error);
      return;
    }
    
    setAboutContent(data);
  };

  const loadSoftSkills = async () => {
    const { data, error } = await supabase
      .from('soft_skills')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Erro ao carregar soft skills:', error);
      return;
    }
    
    setSoftSkills(data || []);
  };

  const loadTechFocus = async () => {
    const { data, error } = await supabase
      .from('tech_focus')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Erro ao carregar tech focus:', error);
      return;
    }
    
    setTechFocus(data || []);
  };

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Erro ao carregar projects:', error);
      return;
    }
    
    setProjects(data || []);
  };

  const loadExperiences = async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Erro ao carregar experiences:', error);
      return;
    }
    
    setExperiences(data || []);
  };

  // Funções para Hero Content
  const saveHeroContent = async () => {
    if (!heroContent) return;

    const { error } = await supabase
      .from('hero_content')
      .upsert(heroContent);

    if (error) {
      console.error('Erro ao salvar hero content:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao salvar informações do hero',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sucesso',
      description: 'Informações do hero salvas com sucesso',
    });
  };

  // Funções para Social Links
  const addSocialLink = async () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('social_links')
      .insert([newSocialLink]);

    if (error) {
      console.error('Erro ao adicionar social link:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao adicionar link social',
        variant: 'destructive',
      });
      return;
    }

    setNewSocialLink({
      platform: '',
      url: '',
      icon: '',
      color: '',
      display_order: 0
    });

    await loadSocialLinks();
    toast({
      title: 'Sucesso',
      description: 'Link social adicionado com sucesso',
    });
  };

  const deleteSocialLink = async (id: string) => {
    const { error } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar social link:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao deletar link social',
        variant: 'destructive',
      });
      return;
    }

    await loadSocialLinks();
    toast({
      title: 'Sucesso',
      description: 'Link social removido com sucesso',
    });
  };

  // Funções para About Content
  const saveAboutContent = async () => {
    if (!aboutContent) return;

    const { error } = await supabase
      .from('about_content')
      .upsert(aboutContent);

    if (error) {
      console.error('Erro ao salvar about content:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao salvar informações sobre',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sucesso',
      description: 'Informações sobre salvas com sucesso',
    });
  };

  // Funções para Projects
  const addProject = async () => {
    if (!newProject.name || !newProject.description || !newProject.github_url) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('projects')
      .insert([newProject]);

    if (error) {
      console.error('Erro ao adicionar projeto:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao adicionar projeto',
        variant: 'destructive',
      });
      return;
    }

    setNewProject({
      name: '',
      description: '',
      github_url: '',
      live_url: '',
      technologies: [],
      stars: 0,
      forks: 0,
      display_order: 0
    });

    await loadProjects();
    toast({
      title: 'Sucesso',
      description: 'Projeto adicionado com sucesso',
    });
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar projeto:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao deletar projeto',
        variant: 'destructive',
      });
      return;
    }

    await loadProjects();
    toast({
      title: 'Sucesso',
      description: 'Projeto removido com sucesso',
    });
  };

  // Função auxiliar para arrays de strings
  const arrayToString = (arr: string[]) => arr.join(', ');
  const stringToArray = (str: string) => str.split(',').map(s => s.trim()).filter(s => s.length > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-20 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
          <span>Carregando painel administrativo...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Painel Administrativo</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os conteúdos do seu portfólio
          </p>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid grid-cols-6 lg:grid-cols-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="experience">Experiência</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          {/* Hero Content */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seção Hero</CardTitle>
                <CardDescription>
                  Edite as informações principais da página inicial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {heroContent && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          value={heroContent.name}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            name: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Cargo</Label>
                        <Input
                          id="role"
                          value={heroContent.role}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            role: e.target.value
                          })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="focus">Foco</Label>
                        <Input
                          id="focus"
                          value={heroContent.focus}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            focus: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience_years">Anos de Experiência</Label>
                        <Input
                          id="experience_years"
                          type="number"
                          value={heroContent.experience_years}
                          onChange={(e) => setHeroContent({
                            ...heroContent,
                            experience_years: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={heroContent.description}
                        onChange={(e) => setHeroContent({
                          ...heroContent,
                          description: e.target.value
                        })}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="profile_image_url">URL da Foto de Perfil</Label>
                      <Input
                        id="profile_image_url"
                        value={heroContent.profile_image_url || ''}
                        onChange={(e) => setHeroContent({
                          ...heroContent,
                          profile_image_url: e.target.value
                        })}
                      />
                    </div>
                    
                    <Button onClick={saveHeroContent} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Hero
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Content */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seção Sobre</CardTitle>
                <CardDescription>
                  Edite as informações da seção sobre
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aboutContent && (
                  <>
                    <div>
                      <Label htmlFor="personal_story">História Pessoal</Label>
                      <Textarea
                        id="personal_story"
                        value={aboutContent.personal_story}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          personal_story: e.target.value
                        })}
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="support_experience">Experiência de Suporte</Label>
                      <Textarea
                        id="support_experience"
                        value={aboutContent.support_experience}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          support_experience: e.target.value
                        })}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="people_supported">Pessoas Apoiadas</Label>
                        <Input
                          id="people_supported"
                          type="number"
                          value={aboutContent.people_supported}
                          onChange={(e) => setAboutContent({
                            ...aboutContent,
                            people_supported: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="satisfaction_rate">Taxa de Satisfação (%)</Label>
                        <Input
                          id="satisfaction_rate"
                          type="number"
                          value={aboutContent.satisfaction_rate}
                          onChange={(e) => setAboutContent({
                            ...aboutContent,
                            satisfaction_rate: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="professional_goal">Objetivo Profissional</Label>
                      <Textarea
                        id="professional_goal"
                        value={aboutContent.professional_goal}
                        onChange={(e) => setAboutContent({
                          ...aboutContent,
                          professional_goal: e.target.value
                        })}
                        rows={3}
                      />
                    </div>
                    
                    <Button onClick={saveAboutContent} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Sobre
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo Projeto</CardTitle>
                <CardDescription>
                  Adicione um novo projeto ao seu portfólio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project_name">Nome do Projeto *</Label>
                    <Input
                      id="project_name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({
                        ...newProject,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="project_github">URL do GitHub *</Label>
                    <Input
                      id="project_github"
                      value={newProject.github_url}
                      onChange={(e) => setNewProject({
                        ...newProject,
                        github_url: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="project_description">Descrição *</Label>
                  <Textarea
                    id="project_description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({
                      ...newProject,
                      description: e.target.value
                    })}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="project_live">URL Demo</Label>
                    <Input
                      id="project_live"
                      value={newProject.live_url}
                      onChange={(e) => setNewProject({
                        ...newProject,
                        live_url: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="project_stars">Stars</Label>
                    <Input
                      id="project_stars"
                      type="number"
                      value={newProject.stars}
                      onChange={(e) => setNewProject({
                        ...newProject,
                        stars: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="project_forks">Forks</Label>
                    <Input
                      id="project_forks"
                      type="number"
                      value={newProject.forks}
                      onChange={(e) => setNewProject({
                        ...newProject,
                        forks: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="project_technologies">Tecnologias (separadas por vírgula)</Label>
                  <Input
                    id="project_technologies"
                    value={arrayToString(newProject.technologies)}
                    onChange={(e) => setNewProject({
                      ...newProject,
                      technologies: stringToArray(e.target.value)
                    })}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>
                
                <Button onClick={addProject} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Projeto
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Projetos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Projetos Existentes</h3>
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>⭐ {project.stars}</span>
                          <span>🍴 {project.forks}</span>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Links */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo Link Social</CardTitle>
                <CardDescription>
                  Adicione um novo link para suas redes sociais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="social_platform">Plataforma *</Label>
                    <Input
                      id="social_platform"
                      value={newSocialLink.platform}
                      onChange={(e) => setNewSocialLink({
                        ...newSocialLink,
                        platform: e.target.value
                      })}
                      placeholder="GitHub, LinkedIn, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="social_url">URL *</Label>
                    <Input
                      id="social_url"
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({
                        ...newSocialLink,
                        url: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="social_icon">Ícone (Lucide)</Label>
                    <Input
                      id="social_icon"
                      value={newSocialLink.icon}
                      onChange={(e) => setNewSocialLink({
                        ...newSocialLink,
                        icon: e.target.value
                      })}
                      placeholder="Github, Linkedin, Mail"
                    />
                  </div>
                  <div>
                    <Label htmlFor="social_color">Cor CSS</Label>
                    <Input
                      id="social_color"
                      value={newSocialLink.color}
                      onChange={(e) => setNewSocialLink({
                        ...newSocialLink,
                        color: e.target.value
                      })}
                      placeholder="text-vs-blue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="social_order">Ordem</Label>
                    <Input
                      id="social_order"
                      type="number"
                      value={newSocialLink.display_order}
                      onChange={(e) => setNewSocialLink({
                        ...newSocialLink,
                        display_order: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>
                
                <Button onClick={addSocialLink} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Link Social
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Links Sociais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Links Sociais Existentes</h3>
              {socialLinks.map((link) => (
                <Card key={link.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{link.platform}</h4>
                        <p className="text-sm text-muted-foreground">{link.url}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{link.icon}</Badge>
                          <Badge variant="outline">{link.color}</Badge>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteSocialLink(link.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Soft Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Soft Skills</CardTitle>
                  <CardDescription>Habilidades interpessoais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {softSkills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">{skill.title}</h4>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tech Focus */}
              <Card>
                <CardHeader>
                  <CardTitle>Foco Técnico</CardTitle>
                  <CardDescription>Áreas de especialização técnica</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {techFocus.map((focus) => (
                    <div key={focus.id} className="p-3 border rounded">
                      <h4 className="font-medium">{focus.title}</h4>
                      <p className="text-sm text-muted-foreground">{focus.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {focus.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Experiências Profissionais</h3>
              {experiences.map((exp) => (
                <Card key={exp.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company} - {exp.location}</p>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                        <p className="text-sm mt-2">{exp.description}</p>
                        
                        <div className="mt-3">
                          <h5 className="font-medium text-sm">Principais Realizações:</h5>
                          <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {exp.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;