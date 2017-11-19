import React from 'react';
import { StyleSheet, View,TouchableWithoutFeedback,TouchableOpacity,Image,Dimensions } from 'react-native';

import { Grid, Col, Container, Button, Text, Header, 
  Title, Content, Footer, FooterTab, Left, Right, Body,
   Icon,Card,CardItem } from 'native-base';
import {AppLoading} from "expo";
import { Feather ,MaterialCommunityIcons, Entypo, MaterialIcons,Ionicons} from '@expo/vector-icons';
var {height, width} = Dimensions.get('window');
import moment from 'moment';


export default class CityDetails extends React.Component {
  state = { weather: false, columns_number:2 };
  componentDidMount() {
    
  }
  async getCityWeather() {
    const {params} = this.props.navigation.state;
    try {
      let url = 'http://api.openweathermap.org/data/2.5/forecast?q='+
       params.city.name +'&appid=7fa58f90c8e317b0b1f51eceee3a53f6';
      let response = await fetch(url);
      let responseJson = await response.json();
      //console.log("responseJson 1",responseJson, url)
      this.setState({weather:responseJson})
    } catch(error) {
      console.error(error);
    }
  }
  onInfoClicked(info) {
    const {params} = this.props.navigation.state;
    console.log("onInfoClicked",info)
    const { navigate } = this.props.navigation;
    navigate('TemperatureDetails',{info:info, city:params.city})
  }
  componentDidMount() {
    this.getCityWeather();
  }

  kelvinToCelsius(temp) {
    return Math.floor((temp-273.15)*10)/10;
  }

  getTemperatureItems() {
    let weather_list = [];
    let total_weathers = this.state.weather.list.length;

    for(let i = 0 ; i < total_weathers;i++) {
      weather_list.push(this.getTemperatureItem(this.state.weather.list[i], i));
    }

    return weather_list;
  }

  getTemperatureItem(weather, i) {
    let date = null;
    if(weather && weather.dt_txt) 
      date = moment(weather.dt_txt,"YYYY-MM-DD HH:mm:ss").format("MMM DD HH:mm")
    console.log("date", weather.dt_txt, date)
    let image_icon_url ='http://openweathermap.org/img/w/' + 
    weather.weather[0].icon + '.png';
     return <Card key={i} style={{flex: 0}}>
            {date && <CardItem>
              <Left>
                <Text>
                 <MaterialIcons name="date-range"  color="black" size={24}/>
                {" " + date.toString().split(' ')[0] + " " + date.toString().split(' ')[1]}
                </Text>
              </Left>
              <Right>
                <Text note>
                 <Ionicons name="md-time"  color="black" size={24}/>
                {" " + date.toString().split(' ')[2]}
                </Text>
              </Right>
              </CardItem>}
            <CardItem>
              <Left>
                
                <Text>
                  {weather.weather[0].main}
                  </Text>
                  <Text note>{weather.weather[0].description}</Text>
                
              </Left>
              <Right>{weather.weather[0].icon && 
                  <Image
                  source={{uri:image_icon_url}}
                  style={{width: 50, height: 50, flex: 1}}
                />}
                </Right>
            </CardItem>
            <CardItem>
              <Left>
              <Text style={{marginTop:10}}>

                <MaterialCommunityIcons name="temperature-celsius" size={32} color="red" />
                {" " + this.kelvinToCelsius(weather.main.temp)}
                </Text>
                </Left>
                <Right>
                <Button onPress={()=>this.onInfoClicked(weather)} iconLeft info>
                  <Feather size={32} name='info' color="white" style={{marginLeft:10}}/>
                  <Text>Info</Text>
                </Button>
                </Right>
                
              
            </CardItem>
         
          </Card>
  }
  
  render() {  
    const {params} = this.props.navigation.state;

    if (!this.state.weather) {

      return <AppLoading/>;
    }
    
    return (
      
        <Container>
        <Header>
          <Left>
        
          </Left>
          <Body>
            <Title>{params.city.name}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {this.getTemperatureItems()}
        </Content>
        
        
        
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
