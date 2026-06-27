import { ThemeToggle } from '@/components/ThemeToggle'
import { StyleSheet, View } from 'react-native'

export default function Settings() {
  return (
    <View style={styles.container}>
        <ThemeToggle />
    </View> 
  )
}

const styles = StyleSheet.create({ 
    container :{
        flex: 1,
        backgroundColor: '#fff',
    }
})

