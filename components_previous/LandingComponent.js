import React, { Component } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { baseUrl } from "../shared/baseUrl";

class Landing extends Component {
  render() {
    const {navigate} = this.props.navigation;
    const styles = StyleSheet.create({
      image: {
        width: "100%",
        height: "100%",
        flexGrow: 1,
        justifyContent: "center",
      },
      text: {
        marginTop: 50,
        textAlign: "center",
        backgroundColor: "transparent",
        fontWeight: "bold",
        color: "#fff",
        fontSize: 30,
      },
      subtext:{
        textAlign: "center",
        backgroundColor: "transparent",
        fontWeight:"bold",
        color: "#fff",
        fontSize: 25,
      },
      button: {
        width: "50%",
        marginTop: 10,
        marginLeft: "25%",
        backgroundColor: "#ec407a",
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "transparent",
        flexDirection: "row",
        justifyContent: "center",
      },
    });
    return (
      <View style={{ backgroundColor: "transparent" }}>
        <ImageBackground
          source={{ uri: baseUrl + "images/landing-page-bg.jpg" }}
          style={styles.image}
        >
          <Text style={styles.text}>WELCOME TO PASTEL</Text>
          <Text style={styles.subtext}>Library</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("LoginScreen")}
          >
            <Text>I already have Account...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Register")}
          >
            <Text>Register...</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
export default Landing;
