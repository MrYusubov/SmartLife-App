import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppHeader({ title, subtitle }:{ title:string; subtitle?:string }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <LinearGradient
      colors={[theme.colors.cardAlt, theme.colors.card]}
      start={{ x:0, y:0 }} end={{ x:1, y:1 }}
      style={{ borderRadius: theme.radii.xl, padding: theme.spacing.lg, marginBottom: theme.spacing.md }}
    >
      <Text style={{ fontFamily: theme.typography.bold, fontSize: 22, color: theme.colors.text }}>{title}</Text>
      {subtitle ? (
        <Text style={{ fontFamily: theme.typography.regular, color: theme.colors.textMuted, marginTop: 6 }}>
          {subtitle}
        </Text>
      ) : null}
    </LinearGradient>
  );
}
