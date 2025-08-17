import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Alert } from 'react-native';
import Screen from '../../ui/Screen';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { TasksRepo } from '../../services/db';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Task = { id:number; title:string; deadline?:string; done:number };

export default function TasksListScreen() {
  const { theme } = React.useContext(ThemeContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const nav = useNavigation<any>();

  async function load() {
    const all = await TasksRepo.all();
    setTasks(all);
  }
  useEffect(() => { const unsub = nav.addListener('focus', load); return unsub; }, [nav]);

  async function toggleDone(id:number, done:boolean) {
    await TasksRepo.toggle(id, done);
    load();
  }
  async function remove(id:number) {
    Alert.alert("Silinsin?", "Bu tapşırıq silinəcək", [
      { text:"Ləğv et", style:"cancel" },
      { text:"Sil", style:"destructive", onPress: async () => { await TasksRepo.remove(id); load(); } }
    ]);
  }

  return (
    <Screen>
      <AppHeader title="Tapşırıqlar" subtitle="Bütün tapşırıqlarını idarə et" />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign:'center', color:theme.colors.textMuted }}>
            Hələ tapşırıq yoxdur
          </Text>
        }
        renderItem={({item}) => (
          <Card
            title={item.title}
            footer={
              <View style={{ flexDirection:'row', gap:theme.spacing.sm }}>
                <Button
                  title={item.done ? "Görülüb" : "Tamamla"}
                  variant={item.done ? 'secondary' : 'primary'}
                  onPress={() => toggleDone(item.id, !item.done)}
                />
                <Button title="Sil" variant="ghost" onPress={() => remove(item.id)} />
              </View>
            }
            onPress={() => nav.navigate('TaskDetail', { task:item })}
          >
            <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
              {item.done 
                ? <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} /> 
                : <Ionicons name="ellipse-outline" size={20} color={theme.colors.textMuted} />}
              <Text style={{ color: theme.colors.textMuted }}>
                {item.deadline ? `Son tarix: ${item.deadline}` : "Tarix təyin olunmayıb"}
              </Text>
            </View>
          </Card>
        )}
      />

      <View style={{ marginTop: theme.spacing.lg }}>
        <Button title="Yeni Tapşırıq" full onPress={() => nav.navigate('AddTask')} />
      </View>
    </Screen>
  );
}
