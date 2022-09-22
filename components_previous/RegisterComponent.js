import React, { Component } from "react";
import {
  ScrollView,
  View,
  Button,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { baseUrl } from "../shared/baseUrl";
import { getDatabase, ref, child, set } from "firebase/database";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: baseUrl + "images/logo.png",
      username: "",
      password: "",
    };
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#ffcdd2" }}>
        <View
          style={{
            justifyContent: "center",
            margin: 20,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", margin: 50 }}>
            <Image
              style={{ margin: 10, width: 80, height: 60 }}
              source={{ uri: this.state.imageUrl }}
            />
            <View style={{ justifyContent: "center" }}>
              <Button
                title="choose..."
                onPress={() => this.getImageFromCamera()}
                color="#ec407a"
              />
            </View>
          </View>
          <Input
            placeholder="Username"
            placeholderTextColor={"#ec407a"}
            leftIcon={{
              type: "font-awesome",
              name: "user-o",
              color: "#ec407a",
            }}
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
          />
          <Input
            placeholder="Password"
            placeholderTextColor={"#ec407a"}
            leftIcon={{ type: "font-awesome", name: "lock", color: "#ec407a" }}
            textContentType="password"
            secureTextEntry={true}
          accessibilityElementsHidden={true}
            keyboardType="numeric"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ec407a",
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: "#ec407a",
              }}
              onPress={() => this.handleRegister()}
            >
              <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "800" }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
  async getImageFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        this.setState({ imageUrl: capturedImage.uri });
      }
    }
  }
  handleRegister() {
    const dbRef = ref(getDatabase());
    set(child(dbRef, "accounts/" + this.state.username), {
      username: this.state.username,
      password: this.state.password,
    })
      .then(() => {
        alert("Ok baby!");
      })
      .catch((error) => alert("Could not set data from firebase", error));
  }
}
export default Register;
