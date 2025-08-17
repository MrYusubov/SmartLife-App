import React from 'react';
import { ScrollView, Text, View, Share } from 'react-native';
import Screen from '../../ui/Screen';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../ui/Button';

export default function NewsDetailScreen() {
  const { theme } = React.useContext(ThemeContext);
  const route = useRoute<RouteProp<any>>();
  const news = (route.params as any)?.news;

  if (!news) {
    return (
      <Screen>
        <Text style={{ color: theme.colors.text }}>Xəbər tapılmadı</Text>
      </Screen>
    );
  }

  async function onShare() {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.body.substring(0, 100)}...`,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Screen>
      <AppHeader title={news.title} subtitle="📰 Xəbər detalları" />

      <ScrollView
        contentContainerStyle={{ paddingVertical: theme.spacing.md, gap: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ color: theme.colors.text, fontSize: 16, lineHeight: 26 }}>
          {news.body}
        </Text>

        <View style={{ marginTop: theme.spacing.lg }}>
          <Button
            title="Paylaş"
            onPress={onShare}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
