import React, {Component} from "react";
import { TouchableOpacity,SafeAreaView,ScrollView,Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuizTab from "../components/QuizTab";
export default class HomeScreen extends Component{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button style={styles.headerButton} icon={<Icon
                        name="bars"
                        size={32}
                        color="black"
                    />} type="clear" onPress={() => this.props.navigation.toggleDrawer()}/>
                    <Text style={styles.headerText}>Home Page</Text>
                </View>
                <SafeAreaView style={[styles.container, {marginTop: Constants.statusBarHeight, flex: 4}]}>
                    <ScrollView>
                        {
                            quizArr.map((el) => (
                                <QuizTab title={el.title} tags={el.tags} description={el.description} key={el.title}/>
                            ))}
                    </ScrollView>
                </SafeAreaView>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Get to know your ranking result</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Results')} style={styles.button}>
                        <Text>Check!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const quizArr=[{title:'Title quiz 1',tags:'tag1 tag2',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sapien nisl, elementum sed velit at, eleifend mollis lorem. Phasellus dignissim lectus ac massa dignissim rutrum. Proin pulvinar euismod nisl sed ullamcorper. Curabitur nec laoreet risus. Duis sit amet enim id diam vulputate tincidunt. Quisque cursus ut libero vel venenatis. Phasellus porta nisi eget justo dapibus, nec euismod sem laoreet. Etiam non sagittis elit. Integer pretium rhoncus quam, ut interdum elit elementum vel. Nullam quis nibh sed ante sodales sagittis ac ut nis'},
    {title:'Title quiz 2',tags:'tag1 tag2',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sapien nisl, elementum sed velit at, eleifend mollis lorem. Phasellus dignissim lectus ac massa dignissim rutrum. Proin pulvinar euismod nisl sed ullamcorper. Curabitur nec laoreet risus. Duis sit amet enim id diam vulputate tincidunt. Quisque cursus ut libero vel venenatis. Phasellus porta nisi eget justo dapibus, nec euismod sem laoreet. Etiam non sagittis elit. Integer pretium rhoncus quam, ut interdum elit elementum vel. Nullam quis nibh sed ante sodales sagittis ac ut nis'},
    {title:'Title quiz 3',tags:'tag3 tag2',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sapien nisl, elementum sed velit at, eleifend mollis lorem. Phasellus dignissim lectus ac massa dignissim rutrum. Proin pulvinar euismod nisl sed ullamcorper. Curabitur nec laoreet risus. Duis sit amet enim id diam vulputate tincidunt. Quisque cursus ut libero vel venenatis. Phasellus porta nisi eget justo dapibus, nec euismod sem laoreet. Etiam non sagittis elit. Integer pretium rhoncus quam, ut interdum elit elementum vel. Nullam quis nibh sed ante sodales sagittis ac ut nis'},
    {title:'Title quiz 4',tags:'tag4 tag2',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sapien nisl, elementum sed velit at, eleifend mollis lorem. Phasellus dignissim lectus ac massa dignissim rutrum. Proin pulvinar euismod nisl sed ullamcorper. Curabitur nec laoreet risus. Duis sit amet enim id diam vulputate tincidunt. Quisque cursus ut libero vel venenatis. Phasellus porta nisi eget justo dapibus, nec euismod sem laoreet. Etiam non sagittis elit. Integer pretium rhoncus quam, ut interdum elit elementum vel. Nullam quis nibh sed ante sodales sagittis ac ut nis'},
    {title:'Title quiz 5',tags:'tag1 tag5',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sapien nisl, elementum sed velit at, eleifend mollis lorem. Phasellus dignissim lectus ac massa dignissim rutrum. Proin pulvinar euismod nisl sed ullamcorper. Curabitur nec laoreet risus. Duis sit amet enim id diam vulputate tincidunt. Quisque cursus ut libero vel venenatis. Phasellus porta nisi eget justo dapibus, nec euismod sem laoreet. Etiam non sagittis elit. Integer pretium rhoncus quam, ut interdum elit elementum vel. Nullam quis nibh sed ante sodales sagittis ac ut nis'}]
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
    }

}