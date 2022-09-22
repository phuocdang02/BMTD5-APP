import React, { Component } from "react";
import { View, Text, Alert, Button, TouchableOpacity } from "react-native";
import { Card, Divider, Input, CheckBox, Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { getDatabase, ref, child, get } from "firebase/database";

// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
import { loginUser } from "../redux/ActionCreators";
const mapDispatchToProps = (dispatch) => ({
  loginUser: (userinfo) => dispatch(loginUser(userinfo)),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signinGG: "Login with Google",
      username: "",
      password: "",
      remember: false,
    };
  }
  render() {
    return (
      <View
        style={{ backgroundColor: "#ffcdd2", width: "100%", height: "100%" }}
      >
        <View style={{ justifyContent: "center", margin: 20, marginTop: 50 }}>
          <Text
            style={{
              marginTop: 50,
              marginBottom: 50,
              textAlign: "center",
              fontSize: 25,
              color: "#ec407a",
              fontWeight: "bold",
            }}
          >
            WELCOME BACK,
          </Text>
          <Card.Divider />
          <Input
            placeholder="Username"
            placeholderTextColor={"#ec407a"}
            leftIcon={{
              name: "user-o",
              type: "font-awesome",
              color: "#ec407a",
            }}
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
          />
          <Input
            placeholder="Password"
            placeholderTextColor={"#ec407a"}
            leftIcon={{ name: "lock", type: "font-awesome", color: "#ec407a" }}
            secureTextEntry={true}
            keyboardType="numeric"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
              containerStyle={{ backgroundColor: null }}
              checkedColor={"#ec407a"}
              right
              checked={this.state.remember}
              onPress={() => this.setState({ remember: !this.state.remember })}
            />
            <Text style={{ color: "#ec407a" }}>Remember me</Text>
          </View>
          <View style={{ margin: 20 }}>
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
              onPress={() => this.handleLogin()}
            >
              <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "800" }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          <Card.Divider />
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#ec407a",
                borderRadius: 10,
                borderWidth: 5,
                borderColor: "transparent",
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => Alert.alert("This is for Login with Google")}
            >
              <Icon
                type="font-awesome"
                name="google"
                color={"#FFF"}
                style={{ paddingRight: 10 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "#fff",
                  fontWeight: "800",
                }}
              >
                {this.state.signinGG}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  componentDidMount() {
    if (
      this.props.users.userinfo &&
      this.props.users.userinfo.remember === true
    ) {
      this.setState({
        username: this.props.users.userinfo.username,
        password: this.props.users.userinfo.password,
        remember: this.props.users.userinfo.remember,
      });
    }
  }
  handleLogin() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "accounts/" + this.state.username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const account = snapshot.val();
          if (account.password === this.state.password) {
            const userinfo = {
              username: this.state.username,
              password: this.state.password,
              remember: this.state.remember,
            };
            this.props.loginUser(userinfo);
            this.props.navigation.navigate("HomeScreen");
          } else {
            alert("Invalid password!");
          }
        } else {
          alert("Invalid username!");
        }
      })
      .catch((error) => alert("Could not get data from firebase", error));
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
