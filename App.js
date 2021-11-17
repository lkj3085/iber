import React from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import About from "./components/restaurantDetail/About";
import RootNavigation from "./navigation";

export default function App() {
  return <RootNavigation />;
}
