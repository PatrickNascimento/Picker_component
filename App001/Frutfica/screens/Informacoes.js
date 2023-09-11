import React, { Component } from 'react';
import { Dimensions, Image, FlatList, StyleSheet, View,WebView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons';
import axios from 'axios'
import { qrcode } from  './Scan'
import { Button, Divider, Input, Block, Text } from '../components';
import { Container, Header, Tab, Title,Tabs,Body, Left, Right, Content, FooterTab, TabHeading, Footer} from 'native-base'
import { theme, mocks } from '../constants';
import HTML from 'react-native-render-html';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('window');

class Product extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Button onPress={() => {}}>
          <Icon.Entypo name="dots-three-horizontal" color={theme.colors.gray} />
        </Button>
      )
    }
  }

  constructor(){
    super()
    
    this.state = {
        dados :[],
        id: [],
        titulo:[],
        variedade:[],
        descricao:[],
        categoria:[],
        calibre:[],
        tamanho:[],
        peso:[],
        nome_produtor:[],
        endereco:[],
        endereco_mapa:[],
        endereco_coordenadas:[],
        url_mapa:[],
        avaliacao:[],
        avaliacao_total:[],        
        fotos_fruta:[],
        fotos_produtor:[], 
        isModalVisible: true
      }     
      
    //this.onEventPress = this.onEventPress.bind(this)
    //this.renderSelected = this.renderSelected.bind(this)    
    }
   
    
    componentDidMount() {  
     
       // console.log(qrcode)    
        axios.get('endpoint da foxtrot') // copiado para Sincronização
        
        .then(res => {
          this.setState({dados: res.data.rastreamento});
          this.setState({ id : res.data.rastreamento.plantacao.tipo})           
          this.setState({ variedade : res.data.rastreamento.plantacao.variedade})           
          this.setState({ descricao : res.data.rastreamento.plantacao.descricao})           
          this.setState({ categoria : res.data.rastreamento.plantacao.categoria})           
          this.setState({ calibre : res.data.rastreamento.plantacao.calibre})   
          this.setState({ avaliacao_total : res.data.rastreamento.plantacao.avaliacao.total})               
          this.setState({ avaliacao : res.data.rastreamento.plantacao.avaliacao})               
          this.setState({ peso : res.data.rastreamento.plantacao.peso})           
          this.setState({ nome_produtor : res.data.rastreamento.produtor.nome})           
          this.setState({ endereco : res.data.rastreamento.produtor.endereco})           
          this.setState({ endereco_mapa : res.data.rastreamento.plantacao.localizacao})           
          this.setState({ fotos_fruta : res.data.rastreamento.plantacao.fotos})           

          console.log('Descrição :> '+this.state.descricao)

          //console.log('dados :> '+this.state.dados.plantacao.tipo)

          this.state = {selected: null} 
         
        }).catch(e => console.log('error no catch: ', e))
  };


  renderGallery() {
    const { product } = this.props;
    return (
         this.state.fotos_fruta.map(foto_fruta => (          
          <Image style = {[styles.image]} source={{uri: foto_fruta}} resizeMode="contain"/>
         ))            
    );
  }

  render() {
    const { navigation } = this.props;
    const { product } = this.props;

    return (
      
      <View style={{flex: 1}}>

      <ScrollView  style={{flex: 0.85}} showsVerticalScrollIndicator={false}>
       <Block style={{alignItems: 'center'}}>
          {this.renderGallery()}
         </Block>       
          
          {/**Produto */}

        <Block style={styles.product}>
          <Text h2 bold> {this.state.id}  </Text>         
          

          {/**Variedade */}

          <Block flex={false} row margin={[theme.sizes.base, 0]}>           
              <Text caption gray style={styles.tag}>
                 {this.state.variedade}
              </Text>                          
          </Block>         
          
          {/**Categoria */}
          
          <Divider margin={[theme.sizes.padding * 0.3, 0]} />
          
          
          <Text semibold>Categoria  </Text>            
          <Block flex={false} row margin={[theme.sizes.base, 0]}> 
          <Text caption gray style={styles.tag}>
                {this.state.categoria}
              </Text>                                            
          </Block>
          

          
          {/**Calibre */}

          <Divider margin={[theme.sizes.padding * 0.3, 0]} />
          
          <Text semibold>Calibre</Text>  
          
          <Block flex={false} row margin={[theme.sizes.base, 0]}>           
              <Text caption gray style={styles.tag}>
              {this.state.calibre}
              </Text>                          
          </Block>

           {/**peso */}

          <Divider margin={[theme.sizes.padding * 0.3, 0]} />
          
          <Text semibold>Peso</Text>  
          
          <Block flex={false} row margin={[theme.sizes.base, 0]}>           
                      
              <HTML html={this.state.peso} style={styles.tag}/>
            
          </Block>

           {/**Total de Avaliação */}

          <Divider margin={[theme.sizes.padding * 0.3, 0]} />
          
          <Text semibold>Total de Avaliações</Text>  
          
          <Block flex={false} row margin={[theme.sizes.base, 0]}>           
              <Text caption gray style={styles.tag}>              
                  {this.state.avaliacao_total}
              </Text>                          
          </Block>

             {/**Avaliação */}

          <Divider margin={[theme.sizes.padding * 0.3, 0]} />
          
          <Text semibold>Avaliações</Text>  
          
          <Block flex={false} row margin={[theme.sizes.base, 0]}>           
          <StarRating
            disabled={true}
            maxStars={5}
            rating={3}
            starSize={30}
            selectedStar={3}
           />  

          </Block>

           {/**Descricao */}

            <Divider margin={[theme.sizes.padding * 0.3, 0]} />
            <HTML html={this.state.descricao}/>


          <Block>
           
            
          </Block>
        </Block>
  </ScrollView>

  <View style={{flex: 0.15}}>     
        <View style={{paddingLeft: 10,paddingRight:10,flexDirection: 'row', justifyContent: 'space-between'}}>            
          <Button style={{width:150}} gradient >            
            <Text center semibold white>Plantacao</Text>
          </Button>          
          <Button style={{width:150}} gradient onPress={() => navigation.navigate('Product')}>
            <Text center semibold white>Informações</Text>
          </Button>

       </View>   
     </View>     

  </View>
  
  
    )
  }
}

Product.defaultProps = {
  product: mocks.products[0],
}

export default Product;

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  image: {
    width: width,
    height: height / 2.80,
    //marginRight: theme.sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  }
})
