import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItem";
import Viewcart from "../components/restaurantDetail/ViewCart";

export default function RestaurantDetail({ route, navigation }) {
  return (
    <View>
      <ScrollView>
        <About route={route} />
        <Divider width={1.8} style={{ marginVertical: 20 }} />
        <MenuItems restaurantName={route.params.name} />
      </ScrollView>
      <Viewcart navigation={navigation} restaurantName={route.params.name} />
    </View>
  );
}
