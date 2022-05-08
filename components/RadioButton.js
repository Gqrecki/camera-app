import React, { Component } from 'react'
import { Text, View, Image,StyleSheet,TouchableOpacity, Dimensions } from 'react-native'

export class RadioButton extends Component {
    constructor(props){
        super(props)
        this.state={
            isSelected:this.props.selected
        }
    }

    changeSelect = () => {
        this.setState(curState => ({ isSelected:!curState.isSelected }))
        this.props.handleClick(this.props.text)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.selected?
                <TouchableOpacity  onPress={this.changeSelect}>
                    <View style={styles.unSelected}>
                        <View style={styles.Selected}></View>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={this.changeSelect}>
                    <View style={styles.unSelected} ></View>
               </TouchableOpacity> 
                }
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        height:  Dimensions.get("window").height * 0.8 *0.1,
        width: Dimensions.get("window").width * 0.5 *0.8,
        display:'flex',
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    unSelected:{
        width:30,
        height:30,
        borderRadius:50,
        backgroundColor:'#636363',
        borderWidth:3,
        borderColor:'#636363',
    },
    Selected:{
        position:'absolute',
        width:15,
        height:15,
        top:"50%",
        left:"50%",
        transform:[
            {translateX:-7.5},
            {translateY:-7.5},
        ],
        borderRadius:50,
        backgroundColor:'#47ffcc',
    },
    text:{
        color:'#47ffcc',
    }
})
export default RadioButton
