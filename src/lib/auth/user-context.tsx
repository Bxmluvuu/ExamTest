'use client';

import * as React from 'react';
import type { Profile } from '@/lib/types/database';
import { createClient } from '@/lib/supabase/client';

interface UserContextValue {
  profile: Profile | null;
  displayName: string;
  isLoading: boolean;
  setProfile: (profile: Profile | null) => void;
  refreshProfile: () => Promise<void>;
}

const UserContext = React.createContext<UserContextValue>({
  profile: null,
  displayName: 'ผู้เรียน',
  isLoading: true,
  setProfile: () => {},
  refreshProfile: async () => {},
});

export function UserProvider({
  initialProfile,
  children,
}: {
  initialProfile?: Profile | null;
  children: React.ReactNode;
}) {
  const [profile, setProfileState] = React.useState<Profile | null>(initialProfile || null);
  const [isLoading, setIsLoading] = React.useState(!initialProfile);

  const refreshProfile = React.useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data?.profile) {
          setProfileState(data.profile);
        }
      } else {
        // Try Supabase client on browser
        const supabase = createClient();
        if (supabase) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'ผู้เรียน';
            setProfileState({
              id: user.id,
              email: user.email || '',
              full_name: fullName,
              role: (user.user_metadata?.role as any) || 'student',
              created_at: user.created_at || new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!initialProfile) {
      refreshProfile();
    } else {
      setProfileState(initialProfile);
      setIsLoading(false);
    }
  }, [initialProfile, refreshProfile]);

  const displayName = React.useMemo(() => {
    if (!profile) return 'ผู้เรียน';
    if (profile.full_name && profile.full_name.trim()) return profile.full_name.trim();
    if (profile.email) {
      const username = profile.email.split('@')[0];
      return username || 'ผู้เรียน';
    }
    return 'ผู้เรียน';
  }, [profile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        displayName,
        isLoading,
        setProfile: setProfileState,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  return context;
}
