import React, { useEffect, useState } from 'react';
import { FlatList, Text, ActivityIndicator, View, Pressable } from 'react-native';
import Screen from '../../ui/Screen';
import Card from '../../ui/Card';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { api, NewsItem } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function NewsListScreen() {
  const { theme } = React.useContext(ThemeContext);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const nav = useNavigation<any>();

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    const newData = await api.newsList(page, 10);
    if (newData.length === 0) setHasMore(false);
    setNews(prev => [...prev, ...newData]);
    setPage(prev => prev + 1);
    setLoading(false);
  }

  useEffect(() => { loadMore(); }, []);

  return (
    <Screen>
      <AppHeader title="Xəbərlər" subtitle="Son paylaşılan xəbərlər" />

      <FlatList
        data={news}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
        contentContainerStyle={{ gap: theme.spacing.md, paddingBottom: theme.spacing.xl }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => nav.navigate('NewsDetail', { news: item })}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
          >
            <Card
              title={item.title}
              footer={
                <View style={{ flexDirection:'row', alignItems:'center', gap:6 }}>
                  <Ionicons name="newspaper-outline" size={18} color={theme.colors.textMuted} />
                  <Text style={{ color: theme.colors.textMuted, fontSize:12 }}>Ətraflı oxu</Text>
                </View>
              }
            >
              <Text numberOfLines={2} style={{ color: theme.colors.textMuted, fontSize:14 }}>
                {item.body}
              </Text>
            </Card>
          </Pressable>
        )}
      />
    </Screen>
  );
}
