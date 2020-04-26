import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, TouchableNativeFeedbackComponent, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicon } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-material-tabs";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favourites: FavouritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (iconInfo) => {
        return (
          <Ionicon name="ios-resturant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarlabel: Platoform.OS === 'android' ? <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text> : 'Meals'
    },
  },
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favourites!",
      tabBarIcon: (iconInfo) => {
        return <Ionicon name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarlabel: Platoform.OS === 'android' ? <Text style={{ fontFamily: "open-sans-bold" }}>Favourites</Text> : 'Favourites'
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans",
          },
          activeTintColor: Colors.accentColor,
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    //   navigationOptions: {
    //       drawerLabel: 'Filters!!'
    //   },
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerabel: "Meals",
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);

export default createAppContainer(MainNavigator);
