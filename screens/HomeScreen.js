import React, {Component} from "react";
import {TouchableOpacity, SafeAreaView, ScrollView, Text, View, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuizTab from "../components/QuizTab";


export default class HomeScreen extends Component{
    state={
        loaded:false,
        fetchedData:[]
    }
    async componentDidMount() {
        try {
            let json = await this.getData();
            this.setState({fetchedData: json, loaded: true})
        }catch (e) {
            console.log(e)
        }
    }
    getData = async () => {
        try {
            let response = await fetch(
                'http://tgryl.pl/quiz/tests'
            );
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    render() {

            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Button style={styles.headerButton} icon={<Icon
                            name="bars"
                            size={32}
                            color="white"
                        />} type="clear" onPress={() => this.props.navigation.toggleDrawer()}/>
                        <Text style={styles.headerText}>Home Page</Text>
                    </View>
                    <SafeAreaView style={[styles.container, {marginTop: Constants.statusBarHeight, flex: 4}]}>
                        {!this.state.loaded? <ActivityIndicator/> :(
                        <ScrollView>
                            {
                               this.state.fetchedData.map((el) => (
                                    <QuizTab title={el.name} tags={el.tags} description={el.description}
                                             key={el.id} navigation={this.props.navigation} id={el.id}/>
                                ))}
                        </ScrollView>)}
                    </SafeAreaView>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Get to know your ranking result</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Results')}
                                          style={styles.button}>
                            <Text style={{fontFamily:'Lora_400Regular'}}>Check!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );

    }
}
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
        backgroundColor:"#c9cad3"
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
        backgroundColor:"#1565c0",
    },
    footerText:{
        fontSize:20,
        fontFamily:'Lora_400Regular',
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
    }

}