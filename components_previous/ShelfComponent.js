import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { Text } from "react-native";
import * as Animatable from "react-native-animatable";

import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

//redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

class Shelf extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.books.isLoading) {
      return <Loading />;
    } else if (this.props.books.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      return (
        <FlatList
          data={this.props.books.books}
          renderItem={({ item, index }) => this.renderShelfItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
          style={{marginTop:50}}
        />
      );
    }
  }
  renderShelfItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <ListItem
          key={index}
          onPress={() => navigate("Bookdetail", { bookId: item.id })}
        >
          <Avatar source={{ uri: baseUrl + item.imageLink }} />
          <ListItem.Content>
            <ListItem.Title> {item.title} </ListItem.Title>
            <ListItem.Subtitle> {item.author} </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Animatable.View>
    );
  }
}
export default connect(mapStateToProps)(Shelf);
