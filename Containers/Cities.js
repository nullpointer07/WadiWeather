import React from 'react';
import { StyleSheet, View,TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import CitiesGridView from '../Components/CitiesGridView.js'

import { Grid, Col, Container, Button, Text, Header, 
  Title, Content, Footer, FooterTab, Left, Right, Body, Icon } from 'native-base';
var cities = require('../jsons/cities.json').cities;
import {AppLoading} from "expo";


export default class Cities extends React.Component {
  state = { fontsAreLoaded: false, columns_number:2 };
  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      })
      this.setState({fontsAreLoaded: true});

  }

  onCityPress(city) {
    console.log("onCityPress",city)
    const { navigate } = this.props.navigation;
    navigate('CityDetails',{city:city})
  }
  
  render() {

     if (!this.state.fontsAreLoaded) {
      return <AppLoading/>;
    }
    return (
     
        <Container>
        <Header>
          <Left>
         
            <Button transparent  onPress={()=>{
              if(this.state.columns_number==1)this.setState({columns_number:2});
              else if(this.state.columns_number==2)this.setState({columns_number:1});
            }}>
              <Icon name={this.state.columns_number==2?'md-list':'md-grid'} />
            </Button>
         
          </Left>
          <Body>
            <Title>Cities</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        
          <CitiesGridView onCityPress={this.onCityPress.bind(this)} columns={this.state.columns_number} cities={cities}/>
        
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
