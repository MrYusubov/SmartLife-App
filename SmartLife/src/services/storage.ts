import AsyncStorage from '@react-native-async-storage/async-storage';
export const storage = {
  get: async <T>(key: string, fallback?: T): Promise<T | undefined> => {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  },
  set: async (key: string, value: any) => AsyncStorage.setItem(key, JSON.stringify(value)),
  del: async (key: string) => AsyncStorage.removeItem(key),
  clear: async () => AsyncStorage.clear(),
};
