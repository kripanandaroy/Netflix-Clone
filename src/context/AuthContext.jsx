import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const loading = false;

  const signup = async (email, password, displayName) => {
    const newUser = {
      uid: Date.now().toString(),
      email,
      displayName: displayName || email.split('@')[0],
    };
    setUser(newUser);
    return { user: newUser };
  };

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Please enter email and password');
    const loggedUser = {
      uid: Date.now().toString(),
      email,
      displayName: email.split('@')[0],
    };
    setUser(loggedUser);
    return { user: loggedUser };
  };

  const loginWithGoogle = async () => {
    const googleUser = {
      uid: 'google-' + Date.now(),
      email: 'google@demo.com',
      displayName: 'Google User',
    };
    setUser(googleUser);
    return { user: googleUser };
  };

  const logout = () => setUser(null);

  const addToMyList = async (movie) => {};
  const removeFromMyList = async (movieId) => {};
  const getMyList = async () => [];

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      loginWithGoogle,
      logout,
      addToMyList,
      removeFromMyList,
      getMyList,
      isLoggedIn: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
