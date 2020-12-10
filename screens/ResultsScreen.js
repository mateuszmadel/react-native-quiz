import { Text, TouchableOpacity, View,FlatList,RefreshControl} from "react-native";
import React, {Component} from "react";

import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {Row, Table} from "react-native-table-component";




export default class ResultsScreen extends Component{
    state = {
        refreshing: false
    }
    renderItem = ({item}) => {
        const { nick, score, total, type, date } = item;
        return <Row data={[nick, score + "/" + total, type, date]} textStyle={{margin:4}} borderStyle={{borderWidth: 1, borderColor: 'gray'}} />
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        setTimeout(()=>{
            this.setState({ refreshing: false});
        },1000)
    };

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
                <View style={[styles.container, {flex: 4, padding: 10}]}>
                    <Table style={styles.table}>
                    <Row data={tableHead} textStyle={{margin: 5}} style={styles.headStyle}/>
                    <FlatList renderItem={this.renderItem} data={results} keyExtractor={(item, index) => index.toString()}
                              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}/>
                    </Table>
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
const results = [
    {
        "nick": "Marek",
        "score": 18,
        "total": 20,
        "type": "historia",
        "date": "2018-11-22"
    },
    {
        "nick": "Jacek",
        "score": 7,
        "total": 20,
        "type": "historia",
        "date": "2018-12-22"
    },
    {
        "nick": "Jan",
        "score": 3,
        "total": 30,
        "type": "fizyka",
        "date": "2018-12-22"
    },
    {
        "nick": "Jan",
        "score": 11,
        "total": 20,
        "type": "historia",
        "date": "2018-12-22"
    },
    {
        "nick": "Marek",
        "score": 18,
        "total": 20,
        "type": "historia",
        "date": "2018-11-22"
    },
    {
        "nick": "Jacek",
        "score": 7,
        "total": 20,
        "type": "historia",
        "date": "2018-12-22"
    },
    {
        "nick": "Jan",
        "score": 3,
        "total": 30,
        "type": "fizyka",
        "date": "2018-12-22"
    },
    {
        "nick": "Jan",
        "score": 11,
        "total": 20,
        "type": "historia",
        "date": "2018-12-22"
    },
    {
        "nick": "Marek",
        "score": 18,
        "total": 20,
        "type": "historia",
        "date": "2018-11-22"
    },
    {
        "nick": "Jacek",
        "score": 7,
        "total": 20,
        "type": "historia",
        "date": "2018-12-22"
    },
    {
        "nick": "Jan",
        "score": 3,
        "total": 30,
        "type": "fizyka",
        "date": "2018-12-22"
    },
    {
        "nick": "Jan",
        "score": 11,
        "total": 20,
        "type": "historia",
        "date": "2018-12-22"
    },
    {
        "nick": "Marek",
        "score": 18,
        "total": 20,
        "type": "historia",
        "date": "2018-11-22"
    },
    {
        "nick": "Jacek",
        "score": 7,
        "total": 20,
        "type": "historia",
        "date": "2018-12-22"
    },
    {
        "nick": "Jan",
        "score": 3,
        "total": 30,
        "type": "fizyka",
        "date": "2018-12-22"
    },
    {
        "nick": "Jan",
        "score": 11,
        "total": 20,
        "type": "historia",
        "date": "2018-12-22"
    },
    ]
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
    table:{
        marginBottom:40
    },
    headStyle: {
        height: 40,
        alignContent: "center",
        justifyContent:"center",
        backgroundColor: '#ddd',

    },


}