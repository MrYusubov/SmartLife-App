import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/app/AppNavigator';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { initDatabase } from './src/services/db';
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(31761, '2yO6i7DdOlyvYJOmLgPFOl');
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold
  });

  useEffect(() => {
    initDatabase();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </ThemeProvider>
  );
}
