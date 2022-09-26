import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    Modal,
    Button,
    PanResponder,
    Alert,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { Card, Icon, Rating, Input } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { baseUrl } from "../shared/baseUrl";
import { SliderBox } from "react-native-image-slider-box";

// redux
import { connect } from "react-redux";
import { postFavorite, postComment } from "../redux/ActionCreators";
const mapStateToProps = (state) => {
    return {
        books: state.books,
        comments: state.comments,
        favorites: state.favorites,
    };
};
const mapDispatchToProps = (dispatch) => ({
    postFavorite: (bookId) => dispatch(postFavorite(bookId)),
    postComment: (bookId, rating, author, comment) =>
        dispatch(postComment(bookId, rating, author, comment)),
});

class RenderSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 30,
            height: 0,
        };
    }
    render() {
        const images = [
            baseUrl + this.props.book.imageLink,
            baseUrl + "images/landing-page-bg.jpg",
        ];
        return (
            <Card onLayout={this.onLayout}>
                <SliderBox images={images} parentWidth={this.state.width - 30} />
            </Card>
        );
    }
    onLayout = (evt) => {
        this.setState({
            width: evt.nativeEvent.layout.width,
            height: evt.nativeEvent.layout.height,
        });
    };
}

class RenderBook extends Component {
    render() {
        // gesture
        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if (dx < -200) return 1; // right to left
            else if (dx > 200) return 2; // left to right
            return 0;
        };
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderEnd: (e, gestureState) => {
                if (recognizeDrag(gestureState) === 1) {
                    Alert.alert(
                        "Add Favorite",
                        "Are you sure you wish to add " + book.name + " to favorite?",
                        [
                            {
                                text: "Cancel",
                                onPress: () => {
                                    /* nothing */
                                },
                            },
                            {
                                text: "OK",
                                onPress: () => {
                                    this.props.favorite
                                        ? alert("Already favorite")
                                        : this.props.onPressFavorite();
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                } else if (recognizeDrag(gestureState) === 2) {
                    this.props.onPressComment();
                }
                return true;
            },
        });
        //render
        const book = this.props.book;
        if (book != null) {
            return (
                <Card {...panResponder.panHandlers}>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>{book.description}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Icon
                            raised
                            reverse
                            name={this.props.favorite ? "heart" : "heart-o"}
                            type="font-awesome"
                            color="#f50"
                            onPress={() =>
                                this.props.favorite
                                    ? alert("Already favorite")
                                    : this.props.onPressFavorite()
                            }
                        />
                        <Icon
                            raised
                            reverse
                            name="pencil"
                            type="font-awesome"
                            color="#f50"
                            onPress={() => this.props.onPressComment()}
                        />
                    </View>
                </Card>
            );
        }
        return <View />;
    }
}

class RenderComments extends Component {
    render() {
        const comments = this.props.comments;
        return (
            <Card>
                <Card.Title>Comments</Card.Title>
                <FlatList
                    data={comments}
                    renderItem={({ item, index }) => this.renderCommentItem(item, index)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Card>
        );
    }
    renderCommentItem(item, index) {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating
                    startingValue={item.rating}
                    imageSize={16}
                    readonly
                    style={{ flexDirection: "row" }}
                />
                <Text style={{ fontSize: 12 }}>
                    {"-- " + item.author + ", " + item.date}{" "}
                </Text>
            </View>
        );
    }
}

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 3,
            author: "",
            comment: "",
        };
    }
    render() {
        const bookId = parseInt(this.props.route.params.bookId);
        return (
            <View>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <View style={{ justifyContent: "center", margin: 20, marginTop: 50 }}>
                        <Rating
                            startingValue={this.state.rating}
                            showRating={true}
                            onFinishRating={(value) => this.setState({ rating: value })}
                        />
                        <View style={{ height: 20 }} />
                        <Input
                            value={this.state.author}
                            placeholder="Author"
                            leftIcon={{ name: "user-o", type: "font-awesome" }}
                            onChangeText={(text) => this.setState({ author: text })}
                        />
                        <Input
                            value={this.state.comment}
                            placeholder="Comment"
                            leftIcon={{ name: "comment-o", type: "font-awesome" }}
                            onChangeText={(text) => this.setState({ comment: text })}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Button
                                title="SUBMIT"
                                color="#7cc"
                                onPress={() => {
                                    this.submitComment(bookId);
                                    this.setState({ showModal: false });
                                }}
                            />
                            <View style={{ width: 10 }} />
                            <Button
                                title="CANCEL"
                                color="#7cc"
                                onPress={() => {
                                    this.setState({ showModal: false });
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{ marginTop: 30 }}>
                    <Animatable.View animation="flipInY" duration={2000} delay={1000}>
                        <RenderSlider book={this.props.books.books[bookId]} />
                    </Animatable.View>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <RenderBook
                            book={this.props.books.books[bookId]}
                            favorite={this.props.favorites.some((el) => el === bookId)}
                            onPressFavorite={() => this.markFavorite(bookId)}
                            onPressComment={() => this.setState({ showModal: true })}
                        />
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                        <RenderComments
                            comments={this.props.comments.comments.filter(
                                (comment) => comment.bookId === bookId
                            )}
                        />
                    </Animatable.View>
                </ScrollView>
            </View>
        );
    }
    markFavorite(bookId) {
        this.props.postFavorite(bookId);
    }

    submitComment(bookId) {
        this.props.postComment(
            bookId,
            this.state.rating,
            this.state.author,
            this.state.comment
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);