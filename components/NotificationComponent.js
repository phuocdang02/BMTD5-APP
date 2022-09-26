import React, { Component } from "react";
import { Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import { getDatabase, ref, child, onValue } from "firebase/database";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card>
          <Card.Title>Notification Center</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>Email: {this.state.email}</Text>
          <Button
            title=" Compose Email"
            buttonStyle={{ backgroundColor: "#FFCDD2" }}
            icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
            onPress={this.composeMailForBorrowDate}
          />
        </Card>
      </Animatable.View>
    );
  }

  componentDidMount() {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, "contact/"), (snapshot) => {
      const value = snapshot.val();
      this.setState({
        email: value.email,
      });
    });
  }

  /* Function Auto Send Mail when "borrowdate" || "returndate" is comming */
  composeMailForBorrowDate() {
    MailComposer.composeAsync({
      recipients: ["haphuocdang@gmail.com"],
      subject: "BORROW Reminder [7]days",
      body: "Class {name} borrow date is comming, please prepare available book",
    });
  }
  composeMailForReturnDate() {
    MailComposer.composeAsync({
      recipients: ["haphuocdang@gmail.com"],
      subject: "RETURN Reminder [7]days",
      body: "Class {name} return date is comming, please prepare available book",
    });
  }

  autocomposeMail(){
    if (this.state.borrowdate == 8 || this.state.returndate == 8) {
      
    } else {
      
    }
  }
}
export default Notification;
