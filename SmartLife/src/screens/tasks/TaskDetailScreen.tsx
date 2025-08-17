import React from 'react';
import { Text, View } from 'react-native';
import Screen from '../../ui/Screen';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TaskDetailScreen() {
  const { theme } = React.useContext(ThemeContext);
  const route = useRoute<RouteProp<any>>();
  const task = (route.params as any)?.task;

  if (!task) return <Screen><Text>Tapşırıq tapılmadı</Text></Screen>;

  return (
    <Screen>
      <AppHeader title={task.title} />

      <View style={{ gap: theme.spacing.md }}>
        <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
          <Ionicons name="finger-print-outline" size={20} color={theme.colors.textMuted} />
          <Text style={{ color: theme.colors.text }}>ID: {task.id}</Text>
        </View>

        <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
          {task.done 
            ? <Ionicons name="checkmark-circle" size={22} color={theme.colors.success} /> 
            : <Ionicons name="close-circle" size={22} color={theme.colors.danger} />}
          <Text style={{ color: theme.colors.text }}>
            {task.done ? 'Görülüb' : 'Görülməyib'}
          </Text>
        </View>

        <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
          <MaterialIcons name="calendar-today" size={20} color={theme.colors.textMuted} />
          <Text style={{ color: theme.colors.text }}>
            {task.deadline || 'Son tarix təyin olunmayıb'}
          </Text>
        </View>
      </View>
    </Screen>
  );
}
