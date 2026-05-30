import { StyleSheet, View } from 'react-native';
import CounterInput from './CounterInput';

type Props = {
    reps: string,
    weight: string,
    handleInputChange: (id: string, field: string, value: string) => void,
    id: string
}

export default function SetSection({id, reps, weight, handleInputChange} : Props) {
    return <>
        <View style={styles.setContainer}>
            <CounterInput id={id} label="Reps" val={reps} handleInputChange={handleInputChange}/>
            <CounterInput id={id} label='Weight' val={weight} handleInputChange={handleInputChange}/>
        </View></>
}

const styles = StyleSheet.create({
    setContainer: {
        flex: 1,
        flexDirection: "row",
        gap: 10
    }

});
