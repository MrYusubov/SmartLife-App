import React, { useContext, useState } from 'react';
import { TextInput, View, Text, Pressable, FlatList } from 'react-native';
import Screen from '../../ui/Screen';
import AppHeader from '../../ui/AppHeader';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';

const emojiOptions = ["😀","😎","🤓","👩‍💻","👨‍💻","🧑‍🚀","🧑‍🎨","🦸‍♂️","🦸‍♀️"];

export default function ProfileScreen() {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState(user.name || "");
  const [surname, setSurname] = useState(user.surname || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState(user.avatar || "😀");

  function save() {
    setUser({ name, surname, bio, avatar });
  }

  return (
    <Screen>
      <AppHeader title="Profil" subtitle="Məlumatlarını redaktə et" />

      <Card title="Şəxsi məlumat">
        <View style={{ gap: theme.spacing.md }}>
          <TextInput
            placeholder="Ad"
            value={name}
            onChangeText={setName}
            style={{
              borderWidth:1, borderColor:theme.colors.border,
              borderRadius:theme.radii.lg, padding:14,
              color:theme.colors.text
            }}
          />
          <TextInput
            placeholder="Soyad"
            value={surname}
            onChangeText={setSurname}
            style={{
              borderWidth:1, borderColor:theme.colors.border,
              borderRadius:theme.radii.lg, padding:14,
              color:theme.colors.text
            }}
          />
          <TextInput
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
            multiline
            style={{
              borderWidth:1, borderColor:theme.colors.border,
              borderRadius:theme.radii.lg, padding:14,
              color:theme.colors.text,
              minHeight:80
            }}
          />
        </View>
      </Card>

      <Card title="Avatar seç">
        <FlatList
          horizontal
          data={emojiOptions}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <Pressable
              onPress={() => setAvatar(item)}
              style={{
                padding:14,
                borderRadius:theme.radii.lg,
                backgroundColor: avatar === item ? theme.colors.primary : theme.colors.cardAlt,
                marginRight:theme.spacing.sm
              }}
            >
              <Text style={{ fontSize:28 }}>{item}</Text>
            </Pressable>
          )}
        />
        <Text style={{ marginTop: theme.spacing.sm, color: theme.colors.text }}>
          Seçilmiş avatar: {avatar}
        </Text>
      </Card>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Button title="Yadda saxla" full onPress={save} />
      </View>
    </Screen>
  );
}
