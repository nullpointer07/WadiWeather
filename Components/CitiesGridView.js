import React from 'react';
import { StyleSheet, View,Dimensions,Image, TouchableWithoutFeedback} from 'react-native';
const defaultCityImage = 'https://i.vimeocdn.com/portrait/58832_300x300.jpg';
import { Card, CardItem,Thumbnail, Grid, Col, 
  Container, Button, Text, Header, 
  Title, Content, Footer, FooterTab, Left, 
  Right, Body, Icon, List,ListItem  } from 'native-base';
var {height, width} = Dimensions.get('window');
export default class CitiesGridView extends React.Component {

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      })
  }
  getCityItem(city, i, number_colums){
    let image = city.image || defaultCityImage;
    return  <View key={i*1+1}>
                  
                  <TouchableWithoutFeedback onPress={()=>this.props.onCityPress(city)}>
                  <View>
                  <Text key={i*1+2}>
                  {city.name}
                  </Text>
                  <Image 
                  key={i}
                  source={{uri: image}} 
                  style={{height:  height/4, 
                    width: width/number_colums-30,margin:10 }}/>
                  </View>
                  </TouchableWithoutFeedback>
                 
            </View>
  }
  getCitiesColumn(row_data, number_colums, i){
  return <ListItem key={i*10+10} style={{ height: height/4,marginBottom:10 }}>
    {[...row_data]}
  </ListItem>
  }
  getCities(number_colums) {
    let row_data = [];
    let final_data = [];

    let total_cities = this.props.cities.length;
    for(let i =0;i < total_cities;i=i+number_colums) {
      row_data=[];
      for(let j =i;j < i+number_colums && j<total_cities ;j++) {
        row_data.push(this.getCityItem(this.props.cities[j], j, number_colums))
      }
      final_data.push(this.getCitiesColumn(row_data,number_colums,i))
    }
    return <List>{final_data}</List>;
    
  }
  render() {
    return (
      <View>
      {this.getCities(this.props.columns)}
     </View>
     
      
    );
  }
}

