import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { name?: string; surname?: string; bio?: string; avatar?: string; };
type Ctx = { user: User; setUser: (u: User) => void; };
export const UserContext = createContext<Ctx>({ user: {}, setUser: () => {} });

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUserState] = useState<User>({});

  useEffect(() => { (async () => {
    const raw = await AsyncStorage.getItem('@user');
    if (raw) setUserState(JSON.parse(raw));
  })(); }, []);

  const setUser = (u: User) => {
    setUserState(u);
    AsyncStorage.setItem('@user', JSON.stringify(u));
  };

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
