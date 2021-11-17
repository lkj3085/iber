import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, StatusBar } from "react-native";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";

const YELP_API_KEY =
  "mlud6qhhHmlBifnjxzJhmk5oc2AcCBPcLWfHP_cFJj8Qt3YIkvbct7eJq3GUdrEXDKsnE624PfJY5RhjEtOixZDyVTlpgF55Yhbzu4px0lUunP2dX_c1hv9AilRyYXYx";

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  // return await axios
  //   .get(
  //     "https://api.yelp.com/v3/businesses/search?term=restaurants&location=LosAngeles",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${YELP_API_KEY}`,
  //       },
  //     }
  //   )
  //   .then((res) => setRestaurantData(res.businesses));

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
