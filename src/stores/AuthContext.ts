import { createContext, Dispatch, SetStateAction } from 'react';
import { LoginFormType, User } from '@/types/auth/auth';

export interface AuthContextProp {
  userInfo: User | null;
  isSignInLoading: boolean;
  isSignUpLoading: boolean;
  setUserInfo: Dispatch<SetStateAction<User | null>>;
  setIsSignUpLoading: Dispatch<SetStateAction<boolean>>;
  signIn: ({ email, password }: LoginFormType) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProp>({
  userInfo: null,
  isSignInLoading: false,
  isSignUpLoading: false,
  setUserInfo: () => {},
  setIsSignUpLoading: () => {},
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
});

export default AuthContext;
