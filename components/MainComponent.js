import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { Icon, Image } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { baseUrl } from "../shared/baseUrl";

import Landing from "./LandingComponent";
//import Home from "./HomeComponent";

function LandingNavigatorScreen() {
  const LandingNavigator = createStackNavigator();
  return (
    <LandingNavigator.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#FFCDD2" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <LandingNavigator.Screen
        name="Landing"
        component={Landing}
        options={({ navigation }) => ({
          headerTitle: "Landing",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </LandingNavigator.Navigator>
  );
}

function TabNavigatorScreen() {
  const TabNavigator = createBottomTabNavigator();
  return (
    <TabNavigator.Navigator initialRouteName="Login">
      <TabNavigator.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#ec407a",
        }}
      />
      <TabNavigator.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#ec407a",
        }}
      />
    </TabNavigator.Navigator>
  );
}

function ShelfNavigatorScreen() {
  const ShelfNavigator = createStackNavigator();
  return (
    <ShelfNavigator.Navigator
      initialRouteName="Shelf"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#FFCDD2" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ShelfNavigator.Screen
        name="Shelf"
        component={Shelf}
        options={({ navigation }) => ({
          headerTitle: "Shelf",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <ShelfNavigator.Screen
        name="Bookdetail"
        component={Bookdetail}
        options={{
          headerTitle: "Book Detail",
        }}
      />
    </ShelfNavigator.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#ec407a",
          height: 80,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: baseUrl + "images/logo.jpg" }}
            style={{ margin: 5, width: 80, height: 60, borderRadius: 50 }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            Pastel Library
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        icon={({ focused, size }) => (
          <Icon name="help" size={size} color={focused ? "#FFCDD2" : "#ccc"} />
        )}
        onPress={() => Linking.openURL("https://facebook.com/ha.phuocdang")}
      />
    </DrawerContentScrollView>
  );
}

function MainNavigatorScreen(props) {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{
        headerStyle: { backgourndColor: "#FFCDD2" },
        drawerStyle: { backgroundColor: "#fff" },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <MainNavigator.Screen
        name="LandingScreen"
        component={LandingNavigatorScreen}
        options={{
          title: "Landing",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="apple"
              type="font-awesome"
              size={size}
              color={focused ? "#FFCDD2" : "#ccc"}
            />
          ),
          drawerActiveTintColor: "#FFCDD2",
        }}
      />
      <MainNavigator.Screen
        name="ShelfScreen"
        component={ShelfNavigatorScreen}
        options={{
          title: "Shelf",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? "#FFCDD2" : "#ccc"}
            />
          ),
          drawerActiveTintColor: "#FFCDD2",
        }}
      />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
}
