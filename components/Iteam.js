import React, { Component } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Photo from './Photo';

export default class Iteam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected : false
    };
  }
  

  press = () => {
    if (typeof onPress != "function"){
      this.props.photo(this.props.id, this.props.uri)
    }
  }

  longpress = () => {
    if (typeof onSelect != "function"){
      if(this.state.selected == false){
        this.setState({
          selected : true
        })
      }else{
        this.setState({
          selected : false
        })
      }
      this.props.onSelect()
    }
  }
  

  render() {
    if(this.props.nosel == true){
      this.setState({
        selected: false
      })
      this.props.noselfun()
    }
    return (
      <Pressable
        onPress = {this.press}
        onLongPress = {this.longpress}
        style={this.props.style}
      >
        {
          this.state.selected
          ?
          <Image
          style={this.props.styleimgsel}
          source={{uri: this.props.uri}}
          />
          :
          <Image
          style={this.props.styleimg}
          source={{uri: this.props.uri}}
          />
          }
      </Pressable>
    );
  }
}
