import { Text, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import Row from "../components/Row";
import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";




export default class ResultsScreen extends Component{
    render()
    {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button style={styles.headerButton} icon={<Icon
                        name="bars"
                        size={32}
                        color="black"
                    />} type="clear" onPress={() => this.props.navigation.toggleDrawer()}/>
                    <Text style={styles.headerText}>Results</Text>
                </View>
                <View style={[styles.container, {flex: 4, padding: 20}]}>
                    <Row data={tableHead} background={'#E0E0E0'}/>
                    {
                        data.map((dataRow, index) =>
                            <Row
                                key={index}
                                data={dataRow}
                            />
                        )
                    }
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.button}>
                        <Text>Go back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const tableHead=['Nick','Points','Type','Date']
const data=[['nick1','18/20','quiz1','29-11-2020'],['nick2','14/20','quiz3','29-11-2020'],['nick3','11/20','quiz2','29-11-2020'],['nick4','18/20','quiz1','29-11-2020'],
    ['nick5','18/20','quiz1','29-11-2020'],['nick6','14/20','quiz3','29-11-2020'],['nick7','11/20','quiz2','29-11-2020'],['nick8','18/20','quiz1','29-11-2020']]
const styles={
    header:{
        flex: 1,
        flexDirection:'row',
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:1,
        paddingLeft:10,
        paddingRight:30
    },
    headerText:{
        fontSize:40,
        textAlign:'center',
        flex:1
    },
    headerButton: {
        flex: 1,
        margin:15,
        backgroundColor:"lightgray"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer:{
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth:1,
    },
    footerText:{
        fontSize:20
    },
    button:{
        backgroundColor:'#E0E0E0',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        borderWidth:1,
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:25
    },


}