import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Alert, TouchableOpacity } from 'react-native';
import Screen from '../../ui/Screen';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { NotesRepo, Note } from '../../services/notesRepo';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NotesListScreen() {
  const { theme } = React.useContext(ThemeContext);
  const nav = useNavigation<any>();
  const [notes, setNotes] = useState<Note[]>([]);

  async function load() {
    setNotes(await NotesRepo.all());
  }

  useEffect(() => {
    const unsub = nav.addListener('focus', load);
    return unsub;
  }, [nav]);

  async function remove(id: string) {
    Alert.alert("Silinsin?", "Bu qeyd silinəcək", [
      { text:"Ləğv et", style:"cancel" },
      { text:"Sil", style:"destructive", onPress: async () => {
        await NotesRepo.remove(id);
        load();
      }}
    ]);
  }

  return (
    <Screen>
      <AppHeader 
        title="Qeydlər" 
        subtitle="Sürətli qeydlər və xatırlatmalar"
      />
      <FlatList
        data={notes}
        keyExtractor={n => n.id}
        contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', padding: 20 }}>
            <MaterialIcons name="note-add" size={48} color={theme.colors.textMuted} />
            <Text style={{ textAlign:'center', color:theme.colors.textMuted, marginTop: 10 }}>
              Hələ qeyd yoxdur
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <Card
            title={item.title}
            onPress={() => nav.navigate('NoteDetail', { id: item.id })}
            footer={
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => remove(item.id)}>
                  <MaterialIcons name="delete" size={24} color={theme.colors.danger} />
                </TouchableOpacity>
              </View>
            }
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <MaterialIcons name="description" size={18} color={theme.colors.textMuted} />
              <Text style={{ color: theme.colors.textMuted, marginLeft: 8 }} numberOfLines={2}>
                {item.content || 'Mətn yoxdur'}
              </Text>
            </View>
            {item.reminder && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="notifications" size={18} color={theme.colors.text} />
                <Text style={{ color: theme.colors.text, marginLeft: 8 }}>
                  {item.reminder}
                </Text>
              </View>
            )}
          </Card>
        )}
      />
      <View style={{ marginTop: theme.spacing.lg }}>
        <Button 
          title="Yeni Qeyd" 
          full 
          onPress={() => nav.navigate('AddNote')}
        />
      </View>
    </Screen>
  );
}