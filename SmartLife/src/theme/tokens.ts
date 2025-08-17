export type ThemeMode = 'light' | 'dark';

export const palette = {
  brand:    { 500: '#6366F1', 600: '#5457EE', 700: '#4F46E5' },
  accent:   { 500: '#06B6D4' },
  success:  { 500: '#22C55E' },
  warning:  { 500: '#F59E0B' },
  danger:   { 500: '#EF4444' },
  gray:     { 50:'#F9FAFB',100:'#F3F4F6',200:'#E5E7EB',300:'#D1D5DB',400:'#9CA3AF',500:'#6B7280',600:'#4B5563',700:'#374151',800:'#1F2937',900:'#111827' },
};


export const lightColors = {
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  text: palette.gray[900],
  textMuted: palette.gray[600],
  border: palette.gray[200],
  card: '#FFFFFF',
  cardAlt: '#F8FAFF',
  primary: palette.brand[600],
  onPrimary: '#FFFFFF',
  danger: palette.danger[500],
  success: palette.success[500],
  warning: palette.warning[500],
  accent: palette.accent[500],
};

export const darkColors = {
  bg: '#0B1220',
  surface: '#0F1629',
  text: '#E5E7EB',
  textMuted: '#9CA3AF',
  border: '#1F2A44',
  card: '#10192F',
  cardAlt: '#0C1530',
  primary: palette.brand[500],
  onPrimary: '#FFFFFF',
  danger: palette.danger[500],
  success: palette.success[500],
  warning: palette.warning[500],
  accent: palette.accent[500],
};



export const spacing = { xs:8, sm:12, md:16, lg:20, xl:28 };
export const radii = { sm:10, md:16, lg:20, xl:28 };
export const shadow = {
  light: { shadowColor:'#111827', shadowOpacity:0.08, shadowOffset:{width:0,height:6}, shadowRadius:12, elevation:4 },
  dark:  { shadowColor:'#000', shadowOpacity:0.4, shadowOffset:{width:0,height:6}, shadowRadius:18, elevation:6 },
};

export const typography = {
  regular: 'Inter_400Regular',
  medium:  'Inter_500Medium',
  semibold:'Inter_600SemiBold',
  bold:    'Inter_700Bold',
};
