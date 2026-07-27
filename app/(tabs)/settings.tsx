import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/src/constants/theme/useTheme';
import { StyleSheet, View } from 'react-native';

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

