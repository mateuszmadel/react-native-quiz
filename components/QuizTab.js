import React from "react";
import { View, StyleSheet, Text} from "react-native";

export default ({ title,tags,description}) => {

    return (
        <View style={styles.tab}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.tags}>{tags}</Text>
            <Text numberOfLines={3}>{description}</Text>
        </View>
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
    },
    tags:{
        fontSize:16,
        color:'blue',
        marginVertical:10
    }
})