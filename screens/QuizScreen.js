import {Text, View,TouchableOpacity,Animated,Easing,TextInput} from "react-native";
import React, {Component} from "react";
import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default class QuizScreen extends Component{
    _isMounted = false;
    state = {
        quiz:[],
        timer: null,
        counter: 30,
        currQuestion:0,
        points:0,
        loaded:false,
        finished:false,
        fetchedData:[],
        nickname:""

    };
    animatedValue= new Animated.Value(0);
    async componentDidMount() {
        this._isMounted=true;
        try {
            let json = await this.getData();
            if (this._isMounted)
            this.setState({fetchedData: json})
        }catch (e) {
            console.log(e)
        }
        this.initialize()
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
        this.animate();

    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
        this._isMounted = false;
    }
    getData = async () => {
        try {
            let response = await fetch(
                'http://tgryl.pl/quiz/test/'+ this.props.route.params.params
            );
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };
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
                duration: this.state.counter*1000,
                easing: Easing.linear,
                useAnimatedDriver: true,
                useNativeDriver:false
            }).start();
    }
    initialize =()=>{
        this.setState({
            quiz:this.state.fetchedData.tasks,
            counter: this.state.fetchedData.tasks[this.state.currQuestion].duration,
            currQuestion:0,
            points:0,
            finished:false,
            loaded:true
        })
    }
    nextQuestion=()=>{
        if(this.state.currQuestion+1<this.state.quiz.length){
        this.setState({
            counter: this.state.quiz[this.state.currQuestion].duration,
            currQuestion:this.state.currQuestion+1,
        },()=>{
            this.animatedValue.setValue(0)
            this.animate();
        })

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
    sendResult=async ()=>{
        if(this.state.nickname!==""){
            const response=await fetch('http://tgryl.pl/quiz/result', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nick: this.state.nickname,
                    score: this.state.points,
                    total: this.state.quiz.length,
                    type: this.state.fetchedData.tags[0],
                })
            });

            await response.json();

            this.props.navigation.navigate('Results')
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button style={styles.headerButton} icon={<Icon
                        name="bars"
                        size={32}
                        color="white"
                    />} type="clear" onPress={() => this.props.navigation.toggleDrawer()}/>
                    {this.state.loaded &&
                    <Text style={styles.headerText}>{this.state.fetchedData.name}</Text>}
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
                        fontSize: 16,
                        marginVertical: 10
                    }}>{this.state.quiz[this.state.currQuestion].question}
                        </Text>
                        <View style={styles.answers}>
                            {
                                this.state.quiz[this.state.currQuestion].answers.map((el,index)=>{
                                    return(
                                    <TouchableOpacity style={styles.answer} onPress={() => this.checkAnswer(index)} key={index}>
                                        <Text style={styles.answerText}>{el.content}</Text>
                                    </TouchableOpacity>)
                                })
                            }

                        </View>
                    </>
                    }
                    {this.state.finished &&
                    <View>
                        <Text style={[styles.answerText,{margin:10}]}>Odpowiedziałeś poprawnie na {this.state.points} z {this.state.quiz.length} pytań</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1,margin:10,padding:2}}
                            onChangeText={text => this.setState({nickname:text})}
                            value={this.state.nickname}

                            placeholder={"Enter your nickname"}
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={()=>this.sendResult()}>
                            <Text>Zapisz wynik</Text>
                        </TouchableOpacity>
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
        paddingRight:30,
        backgroundColor:"#1565c0",
    },
    headerText:{
        fontSize:24,
        textAlign:'center',
        flex:1,
        fontFamily:'Lora_400Regular',
        color:"#fff"
    },
    headerButton: {
        flex: 1,
        margin:5,
        backgroundColor:"lightgray"
    },
    content:{
        paddingHorizontal:50,
        paddingVertical:30,
        flex:4
    },
    quizTop:{
        flex:1,
        flexDirection:'row',

        justifyContent: "space-between",
        alignItems: "center",
        margin:5

    },
    quizTopText:{
        fontSize:20,
        fontFamily:'Roboto_400Regular'
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
        width:"42%"
    },
    answerText:{
        textAlign:'center',
        fontFamily:'Roboto_400Regular'
    },
    loadBar: {
        width: 300,
        height: 20,
        margin:2,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    loadAmount: {
        position: 'absolute',
        width: 300,
        height: 20,
        backgroundColor: 'blue',
    },
    sendButton:{
        width:"50%",
        margin:10,
        padding:10,
        borderWidth:1,
        backgroundColor:"lightgray"
    }
}