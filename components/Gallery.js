import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import MyButton from './MyButton';
import Iteam from './Iteam';
import { FlatList } from 'react-native';
import { Dimensions } from "react-native";
import { useState } from 'react';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      display: 3,
      selected: [],
      nosel: false
    };
  }

  componentDidMount = async() => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('brak uprawnień do czytania image-ów z galerii')
    }else{
      this.refreshGallery()
    }
  }

  

  refreshGallery = async() => {
    this.setState({
      selected : []
    })
    let dcim = await MediaLibrary.getAlbumAsync("DCIM")
    let obj = await MediaLibrary.getAssetsAsync({
      album: dcim,
      first: 100,           // ilość pobranych assetów
      mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
    })
    obj = JSON.stringify(obj.assets)
    this.setState({
      data : JSON.parse(obj)
    })
  }

  dispaly = () => {
    if(this.state.display == 1){
      this.setState({
        display : 3
      })
    }else{
      this.setState({
        display : 1
      })
    }
  }

  camera = () => {
    this.props.navigation.navigate("Camera.", {refresh: this.refreshGallery})
  }

  photo = (id, uri, width, height) => {
    this.props.navigation.navigate("Photo", {id: id, uri: uri, refresh: this.refreshGallery, width:width, height:height})
  }

  remove = async() => {
    await MediaLibrary.deleteAssetsAsync(this.state.selected)
    this.setState({
      nosel: true
    })
    await this.refreshGallery()
  }

  select = (id) => {
    try{
      if((this.state.selected).includes(id) == true){
        this.setState({
          selected : (this.state.selected).filter(v => v !== id)
        })
      }else{
        xd = (this.state.selected)
        xd.push(id)
        this.setState({
          selected : xd
        })
      }
    }catch{}
    console.log(this.state.selected)
}

  render() {
    return (
      <View style={styles.con}>
        <View  style={styles.container}>
          <View style={{flex:1,flexDirection:'row'}}>
            <MyButton 
              text='display'
              style={styles.bt}
              textstyle={styles.bttext}
              func={() => {
                this.dispaly()
              }}
            ></MyButton>
            <MyButton 
              text='camera'
              style={styles.bt}
              textstyle={styles.bttext}
              func={() => {
                this.camera()
              }}
            ></MyButton>
            <MyButton 
              text='remove'
              style={styles.bt}
              textstyle={styles.bttext}
              func={() => {
                this.remove()
              }}
            ></MyButton>
          </View>
          <View style={styles.list}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.flat}
              numColumns={this.state.display}
              key = {(this.state.display == 3 ? 123 : 321)}
              data = {this.state.data}
              renderItem={({ item }) => 
                <Iteam
                nosel = {this.state.nosel}
                noselfun = {()=>{this.setState({nosel:false})}}
                onSelect={() => this.select(item.id)}
                photo = {() => this.photo(item.id,item.uri,item.width,item.height)}
                id = {item.id}
                uri = {item.uri}
                style = {{
                }}
                styleimg = {{
                  borderRadius: 20,
                  width : (Dimensions.get("window").width / this.state.display)-8,
                  height : Dimensions.get("window").height / 5, 
                  marginLeft: 6,
                  marginBottom: 6,
                }}
                styleimgsel = {{
                  borderRadius: 20,
                  width : (Dimensions.get("window").width / this.state.display)-8,
                  height : Dimensions.get("window").height / 5, 
                  marginLeft: 6,
                  marginBottom: 6,
                  opacity : 0.3
                }}
                ></Iteam>}
              keyExtractor={(item, index) => index.toString()}
              />
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
    bt: {
      margin: '4%',
      width: '25%',
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
    list: {
      flex: 8, 
      width: '100%',
    },
    flat: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      // width: "92%",
      // marginLeft: '5%',
      // marginTop: '3%',
    },
})
