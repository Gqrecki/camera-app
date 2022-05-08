import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Share } from "react-native"

export default class Photo extends Component {
  constructor(props) {
    super(props);
  }

  share = async() => {
    try {
      await Sharing.shareAsync('file://' + (this.props.route.params.uri).slice(5))
    } catch (error) {
        alert(error.message);
    }
  }

  delete = async() => {
    await MediaLibrary.deleteAssetsAsync([this.props.route.params.id]);
    await this.props.route.params.refresh()
    this.props.navigation.navigate("Gallery")
  }

  render() {
    return (
      <View style={styles.con}>
        <View style={styles.container}>
        <View
          style = {styles.v1}
        >
          <Image
          style={styles.styleimg}
          source={{uri: this.props.route.params.uri}}
          >
          </Image>
        </View>
        <View>
          <Text style={{color:'#636363'}}>{this.props.route.params.width} x {this.props.route.params.height}</Text>
        </View>
        
        <View
          style = {styles.v2}
        >
          
          <MyButton 
              text='share'
              style={styles.bt}
              textstyle={styles.bttext}
              func={() => {
                this.share()
              }}
            ></MyButton>
          <MyButton 
              text='remove'
              style={styles.bt}
              textstyle={styles.bttext}
              func={() => {
                this.delete()
              }}
            ></MyButton>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: '#636363'
},
container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#47ffcc',
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  alignItems: 'center',
  alignContent: 'center',
},
  v1 : {
    flex: 14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  v2 : {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  bt: {
    margin: '4%',
    width: '30%',
    padding: 10,
    backgroundColor: "#636363",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  bttext: {
    fontSize: 15,
    color: "#47ffcc",
    fontWeight: 'bold',
  },
  styleimg: {
    borderRadius: 20,
    borderColor: "#ffffcc",
    width : Dimensions.get("window").width - 30,
    height : Dimensions.get("window").height - 60,
    resizeMode: "contain"
  },
})
