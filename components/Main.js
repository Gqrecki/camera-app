import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import MyButton from './MyButton';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.v}>
          <View style={styles.v1}>
              <Text style={styles.vtext}>Cam-App</Text>
              <Text style={styles.vtext2}> ale to tylko apka do DS'a :P</Text>
          </View>

        <View style={styles.v2}>
          <MyButton 
                  style={styles.bt}
                  textstyle={styles.bttext}
                  text="Start" 
                  func={() => {
                      this.props.navigation.navigate("Gallery")
                  }}
              >
            </MyButton>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    v: {
        flex: 1,
        backgroundColor: "#47ffcc",
    },
    vtext: {
        fontSize: 50,
        color: "#636363",
        fontWeight: 'bold',
    },
    vtext2: {
        fontSize: 16,
        color: "#636363",
        fontWeight: 'bold',
    },
    v1: {
        flex: 2,
        backgroundColor: "#47ffcc",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    v2: {
        flex: 2,
        backgroundColor: "#636363",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bt: {
        margin: '4%',
        width: '40%',
        padding: 10,
        backgroundColor: "#47ffcc",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    bttext: {
        fontSize: 20,
        color: "#636363",
        fontWeight: 'bold',
    }
 })

