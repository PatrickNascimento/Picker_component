import React, { Component } from 'react'
import { Vibration,Animated, Dimensions,View, Image, FlatList, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Button, Block, Text } from '../components';
import { theme } from '../constants';

var qrcode = '-'
const { width, height } = Dimensions.get('window');  
const qrSize = width * 0.7

  
  export default class Qrscan extends React.Component {

    

    static navigationOptions = {
      header: null,
    }
  
    state = {
  
       hasCameraPermission:null,
       showSuccess: false 
  
    }
  
    async componentWillMount() {
  
       const { status } =await Permissions.askAsync(Permissions.CAMERA);
  
       this.setState({hasCameraPermission:status==='granted'});
  
    }
  
    render() {
      const { navigation } = this.props;  
      const { hasCameraPermission } = this.state;
  
      if (hasCameraPermission === null) {
  
      return <Text>Requesting for camera permission</Text>;
  
      } else if (hasCameraPermission === false) {
  
      return <Text>No access to camera</Text>;
  
      } else {
  
          return ( 
            
  
         <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={[StyleSheet.absoluteFill, styles.container]}
         >
  
        <View style={styles.layerTop} />
           <View style={styles.layerCenter}>      
           <View style={styles.layerLeft}>
        </View>
        
        <View style={styles.focused}>
          <Image
            style={styles.qr}
            source={require('../assets/images/QR.png')}
          />
        </View>
        
        <View style={styles.layerRight} />
        </View>
  
        <View style={styles.layerBottom}/>
        <View>
        <Button gradient onPress={() => navigation.navigate('Scan')}>
            <Text center semibold white>Menu Principal</Text>
          </Button>
        </View>
         
      </BarCodeScanner>
              );
      }
      
  
    }
    
  
    _handleBarCodeRead = ( { type, data }) => {
          qrcode = data
          Vibration.vibrate(100);    
          const { navigation } = this.props; 
          navigation.navigate('Plantacao')   
          
     
    }
  }  
  
  const opacity = 'rgba(0, 0, 0, .7)';  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    layerTop: {
      flex: 2,
      backgroundColor: opacity
    },
    layerCenter: {
      flex: 4,
      flexDirection: 'row'
    },
    layerLeft: {
      flex: 1,
      backgroundColor: opacity
    },
    focused: {
      flex: 7
    },
    layerRight: {
      flex: 1,
      backgroundColor: opacity
    },
    layerBottom: {
      flex: 2,
      backgroundColor: opacity
    },
    qr: {
      marginTop: '2%',
      marginLeft:'5%',
      marginBottom: '5%',
      width: qrSize,
      height: qrSize,
    },
    description: {
      fontSize: width * 0.09,
      marginTop: '10%',
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    cancel: {
      fontSize: width * 0.05,
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    button: {
      backgroundColor: '#F0FFF0',
      borderColor: 'white',    
      fontSize: 14,    
      fontWeight: 'bold',
      overflow: 'hidden',
      padding: 12,
      textAlign:'center',
      
    },
  });
  
  export {qrcode}