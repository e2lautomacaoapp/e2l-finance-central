import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Phone, Mail, Save } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { supabase } from '@/integrations/supabase/client';

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
}

const Perfil = () => {
  const { user } = useAuth();
  const { userRole } = usePermissions();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfileData({
        full_name: data.full_name || '',
        email: data.email || user.email || '',
        phone: data.phone || '' // Now phone exists in the type
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar perfil.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          phone: profileData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Perfil atualizado com sucesso!',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar perfil.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (name: string, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin' ? 'bg-e2l-primary text-white' : 'bg-gray-100 text-gray-800';
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-e2l-primary">Meu Perfil</h1>
        <p className="text-gray-600">Gerencie suas informações pessoais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-e2l-primary text-white text-lg">
                  {getInitials(profileData.full_name, profileData.email)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <h3 className="font-medium">
                  {profileData.full_name || 'Nome não informado'}
                </h3>
                <p className="text-sm text-gray-500">{profileData.email}</p>
                {userRole && (
                  <Badge variant="secondary" className={getRoleBadgeColor(userRole)}>
                    {userRole === 'admin' ? 'Administrador' : 'Usuário'}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Editar Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="full_name"
                        type="text"
                        value={profileData.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        className="pl-8"
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        className="pl-8 bg-gray-50"
                        disabled
                        placeholder="Email não pode ser alterado"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-8"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-e2l-primary hover:bg-e2l-primary/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
