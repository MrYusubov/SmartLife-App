import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

type Props = React.PropsWithChildren<{
  title?: string;
  onPress?: () => void;
  footer?: React.ReactNode;
}>;

export default function Card({ title, children, onPress, footer }: Props) {
  const { theme } = React.useContext(ThemeContext);
  const Body = (
    <View style={{
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.xl,
      padding: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadow
    }}>
      {title ? (
        <Text style={{ fontFamily: theme.typography.semibold, fontSize: 16, marginBottom: 6, color: theme.colors.text }}>
          {title}
        </Text>
      ) : null}
      <View>{children}</View>
      {footer ? <View style={{ marginTop: theme.spacing.sm }}>{footer}</View> : null}
    </View>
  );
  if (onPress) return <Pressable onPress={onPress}>{Body}</Pressable>;
  return Body;
}
