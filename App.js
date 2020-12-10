import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import QuizScreen from "./screens/QuizScreen";
import {getData, storeData} from "./utils/AsyncStorage";
import MyModal from "./components/MyModal";
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
    state = {
        modalVisible: false
    }

    componentDidMount() {
        getData()
            .then(data => data !== 'rulesAccepted')
            .then(data => this.setState({ modalVisible: data }));
    }

    acceptRules = () => {
        storeData('rulesAccepted')
            .then(() => this.setState({ modalVisible: false }));
    }
    render() {
        return (
            <NavigationContainer>
                <MyModal visible={this.state.modalVisible} onPress={this.acceptRules}/>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Results" component={ResultsScreen}/>
                    <Drawer.Screen name="Quiz #1" component={QuizScreen} options={{unmountOnBlur:true}}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

