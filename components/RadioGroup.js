import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import RadioButton from './RadioButton'

export class RadioGroup extends Component {

    static defaultProps = {
        groupName:'defaultName',
        data:[1,2,3,4]
    }

    constructor(props){
        super(props)
        this.state = {
            clickedElemet:null
        }
    }

    handleChange=(e)=>{
        this.setState({clickedElemet:e})
        this.props.onPress(this.props.title,e)
    }
    
    renderItem=({item})=>{
        if(item==this.state.clickedElemet){
            return <RadioButton text={item} selected={true} handleClick={this.handleChange}/>
        }else{
            return <RadioButton text={item} selected={false} handleClick={this.handleChange}/>
        }
    }

    render() {
        return (
            <View style={{marginBottom: 15, marginTop: 15}}>
                <Text style={{color:'#47ffcc', textAlign:'center'}}> {this.props.title}</Text>
                <FlatList
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item}
                        numColumns={1}
                        key={1}
                        />
            </View>
        )
    }
}

export default RadioGroup;