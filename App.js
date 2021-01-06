import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import QuizScreen from "./screens/QuizScreen";
import {getData, storeData} from "./utils/AsyncStorage";
import MyModal from "./components/MyModal";
import {sample,shuffle} from 'lodash'

import {
    Lora_400Regular,
} from '@expo-google-fonts/lora';
import {
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import * as Font from "expo-font";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import * as SQLite from "expo-sqlite";

const Drawer = createDrawerNavigator();
let customFonts={
    Lora_400Regular,
    Roboto_400Regular
}
const db = SQLite.openDatabase('db.db');
export default class App extends React.Component {
    state = {
        modalVisible: false,
        fontsLoaded: false,
        loaded:false,

    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    async componentDidMount() {

         db.transaction(tx => {
            tx.executeSql(
                'create table if not exists list(id integer primary key not null, date date, value text);'
            );
            tx.executeSql('create table if not exists tests(id text primary key not null, value text);')

        });


         db.transaction(tx => {
             tx.executeSql('select * from list;', [], (_, { rows }) =>
                this.setState({dbdata:JSON.parse(JSON.stringify(rows))._array[0]},async()=>{
                    if(this.state.dbdata===undefined ||this.state.dbdata.date!==new Date().toISOString().slice(0,10)) {
                        tx.executeSql('delete from list;')
                        tx.executeSql('delete from tests;')
                        try {
                            let json = await this.getData();
                            this.setState({fetchedData: json, loaded: true})
                            db.transaction(tx => {
                                tx.executeSql(
                                    'insert into list(date,value) values(?,?);', [new Date().toISOString().slice(0, 10), JSON.stringify(this.state.fetchedData)]
                                );
                            })
                        } catch (e) {
                            console.log(e)
                        }

                            this.state.fetchedData.map(async (el)=>{
                                try{
                                    let response = await fetch(
                                        'http://tgryl.pl/quiz/test/'+el.id
                                    );
                                    let json = await response.json();
                                    db.transaction(tx => {
                                        tx.executeSql(
                                            'insert into tests(id,value) values(?,?);', [el.id, JSON.stringify(json)]
                                        );
                                    })
                                }
                                catch(e){
                                    console.log(e)
                                }
                            })


                    }
                    else{
                        this.setState({fetchedData:JSON.parse(this.state.dbdata.value),loaded:true})

                    }
                })
            );
        });
        getData()
            .then(data => data !== 'rulesAccepted3')
            .then(data => this.setState({modalVisible: data}));
        await this._loadFontsAsync();

    }

    acceptRules = () => {
        storeData('rulesAccepted3')
            .then(() => this.setState({ modalVisible: false }));
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
    refreshDB = async()=>{
        db.transaction(async tx => {
            tx.executeSql('delete from list;')
            tx.executeSql('delete from tests;')
            try {
                let json = await this.getData();
                this.setState({fetchedData: json, loaded: true})
                db.transaction(tx => {
                    tx.executeSql(
                        'insert into list(date,value) values(?,?);', [new Date().toISOString().slice(0, 10), JSON.stringify(this.state.fetchedData)]
                    );
                })
            } catch (e) {
                console.log(e)
            }

            this.state.fetchedData.map(async (el) => {
                try {
                    let response = await fetch(
                        'http://tgryl.pl/quiz/test/' + el.id
                    );
                    let json = await response.json();
                    db.transaction(tx => {
                        tx.executeSql(
                            'insert into tests(id,value) values(?,?);', [el.id, JSON.stringify(json)]
                        );
                    })
                } catch (e) {
                    console.log(e)
                }
            })

        })
    }
    render() {
        if (this.state.fontsLoaded) {
            return (
                <NavigationContainer>
                    <MyModal visible={this.state.modalVisible} onPress={this.acceptRules}/>
                    <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
                        return (
                            <DrawerContentScrollView {...props}>
                                <DrawerItemList {...props} />
                                <DrawerItem label="Choose random quiz" style={{borderTopWidth:1}} onPress={() => props.navigation.navigate(sample(this.state.fetchedData).name)} />
                                <DrawerItem label="Refresh" onPress={() => this.refreshDB()} />
                            </DrawerContentScrollView>
                        )
                    }}>
                        <Drawer.Screen name="Home" component={HomeScreen} options={{unmountOnBlur: true}}/>
                        <Drawer.Screen name="Results" component={ResultsScreen} options={{unmountOnBlur: true}}/>
                        {
                            this.state.loaded&&shuffle(this.state.fetchedData).map(el=>{
                               return(<Drawer.Screen name={el.name} component={QuizScreen} initialParams={{ params: el.id }} key={el.id} options={{unmountOnBlur: true}}/>)

                            })
                        }
                    </Drawer.Navigator>
                </NavigationContainer>
            );
        }
        else{
            return null
        }
    }
}

