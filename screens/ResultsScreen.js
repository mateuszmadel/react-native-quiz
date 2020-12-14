import { Text, TouchableOpacity, View,FlatList,RefreshControl,ActivityIndicator} from "react-native";
import React, {Component} from "react";

import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {Row, Table} from "react-native-table-component";




export default class ResultsScreen extends Component{
    state = {
        refreshing: false,
        loaded:false,
        data:[]
    }
    async componentDidMount() {
        try {
            const json = await this.getResults();
            this.setState({data: json.map(el => {
                    if(el.date===undefined) {
                        return {
                            ...el,
                            date: el.createdOn.slice(0,10),
                        };
                    }
                    else{
                        return el
                    }
                    })
                , loaded: true})
        }catch (e) {
            console.log(e)
        }
    }
    getResults = async () => {
        try {
            let response = await fetch(
                'http://tgryl.pl/quiz/results'
            );
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };
    renderItem = ({item}) => {
        const { nick, score, total, type, date } = item;
        return <Row data={[nick, score + "/" + total, type, date]} textStyle={{margin:4,fontFamily:'Roboto_400Regular'}} borderStyle={{borderWidth: 1, borderColor: 'gray'}} />
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
                        color="white"
                    />} type="clear" onPress={() => this.props.navigation.toggleDrawer()}/>
                    <Text style={styles.headerText}>Results</Text>
                </View>
                <View style={[styles.container, {flex: 4, padding: 10}]}>
                    <Table style={styles.table}>
                    <Row data={tableHead} textStyle={{margin: 5}} style={styles.headStyle}/>
                        {!this.state.loaded? <ActivityIndicator/> :(
                    <FlatList renderItem={this.renderItem} data={this.state.data} keyExtractor={(item, index) => index.toString()}
                              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}/>)}
                    </Table>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.button}>
                        <Text style={{fontFamily:'Lora_400Regular'}}>Go back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const tableHead=['Nick','Points','Type','Date']

const styles={
    header:{
        flex: 1,
        flexDirection:'row',
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:1,
        paddingLeft:10,
        paddingRight:30,
        backgroundColor:"#1565c0",
    },
    headerText:{
        fontSize:40,
        textAlign:'center',
        flex:1,
        fontFamily:'Lora_400Regular',
        color:"#fff"
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
        backgroundColor:"#1565c0",
    },
    footerText:{
        fontSize:20,
        color:"#fff"
    },
    button:{
        backgroundColor:'#A6ABBD',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
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