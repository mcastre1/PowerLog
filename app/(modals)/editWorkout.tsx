import { ScrollView, StyleSheet } from 'react-native';

export default function EditWorkout() {
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