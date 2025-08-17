import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

type Props = React.PropsWithChildren<{ padded?: boolean }>;
export default function Screen({ children, padded = true }: Props) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.content, padded && { padding: theme.spacing.md }]}>{children}</View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ root:{ flex:1 }, content:{ flex:1 }});
