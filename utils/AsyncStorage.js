import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
    }
}

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
           return value;
        }
    } catch(e) {
    }
}
