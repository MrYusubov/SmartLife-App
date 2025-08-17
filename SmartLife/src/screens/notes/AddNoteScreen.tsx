import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Platform } from 'react-native';
import Screen from '../../ui/Screen';
import Button from '../../ui/Button';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { NotesRepo } from '../../services/notesRepo';
import { useNavigation } from '@react-navigation/native';
import { scheduleNoteReminder } from '../../services/notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddNoteScreen() {
  const { theme } = React.useContext(ThemeContext);
  const nav = useNavigation<any>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  const onChangeDateTime = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    if (pickerMode === 'date') {
      setPickerMode('time');
      if (Platform.OS === 'android') {
        setShowDatePicker(true);
      }
    } else {
      setPickerMode('date');
      const pad = (n: number) => n.toString().padStart(2, '0');

      const formattedDate =
        `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(currentDate.getDate())} ` +
        `${pad(currentDate.getHours())}:${pad(currentDate.getMinutes())}`;

      setReminder(formattedDate);
    }
  };

  const showDatepicker = () => {
    setPickerMode('date');
    setShowDatePicker(true);
  };

  async function save() {
    if (!title.trim()) return;
    const newNote = await NotesRepo.add({ title, content, reminder: reminder || undefined });
    if (reminder) {
      const [datePart, timePart] = reminder.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);

      const date = new Date(year, month - 1, day, hours, minutes);
      await scheduleNoteReminder(title, content, date);
    }


    nav.goBack();
  }


  return (
    <Screen>
      <AppHeader title="Yeni Qeyd" />
      <View style={{ gap: theme.spacing.md, padding: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radii.lg }}>
          <MaterialIcons name="title" size={24} color={theme.colors.text} style={{ marginLeft: 10 }} />
          <TextInput
            placeholder="Başlıq"
            value={title}
            onChangeText={setTitle}
            style={{ flex: 1, padding: 14, color: theme.colors.text }}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radii.lg }}>
          <MaterialIcons name="notes" size={24} color={theme.colors.text} style={{ marginLeft: 10, marginTop: 14 }} />
          <TextInput
            placeholder="Mətn"
            multiline
            value={content}
            onChangeText={setContent}
            style={{ flex: 1, padding: 14, color: theme.colors.text, minHeight: 120 }}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radii.lg }}>
          <MaterialIcons name="notifications" size={24} color={theme.colors.text} style={{ marginLeft: 10 }} />
          <TouchableOpacity onPress={showDatepicker} style={{ flex: 1 }}>
            <TextInput
              placeholder="Xatırlatma vaxtı (YYYY-MM-DD HH:mm)"
              value={reminder}
              editable={false}
              style={{ padding: 14, color: theme.colors.text }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDatepicker} style={{ padding: 10 }}>
            <MaterialIcons name="calendar-today" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode={pickerMode}
            is24Hour={true}
            display="default"
            onChange={onChangeDateTime}
          />
        )}

        <Button
          title="Yadda saxla"
          onPress={save}

        />
      </View>
    </Screen>
  );
}