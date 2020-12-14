import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

export default ({ title,tags,description,navigation,id}) => {

    return (
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate(title,{ id: id })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.tags}>{tags.map(el=>{
                return el+" "
            })}</Text>
            <Text style={{fontFamily:'Roboto_400Regular'}} numberOfLines={3}>{description}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    tab:{
        flex:1,
        borderWidth:1,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding:20,
        margin:10
    },
    title:{
        fontSize:24,
        fontFamily:'Lora_400Regular'
    },
    tags:{
        fontSize:16,
        color:'blue',
        marginVertical:10,
        fontFamily:'Roboto_400Regular'
    }
})