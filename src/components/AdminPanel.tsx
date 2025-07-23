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
import { Trash2, Plus, Save, RefreshCw, X, Lock } from 'lucide-react';

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

  const handleLogin = () => {
    if (loginEmail === 'fabioinformacao@gmail.com' && loginPassword === 'F@bi1984') {
      setIsAuthenticated(true);
      toast({
        title: 'Sucesso',
        description: 'Login realizado com sucesso',
      });
    } else {
      toast({
        title: 'Erro',
        description: 'Credenciais inválidas',
        variant: 'destructive',
      });
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
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground mt-2">
                Gerencie todos os conteúdos do seu portfólio
              </p>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">Painel em Desenvolvimento</h3>
                <p className="text-muted-foreground">
                  O sistema completo será carregado em instantes. Por enquanto, você pode verificar 
                  que a autenticação está funcionando corretamente!
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Login Autenticado ✓
                  </Badge>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;