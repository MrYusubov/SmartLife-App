import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Screen from '../../ui/Screen';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NotesRepo, Note } from '../../services/notesRepo';
import { MaterialIcons } from '@expo/vector-icons';

export default function NoteDetailModal() {
  const { theme } = React.useContext(ThemeContext);
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const [note, setNote] = useState<Note | undefined>();

  useEffect(() => {
    (async () => {
      if (route.params?.id) {
        const n = await NotesRepo.get(route.params.id);
        setNote(n);
      }
    })();
  }, [route.params?.id]);

  if (!note) return (
    <Screen>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <MaterialIcons name="error-outline" size={48} color={theme.colors.textMuted} />
        <Text style={{ color: theme.colors.text, marginTop: 16 }}>Qeyd tapılmadı</Text>
      </View>
    </Screen>
  );

  return (
    <Screen>
      <AppHeader 
        title={note.title}
      />
      <View style={{ padding: theme.spacing.md, gap: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="description" size={24} color={theme.colors.text} />
          <Text style={{ 
            color: theme.colors.text, 
            marginLeft: 16,
            fontSize: 16,
            lineHeight: 24
          }}>
            {note.content || 'Mətn yoxdur'}
          </Text>
        </View>
        
        {note.reminder && (
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            backgroundColor: theme.colors.card,
            padding: 12,
            borderRadius: theme.radii.md
          }}>
            <MaterialIcons name="notifications-active" size={24} color={theme.colors.primary} />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>Xatırlatma</Text>
              <Text style={{ color: theme.colors.text }}>{note.reminder}</Text>
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}