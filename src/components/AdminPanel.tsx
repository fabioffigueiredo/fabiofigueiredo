import { useState, useEffect } from 'react';
import { X, Plus, Trash2, BookOpen, Briefcase, Award, FolderOpen, Edit2, User, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from "@/components/ui/use-toast"

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Skill {
  id: string;
  name: string;
  percentage: number;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', percentage: 0 });
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [editSkillData, setEditSkillData] = useState({ name: '', percentage: 0 });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [editingExperience, setEditingExperience] = useState<string | null>(null);
  const [editExperienceData, setEditExperienceData] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [education, setEducation] = useState<Education[]>([]);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [editingEducation, setEditingEducation] = useState<string | null>(null);
  const [editEducationData, setEditEducationData] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  
  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    githubUrl: '',
    liveUrl: '',
    technologies: [] as string[],
    stars: 0,
    forks: 0
  });
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editProjectData, setEditProjectData] = useState({
    name: '',
    description: '',
    githubUrl: '',
    liveUrl: '',
    technologies: [] as string[],
    stars: 0,
    forks: 0
  });

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    title: '',
    description: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
  });

  useEffect(() => {
    // Load skills
    const savedSkills = localStorage.getItem('portfolioSkills');
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }

    // Load experiences
    const savedExperiences = localStorage.getItem('portfolioExperiences');
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences));
    }

    // Load education
    const savedEducation = localStorage.getItem('portfolioEducation');
    if (savedEducation) {
      setEducation(JSON.parse(savedEducation));
    }

    // Load personal info
    const savedPersonalInfo = localStorage.getItem('portfolioPersonalInfo');
    if (savedPersonalInfo) {
      setPersonalInfo(JSON.parse(savedPersonalInfo));
    }
  }, []);

  // Load projects
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const addSkill = () => {
    if (newSkill.name && newSkill.percentage >= 0 && newSkill.percentage <= 100) {
      const skill = { ...newSkill, id: Date.now().toString() };
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      localStorage.setItem('portfolioSkills', JSON.stringify(updatedSkills));
      setNewSkill({ name: '', percentage: 0 });
       toast({
        title: "Skill adicionada!",
        description: "A skill foi adicionada com sucesso.",
      });
    }
  };

  const deleteSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    localStorage.setItem('portfolioSkills', JSON.stringify(updatedSkills));
     toast({
        title: "Skill removida!",
        description: "A skill foi removida com sucesso.",
      });
  };

  const startEditingSkill = (skill: Skill) => {
    setEditingSkill(skill.id);
    setEditSkillData({ name: skill.name, percentage: skill.percentage });
  };

  const saveSkillEdit = () => {
    if (editingSkill) {
      const updatedSkills = skills.map(skill =>
        skill.id === editingSkill 
          ? { ...skill, name: editSkillData.name, percentage: editSkillData.percentage }
          : skill
      );
      setSkills(updatedSkills);
      localStorage.setItem('portfolioSkills', JSON.stringify(updatedSkills));
      setEditingSkill(null);
      toast({
        title: "Skill atualizada!",
        description: "A skill foi atualizada com sucesso.",
      });
    }
  };

  const cancelSkillEdit = () => {
    setEditingSkill(null);
    setEditSkillData({ name: '', percentage: 0 });
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.startDate && newExperience.endDate && newExperience.description) {
      const experience = { ...newExperience, id: Date.now().toString() };
      const updatedExperiences = [...experiences, experience];
      setExperiences(updatedExperiences);
      localStorage.setItem('portfolioExperiences', JSON.stringify(updatedExperiences));
      setNewExperience({ title: '', company: '', startDate: '', endDate: '', description: '' });
       toast({
        title: "Experiência adicionada!",
        description: "A experiência foi adicionada com sucesso.",
      });
    }
  };

  const deleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter(experience => experience.id !== id);
    setExperiences(updatedExperiences);
    localStorage.setItem('portfolioExperiences', JSON.stringify(updatedExperiences));
     toast({
        title: "Experiência removida!",
        description: "A experiência foi removida com sucesso.",
      });
  };

  const startEditingExperience = (experience: Experience) => {
    setEditingExperience(experience.id);
    setEditExperienceData({
      title: experience.title,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
    });
  };

  const saveExperienceEdit = () => {
    if (editingExperience) {
      const updatedExperiences = experiences.map(exp =>
        exp.id === editingExperience ? { ...exp, ...editExperienceData } : exp
      );
      setExperiences(updatedExperiences);
      localStorage.setItem('portfolioExperiences', JSON.stringify(updatedExperiences));
      setEditingExperience(null);
      toast({
        title: "Experiência atualizada!",
        description: "A experiência foi atualizada com sucesso.",
      });
    }
  };

  const cancelExperienceEdit = () => {
    setEditingExperience(null);
    setEditExperienceData({ title: '', company: '', startDate: '', endDate: '', description: '' });
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree && newEducation.startDate && newEducation.endDate && newEducation.description) {
      const educationItem = { ...newEducation, id: Date.now().toString() };
      const updatedEducation = [...education, educationItem];
      setEducation(updatedEducation);
      localStorage.setItem('portfolioEducation', JSON.stringify(updatedEducation));
      setNewEducation({ institution: '', degree: '', startDate: '', endDate: '', description: '' });
       toast({
        title: "Educação adicionada!",
        description: "A educação foi adicionada com sucesso.",
      });
    }
  };

  const deleteEducation = (id: string) => {
    const updatedEducation = education.filter(educationItem => educationItem.id !== id);
    setEducation(updatedEducation);
    localStorage.setItem('portfolioEducation', JSON.stringify(updatedEducation));
     toast({
        title: "Educação removida!",
        description: "A educação foi removida com sucesso.",
      });
  };

  const startEditingEducation = (educationItem: Education) => {
    setEditingEducation(educationItem.id);
    setEditEducationData({
      institution: educationItem.institution,
      degree: educationItem.degree,
      startDate: educationItem.startDate,
      endDate: educationItem.endDate,
      description: educationItem.description,
    });
  };

  const saveEducationEdit = () => {
    if (editingEducation) {
      const updatedEducation = education.map(edu =>
        edu.id === editingEducation ? { ...edu, ...editEducationData } : edu
      );
      setEducation(updatedEducation);
      localStorage.setItem('portfolioEducation', JSON.stringify(updatedEducation));
      setEditingEducation(null);
      toast({
        title: "Educação atualizada!",
        description: "A educação foi atualizada com sucesso.",
      });
    }
  };

  const cancelEducationEdit = () => {
    setEditingEducation(null);
    setEditEducationData({ institution: '', degree: '', startDate: '', endDate: '', description: '' });
  };

  // Project functions
  const addProject = () => {
    if (newProject.name && newProject.description && newProject.githubUrl) {
      const project = {
        ...newProject,
        id: Date.now().toString(),
        technologies: newProject.technologies.filter(tech => tech.trim() !== '')
      };
      const updatedProjects = [...projects, project];
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      setNewProject({
        name: '',
        description: '',
        githubUrl: '',
        liveUrl: '',
        technologies: [],
        stars: 0,
        forks: 0
      });
      toast({
        title: "Projeto adicionado!",
        description: "O projeto foi adicionado com sucesso.",
      });
    }
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    toast({
      title: "Projeto removido!",
      description: "O projeto foi removido com sucesso.",
    });
  };

  const startEditingProject = (project: any) => {
    setEditingProject(project.id);
    setEditProjectData({
      name: project.name,
      description: project.description,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      technologies: [...project.technologies],
      stars: project.stars,
      forks: project.forks,
    });
  };

  const saveProjectEdit = () => {
    if (editingProject) {
      const updatedProjects = projects.map(proj =>
        proj.id === editingProject ? { ...proj, ...editProjectData } : proj
      );
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      setEditingProject(null);
      toast({
        title: "Projeto atualizado!",
        description: "O projeto foi atualizado com sucesso.",
      });
    }
  };

  const cancelProjectEdit = () => {
    setEditingProject(null);
    setEditProjectData({
      name: '',
      description: '',
      githubUrl: '',
      liveUrl: '',
      technologies: [],
      stars: 0,
      forks: 0
    });
  };

  const savePersonalInfo = () => {
    localStorage.setItem('portfolioPersonalInfo', JSON.stringify(personalInfo));
    toast({
      title: "Informações salvas!",
      description: "As informações pessoais foram salvas com sucesso.",
    });
  };

  const addTechnologyToProject = () => {
    setNewProject({
      ...newProject,
      technologies: [...newProject.technologies, '']
    });
  };

  const updateProjectTechnology = (index: number, value: string) => {
    const updatedTechnologies = [...newProject.technologies];
    updatedTechnologies[index] = value;
    setNewProject({
      ...newProject,
      technologies: updatedTechnologies
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-card/50">
          <div className="flex items-center justify-between">
            <div className="syntax-highlight">
              <h2 className="text-2xl font-bold">
                <span className="syntax-blue">class</span>{' '}
                <span className="syntax-yellow">AdminPanel</span>{' '}
                <span className="syntax-purple">{'{'}</span>
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border bg-card/30">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'personal', label: 'Pessoal', icon: User },
              { id: 'skills', label: 'Skills', icon: BookOpen },
              { id: 'projects', label: 'Projetos', icon: FolderOpen },
              { id: 'experience', label: 'Experiência', icon: Briefcase },
              { id: 'education', label: 'Educação', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`syntax-highlight ${
                    activeTab === tab.id 
                      ? 'bg-vs-blue/20 text-vs-blue border border-vs-blue/30' 
                      : 'hover:bg-secondary/80'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="syntax-purple">{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="syntax-highlight">
                <h3 className="text-lg font-semibold mb-4">
                  <span className="syntax-green">// Informações Pessoais</span>
                </h3>
              </div>

              <Card className="p-4 border-vs-blue/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="personal-name">Nome Completo</Label>
                    <Input
                      id="personal-name"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="personal-title">Título/Cargo</Label>
                    <Input
                      id="personal-title"
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                      placeholder="Ex: Desenvolvedor Full Stack"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="personal-description">Descrição</Label>
                    <Textarea
                      id="personal-description"
                      value={personalInfo.description}
                      onChange={(e) => setPersonalInfo({...personalInfo, description: e.target.value})}
                      placeholder="Breve descrição sobre você"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="personal-email">E-mail</Label>
                    <Input
                      id="personal-email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="personal-phone">Telefone</Label>
                    <Input
                      id="personal-phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <Label htmlFor="personal-location">Localização</Label>
                    <Input
                      id="personal-location"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                      placeholder="Cidade, Estado"
                    />
                  </div>

                  <div>
                    <Label htmlFor="personal-github">GitHub</Label>
                    <Input
                      id="personal-github"
                      value={personalInfo.github}
                      onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                      placeholder="https://github.com/usuario"
                    />
                  </div>

                  <div>
                    <Label htmlFor="personal-linkedin">LinkedIn</Label>
                    <Input
                      id="personal-linkedin"
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/in/usuario"
                    />
                  </div>
                </div>

                <Button onClick={savePersonalInfo} className="w-full mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Informações Pessoais
                </Button>
              </Card>
            </div>
          )}
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="syntax-highlight">
                <h3 className="text-lg font-semibold mb-4">
                  <span className="syntax-green">// Gerenciar Projetos</span>
                </h3>
              </div>

              {/* Add New Project */}
              <Card className="p-4 border-vs-blue/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-name">Nome do Projeto</Label>
                    <Input
                      id="project-name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      placeholder="Nome do projeto"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="project-github">URL do GitHub</Label>
                    <Input
                      id="project-github"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                      placeholder="https://github.com/usuario/projeto"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="project-description">Descrição</Label>
                    <Textarea
                      id="project-description"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="Descrição do projeto"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="project-live">URL Demo (opcional)</Label>
                    <Input
                      id="project-live"
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                      placeholder="https://projeto-demo.com"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Label htmlFor="project-stars">Stars</Label>
                      <Input
                        id="project-stars"
                        type="number"
                        value={newProject.stars}
                        onChange={(e) => setNewProject({...newProject, stars: Number(e.target.value)})}
                        placeholder="0"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="project-forks">Forks</Label>
                      <Input
                        id="project-forks"
                        type="number"
                        value={newProject.forks}
                        onChange={(e) => setNewProject({...newProject, forks: Number(e.target.value)})}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label>Tecnologias</Label>
                    <div className="space-y-2">
                      {newProject.technologies.map((tech, index) => (
                        <div key={index} className="flex space-x-2">
                          <Input
                            value={tech}
                            onChange={(e) => updateProjectTechnology(index, e.target.value)}
                            placeholder="Nome da tecnologia"
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updatedTechnologies = newProject.technologies.filter((_, i) => i !== index);
                              setNewProject({...newProject, technologies: updatedTechnologies});
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addTechnologyToProject}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Tecnologia
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={addProject} className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Projeto
                </Button>
              </Card>

              {/* Projects List */}
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="p-4">
                    {editingProject === project.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Nome do Projeto</Label>
                            <Input
                              value={editProjectData.name}
                              onChange={(e) => setEditProjectData({...editProjectData, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>GitHub URL</Label>
                            <Input
                              value={editProjectData.githubUrl}
                              onChange={(e) => setEditProjectData({...editProjectData, githubUrl: e.target.value})}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Descrição</Label>
                            <Textarea
                              value={editProjectData.description}
                              onChange={(e) => setEditProjectData({...editProjectData, description: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>URL Demo</Label>
                            <Input
                              value={editProjectData.liveUrl}
                              onChange={(e) => setEditProjectData({...editProjectData, liveUrl: e.target.value})}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <div className="flex-1">
                              <Label>Stars</Label>
                              <Input
                                type="number"
                                value={editProjectData.stars}
                                onChange={(e) => setEditProjectData({...editProjectData, stars: Number(e.target.value)})}
                              />
                            </div>
                            <div className="flex-1">
                              <Label>Forks</Label>
                              <Input
                                type="number"
                                value={editProjectData.forks}
                                onChange={(e) => setEditProjectData({...editProjectData, forks: Number(e.target.value)})}
                              />
                            </div>
                          </div>
                          <div className="col-span-2">
                            <Label>Tecnologias</Label>
                            <div className="space-y-2">
                              {editProjectData.technologies.map((tech, index) => (
                                <div key={index} className="flex space-x-2">
                                  <Input
                                    value={tech}
                                    onChange={(e) => {
                                      const updatedTechs = [...editProjectData.technologies];
                                      updatedTechs[index] = e.target.value;
                                      setEditProjectData({...editProjectData, technologies: updatedTechs});
                                    }}
                                    className="flex-1"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const updatedTechs = editProjectData.technologies.filter((_, i) => i !== index);
                                      setEditProjectData({...editProjectData, technologies: updatedTechs});
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                onClick={() => setEditProjectData({
                                  ...editProjectData,
                                  technologies: [...editProjectData.technologies, '']
                                })}
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar Tecnologia
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={saveProjectEdit} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </Button>
                          <Button onClick={cancelProjectEdit} variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-vs-yellow">{project.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech: string) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded bg-vs-blue/10 text-vs-blue"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-vs-blue">
                              GitHub
                            </a>
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-vs-green">
                                Demo
                              </a>
                            )}
                            <span>⭐ {project.stars}</span>
                            <span>🍴 {project.forks}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditingProject(project)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteProject(project.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="syntax-highlight">
                <h3 className="text-lg font-semibold mb-4">
                  <span className="syntax-green">// Gerenciar Skills</span>
                </h3>
              </div>

              {/* Add New Skill */}
              <Card className="p-4 border-vs-blue/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="skill-name">Nome da Skill</Label>
                    <Input
                      id="skill-name"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="Nome da skill"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skill-percentage">Porcentagem</Label>
                    <Input
                      id="skill-percentage"
                      type="number"
                      value={newSkill.percentage}
                      onChange={(e) =>
                        setNewSkill({ ...newSkill, percentage: Number(e.target.value) })
                      }
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <Button onClick={addSkill} className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Skill
                </Button>
              </Card>

              {/* Skills List */}
              <div className="space-y-4">
                {skills.map((skill) => (
                  <Card key={skill.id} className="p-4">
                    {editingSkill === skill.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Nome da Skill</Label>
                            <Input
                              value={editSkillData.name}
                              onChange={(e) => setEditSkillData({...editSkillData, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Porcentagem</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={editSkillData.percentage}
                              onChange={(e) => setEditSkillData({...editSkillData, percentage: Number(e.target.value)})}
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={saveSkillEdit} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </Button>
                          <Button onClick={cancelSkillEdit} variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-vs-yellow">{skill.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {skill.percentage}% de proficiência
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditingSkill(skill)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteSkill(skill.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="syntax-highlight">
                <h3 className="text-lg font-semibold mb-4">
                  <span className="syntax-green">// Gerenciar Experiências</span>
                </h3>
              </div>

              {/* Add New Experience */}
              <Card className="p-4 border-vs-blue/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience-title">Título</Label>
                    <Input
                      id="experience-title"
                      value={newExperience.title}
                      onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                      placeholder="Título da experiência"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-company">Empresa</Label>
                    <Input
                      id="experience-company"
                      value={newExperience.company}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, company: e.target.value })
                      }
                      placeholder="Nome da empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-start-date">Data de Início</Label>
                    <Input
                      id="experience-start-date"
                      type="date"
                      value={newExperience.startDate}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-end-date">Data de Término</Label>
                    <Input
                      id="experience-end-date"
                      type="date"
                      value={newExperience.endDate}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, endDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="experience-description">Descrição</Label>
                    <Textarea
                      id="experience-description"
                      value={newExperience.description}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, description: e.target.value })
                      }
                      placeholder="Descrição da experiência"
                      rows={3}
                    />
                  </div>
                </div>
                <Button onClick={addExperience} className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Experiência
                </Button>
              </Card>

              {/* Experiences List */}
              <div className="space-y-4">
                {experiences.map((experience) => (
                  <Card key={experience.id} className="p-4">
                    {editingExperience === experience.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Título</Label>
                            <Input
                              value={editExperienceData.title}
                              onChange={(e) => setEditExperienceData({...editExperienceData, title: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Empresa</Label>
                            <Input
                              value={editExperienceData.company}
                              onChange={(e) => setEditExperienceData({...editExperienceData, company: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Data Início</Label>
                            <Input
                              type="date"
                              value={editExperienceData.startDate}
                              onChange={(e) => setEditExperienceData({...editExperienceData, startDate: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Data Fim</Label>
                            <Input
                              type="date"
                              value={editExperienceData.endDate}
                              onChange={(e) => setEditExperienceData({...editExperienceData, endDate: e.target.value})}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Descrição</Label>
                            <Textarea
                              value={editExperienceData.description}
                              onChange={(e) => setEditExperienceData({...editExperienceData, description: e.target.value})}
                              rows={3}
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={saveExperienceEdit} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </Button>
                          <Button onClick={cancelExperienceEdit} variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-vs-yellow">{experience.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{experience.company}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEditingExperience(experience)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteExperience(experience.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {experience.startDate} - {experience.endDate}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{experience.description}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="syntax-highlight">
                <h3 className="text-lg font-semibold mb-4">
                  <span className="syntax-green">// Gerenciar Formação Acadêmica</span>
                </h3>
              </div>

              {/* Add New Education */}
              <Card className="p-4 border-vs-blue/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="education-institution">Instituição</Label>
                    <Input
                      id="education-institution"
                      value={newEducation.institution}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, institution: e.target.value })
                      }
                      placeholder="Nome da instituição"
                    />
                  </div>
                  <div>
                    <Label htmlFor="education-degree">Grau Acadêmico</Label>
                    <Input
                      id="education-degree"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      placeholder="Grau acadêmico"
                    />
                  </div>
                  <div>
                    <Label htmlFor="education-start-date">Data de Início</Label>
                    <Input
                      id="education-start-date"
                      type="date"
                      value={newEducation.startDate}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="education-end-date">Data de Término</Label>
                    <Input
                      id="education-end-date"
                      type="date"
                      value={newEducation.endDate}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, endDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="education-description">Descrição</Label>
                    <Textarea
                      id="education-description"
                      value={newEducation.description}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, description: e.target.value })
                      }
                      placeholder="Descrição da formação acadêmica"
                      rows={3}
                    />
                  </div>
                </div>
                <Button onClick={addEducation} className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Formação
                </Button>
              </Card>

              {/* Education List */}
              <div className="space-y-4">
                {education.map((educationItem) => (
                  <Card key={educationItem.id} className="p-4">
                    {editingEducation === educationItem.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Instituição</Label>
                            <Input
                              value={editEducationData.institution}
                              onChange={(e) => setEditEducationData({...editEducationData, institution: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Grau</Label>
                            <Input
                              value={editEducationData.degree}
                              onChange={(e) => setEditEducationData({...editEducationData, degree: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Data Início</Label>
                            <Input
                              type="date"
                              value={editEducationData.startDate}
                              onChange={(e) => setEditEducationData({...editEducationData, startDate: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Data Fim</Label>
                            <Input
                              type="date"
                              value={editEducationData.endDate}
                              onChange={(e) => setEditEducationData({...editEducationData, endDate: e.target.value})}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Descrição</Label>
                            <Textarea
                              value={editEducationData.description}
                              onChange={(e) => setEditEducationData({...editEducationData, description: e.target.value})}
                              rows={3}
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={saveEducationEdit} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </Button>
                          <Button onClick={cancelEducationEdit} variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-vs-yellow">{educationItem.degree}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {educationItem.institution}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEditingEducation(educationItem)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteEducation(educationItem.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {educationItem.startDate} - {educationItem.endDate}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {educationItem.description}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-card/50">
          <div className="syntax-highlight text-center">
            <span className="syntax-purple">{'}'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
