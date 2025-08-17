import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import Screen from '../../ui/Screen';
import Button from '../../ui/Button';
import AppHeader from '../../ui/AppHeader';
import { ThemeContext } from '../../context/ThemeContext';
import { api, WeatherData } from '../../services/api';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function WeatherScreen() {
  const { theme } = React.useContext(ThemeContext);
  const [city, setCity] = useState('Baku');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchWeather() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.weatherByCity(city);
      setWeather(data);
    } catch (e) {
      setError("Hava məlumatı yüklənmədi");
    } finally {
      setLoading(false);
    }
  }

  function getWeatherIcon(desc: string) {
    if (desc.includes('rain')) return <Ionicons name="rainy-outline" size={64} color={theme.colors.primary} />;
    if (desc.includes('cloud')) return <Ionicons name="cloud-outline" size={64} color={theme.colors.primary} />;
    if (desc.includes('clear')) return <Ionicons name="sunny-outline" size={64} color={theme.colors.primary} />;
    if (desc.includes('snow')) return <Ionicons name="snow-outline" size={64} color={theme.colors.primary} />;
    return <Ionicons name="partly-sunny-outline" size={64} color={theme.colors.primary} />;
  }

  return (
    <Screen>
      <AppHeader title="Hava Proqnozu" subtitle="Şəhəri seç və cari hava məlumatını öyrən" />

      <View style={{ gap: theme.spacing.md }}>
        <TextInput
          placeholder="Şəhər adı (məs: Baku)"
          value={city}
          onChangeText={setCity}
          style={{
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radii.lg,
            padding: 14,
            color: theme.colors.text,
          }}
        />
        <Button title="Yüklə" onPress={fetchWeather} loading={loading} />
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {error && <Text style={{ color: theme.colors.danger, marginTop: 20 }}>{error}</Text>}

      {weather && !loading && (
        <LinearGradient
          colors={[theme.colors.cardAlt, theme.colors.card]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            marginTop: theme.spacing.lg,
            borderRadius: theme.radii.xl,
            padding: theme.spacing.lg,
            alignItems: 'center',
            ...theme.shadow,
          }}
        >
          {getWeatherIcon(weather.desc.toLowerCase())}
          <Text
            style={{
              fontSize: 22,
              fontFamily: theme.typography.bold,
              color: theme.colors.text,
              marginTop: 8,
            }}
          >
            {weather.city}
          </Text>
          <Text
            style={{
              fontSize: 48,
              fontFamily: theme.typography.bold,
              color: theme.colors.text,
              marginVertical: 8,
            }}
          >
            {Math.round(weather.temp)}°C
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: theme.typography.medium,
              color: theme.colors.textMuted,
            }}
          >
            {weather.desc}
          </Text>

          <View style={{ flexDirection: 'row', marginTop: theme.spacing.md, gap: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="weather-windy" size={28} color={theme.colors.textMuted} />
              <Text style={{ color: theme.colors.textMuted, marginTop: 4 }}>Külək</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="water-percent" size={28} color={theme.colors.textMuted} />
              <Text style={{ color: theme.colors.textMuted, marginTop: 4 }}>Rütubət</Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </Screen>
  );
}
