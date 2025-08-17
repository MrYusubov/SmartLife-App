import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import Screen from '../ui/Screen';
import Card from '../ui/Card';
import Button from '../ui/Button';
import AppHeader from '../ui/AppHeader';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const nav = useNavigation<any>();
  const name = user?.name || 'İstifadəçi';

  const Avatar = () => {
    if (user?.avatar) {
      return (
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.card
        }}>
          <Text style={{ fontSize: 24 }}>{user.avatar}</Text>
        </View>
      );
    }
    return (
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.card
      }}>
        <Ionicons name="person-circle-outline" size={32} color={theme.colors.textMuted} />
      </View>
    );
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: theme.spacing.md, marginBottom: theme.spacing.md }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text }}>
          Salam, {name} 👋
        </Text>
        <Avatar />
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <View style={{ flexDirection:'row', gap: theme.spacing.md }}>
          <View style={{ flex:1 }}>
            <Card title="Tapşırıqlar" onPress={() => nav.navigate('Tasks')}>
              <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
                <Ionicons name="checkmark-done-circle-outline" size={20} color={theme.colors.primary} />
                <Text style={{ color: theme.colors.textMuted }}>Görüləcək işləri idarə et</Text>
              </View>
            </Card>
          </View>
          <View style={{ flex:1 }}>
            <Card title="Qeydlər" onPress={() => nav.navigate('Notes')}>
              <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
                <Feather name="file-text" size={20} color={theme.colors.primary} />
                <Text style={{ color: theme.colors.textMuted }}>Sürətli qeydlər və xatırlatma</Text>
              </View>
            </Card>
          </View>
        </View>

        <View style={{ flexDirection:'row', gap: theme.spacing.md }}>
          <View style={{ flex:1 }}>
            <Card title="Hava" onPress={() => nav.navigate('Weather')}>
              <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
                <Ionicons name="cloud-outline" size={20} color={theme.colors.primary} />
                <Text style={{ color: theme.colors.textMuted }}>Cari şəhər üçün proqnoz</Text>
              </View>
            </Card>
          </View>
          <View style={{ flex:1 }}>
            <Card title="Xəbərlər" onPress={() => nav.navigate('News')}>
              <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
                <MaterialCommunityIcons name="newspaper-variant-outline" size={20} color={theme.colors.primary} />
                <Text style={{ color: theme.colors.textMuted }}>Dünyadaki Ən Son Xəbərlər</Text>
              </View>
            </Card>
          </View>
        </View>

        <Card
          title="Sürətli hərəkətlər"
          footer={
            <Button
              title="Ayarlar"
              variant="secondary"
              onPress={() => nav.navigate('Settings')}
            />
          }
        >
          <View style={{ flexDirection:'row', gap: theme.spacing.md }}>
            <Button
              title="Yeni tapşırıq"
              onPress={() => nav.navigate('Tasks', { screen:'AddTask' })}
            />
            <Button
              title="Yeni qeyd"
              variant="ghost"
              onPress={() => nav.navigate('Notes', { screen:'AddNote' })}
            />
          </View>
        </Card>
      </View>
    </Screen>
  );
}
