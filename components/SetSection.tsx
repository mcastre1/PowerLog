import { StyleSheet, View } from 'react-native';
import CounterInput from './CounterInput';

type Props = {
    reps: string,
    weight: string,
}

export default function SetSection({reps, weight} : Props) {
    return <>
        <View style={styles.setContainer}>
            <CounterInput label="Reps" val={reps}/>
            <CounterInput label='Weight' val={weight}/>
        </View></>
}

const styles = StyleSheet.create({
    setContainer: {
        flex: 1,
        flexDirection: "row",
        gap: 10
    }

});
