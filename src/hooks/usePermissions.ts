
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const usePermissions = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        // Use a raw SQL query to get user role since the table might not be in types yet
        const { data, error } = await supabase.rpc('get_user_role' as any, {
          _user_id: user.id
        });

        if (error) {
          console.error('Error fetching user role:', error);
          setUserRole('user'); // Default to user role
        } else {
          setUserRole(data as 'admin' | 'user');
        }
      } catch (error) {
        console.error('Error:', error);
        setUserRole('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const isAdmin = () => userRole === 'admin';
  const isUser = () => userRole === 'user';

  return {
    userRole,
    isAdmin,
    isUser,
    loading
  };
};
