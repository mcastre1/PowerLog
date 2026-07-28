import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/src/constants/theme/useTheme';
import { StyleSheet, View } from 'react-native';

// Settings page, used o change between light and dark themes.
export default function Settings() {
  const {theme} = useTheme();
  return (
    <View style={{backgroundColor : theme.colors.background, flex: 1}}>
        <ThemeToggle />
    </View> 
  )
}

const styles = StyleSheet.create({ 
    container :{
        flex: 1,
    }
})

