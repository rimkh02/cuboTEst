import { createContext, useEffect, useCallback } from 'react';
// utils
import { setSession } from './utils';
// types
import { JWTContextType } from './types';
// redux
import { getUserFetch, init } from 'src/redux/slices/auth';
import { useDispatch, useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------
enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  reset = 'reset',
}

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isInitialized, user, temporal } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();

  const initialize = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('_token') : '';

      if (accessToken) {
        setSession(accessToken);
        dispatch(init({ isAuthenticated: true, user, temporal: false }));
        if (temporal) {
          dispatch(init({ isAuthenticated: true, user, temporal: true }));
        }
      } else {
        dispatch(init({ isAuthenticated: false, user: null, temporal: false }));
      }
    } catch (error) {
      console.error(error);
      dispatch(init({ isAuthenticated: false, user: null, temporal: false }));
    }
  }, [dispatch, temporal, user]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (email: string, password: string, navigate: any) => {
    dispatch(
      getUserFetch({
        email: email,
        password: password,
        navigate: navigate,
      })
    );
  };

  // REGISTER
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {};

  // LOGOUT
  const logout = async () => {
    setSession(null);

    dispatch({
      type: Types.LOGOUT,
    });

    dispatch(init({ isAuthenticated: false, user: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        isInitialized: isInitialized,
        user: user,
        method: 'jwt',
        login,
        loginWithGoogle: () => {},
        loginWithGithub: () => {},
        loginWithTwitter: () => {},
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
