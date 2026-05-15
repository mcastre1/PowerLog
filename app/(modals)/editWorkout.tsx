import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';



export default function EditWorkout() {
    console.log("ROUTE:", useLocalSearchParams());
    return (
        <ScrollView style={styles.container}>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        gap: "10px",
    }
});