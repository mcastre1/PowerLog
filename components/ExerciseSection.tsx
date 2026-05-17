import { StyleSheet, Text, View } from 'react-native';

export default function ExerciseSection (){
    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                    <Text>test</Text>
            </View>
            <View style={styles.rightColumn}>
                    <Text>test2</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: "row",
    },
    leftColumn: {
        flex:1,
    },
    rightColumn:{
        flex:2,
    }
});