import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { Card, Image } from "react-native-elements";
import * as Animatable from "react-native-animatable";

import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

class RenderItem extends Component {
  render() {
    if (this.props.isLoading) {
      return <Loading />;
    } else if (this.props.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      const item = this.props.item;
      if (item != null) {
        return (
          <Card>
            <Image
              source={{ uri: baseUrl + item.imageLink }}
              style={{
                width: "100%",
                height: 100,
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card.FeaturedTitle>{item.name || item.title }</Card.FeaturedTitle>
              <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
            </Image>
            <Text style={{ margin: 10 }}>{item.description}</Text>
          </Card>
        );
      }
      return <View />;
    }
  }
}

// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    books: state.books,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const book = this.props.books.books.filter(
      (book) => book.featured === true
    )[0];
    const promotions = this.props.leaders.leaders.filter(
      (promo) => promo.featured === false
    )[0];
    const leaders = this.props.leaders.leaders.filter(
      (leader) => leader.featured === true
    )[0];
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderItem
            item={book}
            isLoading={this.props.books.isLoading}
            errMess={this.props.books.errMess}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" duration={2000} delay={1000}>
          <RenderItem
            item={promotions}
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderItem
            item={leaders}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);
