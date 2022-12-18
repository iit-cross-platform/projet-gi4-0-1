import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CardTravel } from "@my-workspace/my-ui";

import TravelList from '../components/TravelList';


const HomeTravel = ({navigation}) => {
    const [listTravel  ] = useState([{
        source : "https://reactnative.dev/img/tiny_logo.png",
        description : "Rp 150.000/Day",
        title : "Camp Batu Gede",
        adress : "Cisarua, Bogor", 
        star : "4.9"
      }, 
      {
        source : "https://reactnative.dev/img/tiny_logo.png",
        description : "Rp 150.000/Day",
        title : "Camp Batu Gede",
        adress : "Cisarua, Bogor", 
        star : "4.9"
      },
      {
        source : "https://reactnative.dev/img/tiny_logo.png",
        description : "Rp 150.000/Day",
        title : "Camp Batu Gede",
        adress : "Cisarua, Bogor", 
        star : "4.9"
      }] ) 

  return (
    <View>
           <Button title="GO BACK" onPress={() => {
                navigation.goBack()
            }} />
        <Text>Title 1</Text>

        <TravelList list={listTravel}></TravelList>
        <Text>Title 2</Text>

        <TravelList list={listTravel}></TravelList>

   

    </View>
  )
}

export default HomeTravel

const styles = StyleSheet.create({})