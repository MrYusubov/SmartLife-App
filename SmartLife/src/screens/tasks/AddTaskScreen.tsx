import React, { useState } from 'react';
import { TextInput, View, Pressable, Text, Platform } from 'react-native';
import Screen from '../../ui/Screen';
import Button from '../../ui/Button';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { TasksRepo } from '../../services/db';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function AddTaskScreen() {
  const { theme } = React.useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const nav = useNavigation<any>();

  async function save() {
    if (!title.trim()) return;
    await TasksRepo.add(
      title,
      deadline ? deadline.toISOString().split('T')[0] : undefined
    );
    nav.goBack();
  }

  return (
    <Screen>
      <AppHeader title="Yeni Tapşırıq" />

      <View style={{ gap: theme.spacing.md }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
          paddingHorizontal: 12,
        }}>
          <Ionicons name="clipboard-outline" size={22} color={theme.colors.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Başlıq"
            value={title}
            onChangeText={setTitle}
            style={{ flex: 1, paddingVertical: 12, color: theme.colors.text }}
          />
        </View>

        <Pressable
          onPress={() => setShowPicker(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radii.lg,
            paddingHorizontal: 12,
            paddingVertical: 14,
          }}
        >
          <Ionicons name="calendar-outline" size={22} color={theme.colors.textMuted} style={{ marginRight: 8 }} />
          <Text style={{ color: deadline ? theme.colors.text : theme.colors.textMuted }}>
            {deadline ? deadline.toDateString() : 'Son tarix seç'}
          </Text>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={deadline || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selected) => {
              setShowPicker(false);
              if (selected) setDeadline(selected);
            }}
          />
        )}

        <Button title="Yadda saxla" onPress={save} />
      </View>
    </Screen>
  );
}
