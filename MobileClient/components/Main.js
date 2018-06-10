import React, { Component } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import Tabs from "./Tabs";
import { transactionsList, confirmTransaction } from "../api";
import actions from "../redux/actions";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      askPage: ""
    };
  }

  componentWillMount() {
    this.getListOfTransactions();
    this._sub = this.props.navigation.addListener(
      "willFocus",
      this.getListOfTransactions
    );
  }

  getListOfTransactions = async () => {
    const response = await transactionsList();
    console.log("responese", response);
    const requests = response.requests;
    console.log(requests);
    this.props.saveUserRequests(requests);
    if (response.requests.length > 0) {
      this.setState({
        askPage: "AskList"
      });
    } else {
      this.setState({
        askPage: "AskPage"
      });
    }
    console.log(this.state.askPage);
  };

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Text
        onPress={async () => {
          await AsyncStorage.removeItem("nickname");
          navigation.navigate("SignedOut");
        }}
        style={styles.headerLeftText}
      >
        Logout
      </Text>
    )
  });
  render() {
    console.log(this.props);
    return (
      <View style={styles.mainView}>
        <View style={styles.view1}>
          <Text style={styles.text}>{`${this.props.balance} $`}</Text>
        </View>

        <Tabs
          names={["Send", "Ask"]}
          pages={["SendPage", this.state.askPage]}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user,
  balance: store.balance,
  requests: store.requests
});

const mapDispatchToProps = dispatch => {
  return {
    saveUserRequests: requests => {
      const action = {
        type: actions.SAVE_REQUESTS,
        payload: {
          requests
        }
      };
      dispatch(action);
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  text: {
    color: "#663300",
    fontSize: 85,
    fontWeight: "bold"
  },
  view1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mainView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeftText: {
    marginLeft: 10
  }
});
