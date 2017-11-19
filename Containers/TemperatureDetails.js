import React from 'react';
import { StyleSheet, View,TouchableWithoutFeedback,TouchableOpacity,Image,Dimensions } from 'react-native';

import { Grid, Col, Container, Button, Text, Header, 
  Title, Content, Footer, FooterTab, Left, Right, Body,
   Icon,Card,CardItem } from 'native-base';
import {AppLoading} from "expo";
import { Feather ,MaterialCommunityIcons, Entypo,MaterialIcons,Ionicons} from '@expo/vector-icons';
var {height, width} = Dimensions.get('window');
import moment from 'moment';


export default class TemperatureDetails extends React.Component {
  state = { weather: false};

  componentDidMount() {
     const {params} = this.props.navigation.state;
     this.setState({weather:params.info})
  }

  kelvinToCelsius(temp) {
    return Math.floor((temp-273.15)*10)/10;
  }
  
  render() {  
    const {params} = this.props.navigation.state;

    if (!this.state.weather) {

      return <AppLoading/>;
    }
    let date = null;
    if(this.state.weather && this.state.weather.dt_txt) 
      date = moment(this.state.weather.dt_txt,"YYYY-MM-DD HH:mm:ss").format("MMM DD HH:mm")
    let image_icon_url ='http://openweathermap.org/img/w/' + this.state.weather.weather[0].icon + '.png';
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
          <Card style={{flex: 0}}>
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
                <Body>
                <Text>
                
                  {this.state.weather.weather[0].main}

                  </Text>
                  <Text note>{this.state.weather.weather[0].description}</Text>
                </Body>
              </Left>
              <Right>{this.state.weather.weather[0].icon && 
                  <Image
                  source={{uri:image_icon_url}}
                  style={{width: 50, height: 50, flex: 1,alignSelf: 'flex-end'}}
                />}</Right>
            </CardItem>
            <CardItem>
             <Image source={{uri:params.city.image}} 
                style={{height: 200, width: width - 40, flex: 1}}/>
            </CardItem>
            <CardItem>
              
                
                <Left>
                  <Text>
                  <Feather name="wind" size={32} color="green" />
                    {" " + this.state.weather.wind.speed} m/sec
                  </Text>
                </Left>
                <Right>
                  <Text style={{marginTop:10}}>
                  <MaterialCommunityIcons name="temperature-celsius" size={32} color="red" />
                  {" " + this.kelvinToCelsius(this.state.weather.main.temp)}
                  </Text>
                

              {this.state.weather.clouds && 
                  <Text style={{marginTop:10}}>
                <Entypo name="cloud" size={32} color="lightblue" />
                 {" " + this.state.weather.clouds.all} %
                </Text>
              }
              </Right>
                
              
            </CardItem>
            <CardItem>
              <Left>
                
                  
                 
                
              </Left>
            </CardItem>
          </Card>
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
