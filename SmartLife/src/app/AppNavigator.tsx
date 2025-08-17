import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TasksListScreen from '../screens/tasks/TasksListScreen';
import AddTaskScreen from '../screens/tasks/AddTaskScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import NotesListScreen from '../screens/notes/NotesListScreen';
import AddNoteScreen from '../screens/notes/AddNoteScreen';
import NoteDetailModal from '../screens/notes/NoteDetailModal';
import WeatherScreen from '../screens/weather/WeatherScreen';
import NewsListScreen from '../screens/news/NewsListScreen';
import NewsDetailScreen from '../screens/news/NewsDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TasksStack() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TasksList"
        component={TasksListScreen}
        options={({ navigation }) => ({
          title: 'Tapşırıqlar',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="AddTask" component={AddTaskScreen}
              options={({ navigation }) => ({
          title: 'Yeni tapşırıq',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        })} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} 
              options={({ navigation }) => ({
          title: 'Tapşırıq',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        })} />
    </Stack.Navigator>
  );
}


function NotesStack() {
    const { theme } = React.useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="NotesList" component={NotesListScreen}
              options={({ navigation }) => ({
          title: 'Qeydlər',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        })} />
      <Stack.Screen name="AddNote" component={AddNoteScreen} 
              options={({ navigation }) => ({
          title: 'Yeni qeyd',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        })} />
      <Stack.Screen name="NoteDetail" component={NoteDetailModal}
              options={({ navigation }) => ({
          presentation: 'modal',
          title: 'Qeyd',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        })} />
    </Stack.Navigator>
  );
}

function NewsStack() {
    const { theme } = React.useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewsList" component={NewsListScreen} 
              options={({ navigation }) => ({
          title: 'Xəbərlər',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        })} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} 
              options={({ navigation }) => ({
          title: 'Xəbər',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        })} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { mode } = React.useContext(ThemeContext);
  return (
    <NavigationContainer theme={mode === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Ana səhifə', headerShown:true }} />
        <Drawer.Screen name="Tasks" component={TasksStack} options={{ title: 'Tapşırıqlar' }} />
        <Drawer.Screen name="Notes" component={NotesStack} options={{ title: 'Qeydlər' }} />
        <Drawer.Screen name="Weather" component={WeatherScreen} options={{ title: 'Hava', headerShown:true  }} />
        <Drawer.Screen name="News" component={NewsStack} options={{ title: 'Xəbərlər' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil', headerShown:true  }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ayarlar', headerShown:true  }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
