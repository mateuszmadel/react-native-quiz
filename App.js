import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import QuizScreen from "./screens/QuizScreen";
import {getData, storeData} from "./utils/AsyncStorage";
import MyModal from "./components/MyModal";

import {
    Lora_400Regular,
} from '@expo-google-fonts/lora';
import {
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import * as Font from "expo-font";

const Drawer = createDrawerNavigator();
let customFonts={
    Lora_400Regular,
    Roboto_400Regular
}
export default class App extends React.Component {
    state = {
        modalVisible: false,
        fontsLoaded: false,
        loaded:false
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    async componentDidMount() {
        getData()
            .then(data => data !== 'rulesAccepted3')
            .then(data => this.setState({modalVisible: data}));
        await this._loadFontsAsync();
        try {
            let json = await this.getData();
            this.setState({fetchedData: json, loaded: true})
        } catch (e) {
            console.log(e)
        }
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
    render() {
        if (this.state.fontsLoaded) {
            return (
                <NavigationContainer>
                    <MyModal visible={this.state.modalVisible} onPress={this.acceptRules}/>
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={HomeScreen}/>
                        <Drawer.Screen name="Results" component={ResultsScreen}/>
                        {
                            this.state.loaded&&this.state.fetchedData.map(el=>{
                               return(<Drawer.Screen name={el.name} component={QuizScreen} initialParams={{ params: el.id }} options={{unmountOnBlur: true}}/>)

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

