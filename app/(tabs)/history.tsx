import { useTheme } from '@/src/constants/theme/useTheme';
import { Text } from 'react-native';

export default function History() {
  const { theme } = useTheme(); // Get the current theme (light or dark) from the ThemeContext.
  return <>
    <view style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.colors.text }}>History ssPage</Text>
    </view>
  </>
}
