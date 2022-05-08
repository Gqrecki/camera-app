import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Camera } from "expo-camera";
import { BackHandler } from "react-native"
import CircleButton from './CircleButton';
import { StyleSheet } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import { Animated , Dimensions } from "react-native";
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
      type: Camera.Constants.Type.front,  // typ kamery
      pos: new Animated.Value(Dimensions.get("window").height),  //startowa pozycja y wysuwanego View
      ratio:null,
      wb:'auto',
      ps:null,
      fm:'auto',
      sizes:null,
      options:[]
    };
    this.isHidden = true;
    this.getSizes()
  }

  async componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    let { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status == 'granted' });
  }

  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = async() => {
    await this.props.route.params.refresh()
    this.props.navigation.goBack()
}

  swap = () => {
    this.setState({
    type: this.state.type === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    });
  }

  photo = async() => {
    if (this.camera) {
      let foto = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
      await this.props.route.params.refresh()
    }
  }

  animate=()=> {
    let toPos=0;
    if (this.isHidden) toPos = 0; else toPos = Dimensions.get("window").height
    Animated.spring(
        this.state.pos,
        {
            toValue: toPos,
            velocity: 1,
            tension: 0,
            friction: 10,
            useNativeDriver:true
        }
    ).start();
    this.isHidden = !this.isHidden;
  }

  getSizes = async (ratio) => {
      if (this.camera) {
          const sizesss = await this.camera.getAvailablePictureSizesAsync(ratio)
          let fm = Object.keys(Camera.Constants.FlashMode);
          let wb = Object.keys(Camera.Constants.WhiteBalance);
          this.setState({
              options:[{"ratio":['16:9','4:3']},{"FlashMode":fm},{'WhiteBalance':wb},{'sizes':sizesss}],
          })
      }
  };

  setOptions = (optionName,optionToSet)=>{
    if(optionName=="ratio"){
        this.getSizes(optionToSet)
        this.setState({ratio:optionToSet})
    }else if(optionName=="FlashMode"){
        this.setState({fm:optionToSet})
    }else if(optionName=="WhiteBalance"){
        this.setState({wb:optionToSet})
    }else if(optionName=="sizes"){
        this.setState({ps:optionToSet})
    }
  }

  renderItem=({item})=>{
    let entry = Object.keys(item)
    let title = entry[0]
    let value = Object.values(item)
    let data=value[0]
    return <RadioGroup data={data} title={title} onPress={this.setOptions}  />
  }

  render() {
    const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
    if (hasCameraPermission == null) {
        return <View />;
    } else if (hasCameraPermission == false) {
        return <Text>brak dostępu do kamery</Text>;
    } else {
        return (
          <View style={{flex:1, backgroundColor: '#636363'}}>
            <View style={{ flex: 6, justifyContent: 'center', backgroundColor: '#47ffcc', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                <Camera
                    ref={ref => {
                        this.camera = ref; // Uwaga: referencja do kamery używana później
                    }}

                    onCameraReady={ () =>{
                            
                      this.getSizes('16:9')      
                      let fm = Object.keys(Camera.Constants.FlashMode);
                      let wb = Object.keys(Camera.Constants.WhiteBalance);
                      this.setState({
                          options:[{"ratio":['16:9','4:3']},{"FlashMode":fm},{'WhiteBalance':wb},{'sizes':this.state.sizes}],
                      })
                        this.setState({ratio:'16:9', wb:'auto', ps:'auto', fm:"auto"})
                    }}
                    
                    getSizes={this.state.ratio}
                    ratio={this.state.ratio}
                    whiteBalance={this.state.wb}
                    pictureSize={this.state.ps}
                    flashMode={this.state.fm}

                    style={
                    this.state.ratio == "16:9"
                    ?
                      {height: Dimensions.get("window").width * 16/9, width: Dimensions.get("window").width}
                    :
                      {height: Dimensions.get("window").width * 4/3 , width: Dimensions.get("window").width}
                    }

                    type={this.state.type}>

                </Camera>
                <Animated.View

                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateY: this.state.pos }
                            ]
                        }]} >
                    <Text style={{textAlign:'center', color:'#47ffcc'}}>SETTINGS</Text>
                    {/* <FlatList
                        data={this.state.options}
                        renderItem={this.renderItem}
                        keyExtractor={item => Object.keys(item)}
                        numColumns={1}
                        key={1}
                        />       */}
                        {
                        this.state.options.length>0?
                        <ScrollView>
                        <RadioGroup data={this.state.options[0].ratio} title={"ratio"} onPress={this.setOptions}  />
                        <RadioGroup data={this.state.options[1].FlashMode} title={"FlashMode"} onPress={this.setOptions}  />
                        <RadioGroup data={this.state.options[2].WhiteBalance} title={"WhiteBalance"} onPress={this.setOptions}  />
                        <RadioGroup data={this.state.options[3].sizes} title={"sizes"} onPress={this.setOptions}  />
                        </ScrollView>:
                        <Text>Wait...</Text>
                    }
                </Animated.View>

            </View>
                    <View style={styles.component}>
                        <CircleButton
                        style = {styles.main}
                        func = {() => this.swap()}
                        source = {require('./refresh.png')}
                        imgstyle = {styles.img}
                        ></CircleButton>

                        <CircleButton
                        style = {styles.main}
                        func = {() => this.photo()}
                        source = {require('./photo-camera.png')}
                        imgstyle = {styles.img}
                        ></CircleButton>

                        <CircleButton
                        style = {styles.main}
                        func = {() => this.animate()}
                        source = {require('./settings.png')}
                        imgstyle = {styles.img}
                        ></CircleButton>
                    </View>
            </View>
            
        );
    }
}
}

const styles = StyleSheet.create({
  empty: {
    flex: 6
  },
  component: {
    backgroundColor: '#47ffcc',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    height: 50,
    width: 50,
  },
  main: {
    height: 70,
    width: 70,
    borderRadius: 20,  
    backgroundColor: '#636363',  
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  animatedView: {
    position: "absolute",
    bottom: 0,
    left: '50%',
    top:0,
    right: 0,
    backgroundColor: "#636363",
    height: Dimensions.get("window").height * 0.8,
    opacity:0.6
    
}
})
