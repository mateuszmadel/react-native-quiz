import React from "react";
import {StyleSheet, Text, View} from "react-native";


export default ({data,background}) => {

    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row',width:'100%' }}>
            {
                data.map((el,index) => (
                    <View style={[styles.cell,{backgroundColor:background}]} key={index}>
                        <Text>{el}</Text>
                    </View>
                ))}
        </View>
    );
}
const styles=StyleSheet.create({
    cell:{
        flex:1,
        alignSelf:'stretch',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        borderWidth:1
    },

})