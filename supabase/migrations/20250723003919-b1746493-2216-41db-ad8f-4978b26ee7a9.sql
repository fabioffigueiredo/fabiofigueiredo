-- Create tables for all editable content in the portfolio

-- Hero Section Data
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Fabio Figueiredo',
  role TEXT NOT NULL DEFAULT 'Programador Python Júnior',
  focus TEXT NOT NULL DEFAULT 'Data Science & AI',
  experience_years INTEGER NOT NULL DEFAULT 9,
  description TEXT NOT NULL DEFAULT 'Profissional em transição estratégica para Programação Python, Inteligência Artificial e Análise de Dados. Pós-graduando em IA, ML e Deep Learning na Infnet.',
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Social Links
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- About Section Data
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_title TEXT NOT NULL DEFAULT 'Sobre Mim',
  personal_story TEXT NOT NULL,
  support_experience TEXT NOT NULL,
  people_supported INTEGER NOT NULL DEFAULT 50,
  satisfaction_rate INTEGER NOT NULL DEFAULT 100,
  professional_goal TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Soft Skills
CREATE TABLE public.soft_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Technical Focus Areas
CREATE TABLE public.tech_focus (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  github_url TEXT NOT NULL,
  live_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Experience
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Education
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  achievements TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Skills (for dashboard)
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency_level INTEGER NOT NULL CHECK (proficiency_level >= 0 AND proficiency_level <= 100),
  icon TEXT,
  color TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soft_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_focus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio is public)
CREATE POLICY "Allow public read access" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.soft_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.tech_focus FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.education FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.skills FOR SELECT USING (true);

-- For now, allow anyone to edit (later can be restricted to admin users)
CREATE POLICY "Allow public write access" ON public.hero_content FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.social_links FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.about_content FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.soft_skills FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.tech_focus FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.experiences FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.education FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.skills FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON public.social_links FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_soft_skills_updated_at BEFORE UPDATE ON public.soft_skills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tech_focus_updated_at BEFORE UPDATE ON public.tech_focus FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON public.experiences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON public.education FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
-- Hero Content
INSERT INTO public.hero_content (name, role, focus, experience_years, description, profile_image_url) VALUES
('Fabio Figueiredo', 'Programador Python Júnior', 'Data Science & AI', 9, 'Profissional em transição estratégica para Programação Python, Inteligência Artificial e Análise de Dados. Pós-graduando em IA, ML e Deep Learning na Infnet.', 'https://raw.githubusercontent.com/fabioffigueiredo/-meu-curriculo-interativo/main/minha_foto.JPEG');

-- Social Links
INSERT INTO public.social_links (platform, url, icon, color, display_order) VALUES
('GitHub', 'https://github.com/fabioffigueiredo', 'Github', 'text-vs-blue', 1),
('LinkedIn', 'https://linkedin.com/in/fabio-figueiredo-295a8191', 'Linkedin', 'text-vs-cyan', 2),
('Email', 'mailto:fabioinformacao@gmail.com', 'Mail', 'text-vs-green', 3),
('WhatsApp', 'https://wa.me/5521964641561', 'MessageCircle', 'text-vs-yellow', 4);

-- About Content
INSERT INTO public.about_content (personal_story, support_experience, professional_goal) VALUES
('Com 9 anos de experiência em infraestrutura de TI, estou em uma transição estratégica para as áreas de Programação Python, Inteligência Artificial e Análise de Dados. Minha sólida base técnica e experiência com sistemas complexos me proporcionam um entendimento valioso para otimizar fluxos de dados e ambientes para implementação de soluções de IA. Atualmente, como Programador Júnior em Python, trabalho com foco em extração de dados de diversas fontes e uso de bibliotecas como Pandas para análise e processamento.',
'Tenho ampla experiência em comunicação e trabalho em equipe, tendo trabalhado apoiando mais de 50 pessoas em diferentes projetos e necessidades técnicas. Experiência em lidar com clientes internos e externos, desenvolvendo soluções personalizadas e mantendo relacionamentos profissionais duradouros.',
'Combinar minha expertise em infraestrutura com novas habilidades em Python e IA para desenvolver soluções inovadoras que transformem dados brutos em insights estratégicos e gerem valor real para organizações.');

-- Soft Skills
INSERT INTO public.soft_skills (title, description, icon, color, display_order) VALUES
('Comunicação Efetiva', 'Facilidade em me comunicar de forma clara e objetiva', 'MessageCircle', 'text-vs-blue', 1),
('Trabalho em Equipe', 'Experiência colaborativa em ambientes multidisciplinares', 'Users', 'text-vs-green', 2),
('Foco em Resultados', 'Orientação para entrega de soluções que agregam valor', 'Target', 'text-vs-purple', 3),
('Solução de Problemas', 'Capacidade analítica para resolver desafios complexos', 'Lightbulb', 'text-vs-orange', 4);

-- Tech Focus
INSERT INTO public.tech_focus (title, description, icon, technologies, display_order) VALUES
('Desenvolvimento Python', 'Foco em automações e análise de dados', 'Code', '{"Python", "Django", "FastAPI", "Pandas"}', 1),
('Análise de Dados', 'Extração de insights valiosos dos dados', 'Database', '{"SQL Server", "MariaDB", "Power BI", "Excel"}', 2),
('Inteligência Artificial', 'Estudos em ML e Deep Learning', 'Brain', '{"TensorFlow", "PyTorch", "Scikit-learn", "OpenAI"}', 3),
('Machine Learning', 'Algoritmos preditivos e classificação', 'Bot', '{"Regression", "Classification", "NLP", "Computer Vision"}', 4);