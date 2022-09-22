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
      number: "",
      street: "",
      district: "",
      city: "",
      phone: "",
      fax: "",
      email: "",
    };
  }
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card>
          <Card.Title>Contact Information</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>
            {this.state.number}, {this.state.street}
          </Text>
          <Text style={{ margin: 10 }}>{this.state.district}</Text>
          <Text style={{ margin: 10 }}>{this.state.city}</Text>
          <Text style={{ margin: 10 }}>Tel: {this.state.phone}</Text>
          <Text style={{ margin: 10 }}>Fax: {this.state.fax}</Text>
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
        number: value.address.number,
        street: value.address.street,
        district: value.address.district,
        city: value.address.city,
        phone: value.phone,
        fax: value.fax,
        email: value.email,
      });
    });
  }
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
}
export default Notification;
