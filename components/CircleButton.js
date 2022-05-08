import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

export default class CircleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity
      onPress={this.props.func} 
      style={this.props.style}
      >
        <Image
        source={this.props.source}
        style={this.props.imgstyle}
        >
        </Image>
      </TouchableOpacity>
    );
  }
}
