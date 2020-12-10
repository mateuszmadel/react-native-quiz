import {Text, View,TouchableOpacity,Animated,Easing} from "react-native";
import React, {Component} from "react";
import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";



const quiz= [{
        "question": "W którym mieście znajduje się stolica NATO ?",
        "answers": [
            {
                "content": "Paryż",
                "isCorrect": false
            },
            {
                "content": "Bruksela",
                "isCorrect": true
            },
            {
                "content": "Amsterdam",
                "isCorrect": false
            },
            {
                "content": "Luksemburg",
                "isCorrect": false
            }
        ],
        "duration": 30
        },
    {
    "question": "Jaki kolor ma chlorofil",
    "answers": [
        {
            "content": "Czerwony",
            "isCorrect": false
        },
        {
            "content": "Zielony",
            "isCorrect": true
        },
        {
            "content": "Biały",
            "isCorrect": false
        },
        {
            "content": "Żółty",
            "isCorrect": false
        }
    ],
    "duration": 30
},
    {
        "question": "Bitwa warszawska miała miejsce w roku:",
        "answers": [
            {
                "content": "1917",
                "isCorrect": false
            },
            {
                "content": "1918",
                "isCorrect": false
            },
            {
                "content": "1919",
                "isCorrect": false
            },
            {
                "content": "1920",
                "isCorrect": true
            }
        ],
        "duration": 30
    }

]
export default class QuizScreen extends Component{
    state = {
        quiz:[],
        timer: null,
        counter: 30,
        currQuestion:0,
        points:0,
        loaded:false,
        finished:false


    };
    animatedValue= new Animated.Value(0);
    componentDidMount() {
        this.initialize()
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
        this.animate();

    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
    tick =() => {
        if(this.state.counter>0)
        this.setState({
            ...this.state,
            counter: this.state.counter -1
        });
        else {
            this.nextQuestion();
            this.animatedValue.setValue(0)
            this.animate();

        }
    }
    animate=()=>{
        Animated.timing(this.animatedValue,
            {
                toValue: -300,
                duration: 30000,
                easing: Easing.linear,
                useAnimatedDriver: true,
                useNativeDriver:false
            }).start();
    }
    initialize =()=>{
        this.setState({
            quiz:quiz,
            counter: 30,
            currQuestion:0,
            points:0,
            finished:false,
            loaded:true
        })
    }
    nextQuestion=()=>{
        if(this.state.currQuestion+1<this.state.quiz.length){
        this.setState({
            counter: 30,
            currQuestion:this.state.currQuestion+1,
        })
            this.animatedValue.setValue(0)
            this.animate();
        }
        else{
            this.setState({
                finished:true
            })
        }
    }
    checkAnswer=(index)=>{
        if(this.state.quiz[this.state.currQuestion].answers[index].isCorrect){
            this.setState({
                points:this.state.points+1
            })
        }
        this.nextQuestion()
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button style={styles.headerButton} icon={<Icon
                        name="bars"
                        size={32}
                        color="black"
                    />} type="clear" onPress={() => this.props.navigation.toggleDrawer()}/>
                    <Text style={styles.headerText}>Quiz #1</Text>
                </View>

                <View style={styles.content}>
                    {this.state.loaded && !this.state.finished &&
                    <>
                    <View style={styles.quizTop}>
                        <Text
                            style={styles.quizTopText}>Question {this.state.currQuestion + 1} of {this.state.quiz.length}</Text>
                        <Text style={styles.quizTopText}>Time: {this.state.counter} sec</Text>
                    </View>
                        <View style={styles.loadBar}>
                        <Animated.View style={[styles.loadAmount, {transform: [{translateX: this.animatedValue}]}]}/>
                        </View>
                        <Text style={{
                        fontSize: 20,
                        marginVertical: 10
                    }}>{this.state.quiz[this.state.currQuestion].question}
                        </Text>
                        <Text numberOfLines={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique
                        vehicula sem, non accumsan lorem malesuada quis. Vestibulum ut ullamcorper urna. Aliquam
                        elementum erat vulputate justo euismod, vehicula condimentum ex hendrerit. Nulla ut magna nunc.
                        Quisque quis sodales arcu. Praesent in ex ac sem fermentum interdum a nec nulla. Donec eu eros
                        ac tortor rutrum hendrerit. Fusce feugiat justo dolor, et consectetur nulla finibus faucibus.
                        Sed facilisis tincidunt sapien</Text>
                        <View style={styles.answers}>
                        <TouchableOpacity style={styles.answer} onPress={() => this.checkAnswer(0)}>
                        <Text>{this.state.quiz[this.state.currQuestion].answers[0].content}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.answer} onPress={() => this.checkAnswer(1)}>
                        <Text>{this.state.quiz[this.state.currQuestion].answers[1].content}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.answer} onPress={() => this.checkAnswer(2)}>
                        <Text>{this.state.quiz[this.state.currQuestion].answers[2].content}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.answer} onPress={() => this.checkAnswer(3)}>
                        <Text>{this.state.quiz[this.state.currQuestion].answers[3].content}</Text>
                        </TouchableOpacity>
                        </View>
                    </>
                    }
                    {this.state.finished &&
                    <View>
                        <Text>Odpowiedziałeś poprawnie na {this.state.points} z {this.state.quiz.length} pytań</Text>
                    </View>
                    }
                </View>

            </View>

        )
    }
}

const styles= {
    container:{
        flex:1,
    },
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
        margin:5,
        backgroundColor:"lightgray"
    },
    content:{
        padding:50,
        flex:4
    },
    quizTop:{
        flex:1,
        flexDirection:'row',

        justifyContent: "space-between",
        alignItems: "center",
        margin:10

    },
    quizTopText:{
        fontSize:20
    },
    answers:{
        marginTop:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent:'stretch',
        justifyContent: 'center',
    },
    answer:{
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        borderWidth: 1,
        width:"40%"
    },
    loadBar: {
        width: 300,
        height: 20,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    loadAmount: {
        position: 'absolute',
        width: 300,
        height: 20,
        backgroundColor: 'blue',
    },
}