import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  full?: boolean;
};

export default function Button({ title, onPress, variant='primary', loading, disabled, full }: Props) {
  const { theme } = React.useContext(ThemeContext);
  const base = {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: theme.radii.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...(full ? { width:'100%' as const } : null),
  };

  const variants = {
    primary: { backgroundColor: theme.colors.primary },
    secondary: { backgroundColor: theme.colors.cardAlt },
    ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.border },
  } as const;

  const textColors = {
    primary: theme.colors.onPrimary,
    secondary: theme.colors.text,
    ghost: theme.colors.text,
  } as const;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        base,
        variants[variant],
        pressed ? { opacity: 0.9, transform: [{ scale: 0.996 }] } : null,
        theme.shadow
      ]}
    >
      {loading ? <ActivityIndicator /> : (
        <Text style={{ color: textColors[variant], fontFamily: theme.typography.semibold, fontSize: 16 }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
