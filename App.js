import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Cities from './Containers/Cities.js'
import CityDetails from './Containers/CityDetails.js'
import TemperatureDetails from './Containers/TemperatureDetails.js'

const WadiWeatherApp = StackNavigator({
  Home: { screen: Cities },
  CityDetails: {screen: CityDetails},
  TemperatureDetails: {screen: TemperatureDetails}
});

export default class App extends React.Component {
  render() {
    return <WadiWeatherApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});