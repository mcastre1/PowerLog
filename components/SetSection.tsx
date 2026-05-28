import { StyleSheet, View } from 'react-native';
import CounterInput from './CounterInput';

export default function SetSection() {
    return <>
        <View style={styles.setContainer}>
            <CounterInput label="Reps"/>
            <CounterInput label='Weight'/>
        </View></>
}

const styles = StyleSheet.create({
    setContainer: {
        flex: 1,
        flexDirection: "row",
        gap: 10
    }

});
