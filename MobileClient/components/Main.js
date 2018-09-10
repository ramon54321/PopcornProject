import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Tabs from "./Tabs";
import { transactionsList, getCoinValue, getBalance } from "../api";
import actions from "../redux/actions";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      askPage: "",
      balance: this.props.balance,
      value: false
    };
  }

  askNewBalance = async () => {
    const newBalance = await getBalance();
    if (this.props.balance !== newBalance.balance) {
      this.props.saveUserBalance(newBalance.balance);
    }
  };

  askCoinValue = async () => {
    const coinValue = await getCoinValue();
    const roundedValue = coinValue.value.toFixed(3);
    if (coinValue.value) {
      this.setState({
        value: true,
        coin: roundedValue
      });
    }
  };

  componentWillMount() {
    this.askCoinValue();
    this.getListOfTransactions();
    this._sub = this.props.navigation.addListener(
      "willFocus",
      this.getListOfTransactions
    );
    this._sub2 = this.props.navigation.addListener(
      "willFocus",
      this.askNewBalance
    );
  }

  getListOfTransactions = async () => {
    const response = await transactionsList();
    const requests = response.requests;
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
    return (
      <View style={styles.mainView}>
        <TouchableOpacity style={styles.balance} onPress={this.askNewBalance}>
          <Text style={styles.buttonText}> Refresh </Text>
        </TouchableOpacity>
        <View style={styles.view1}>
          <Text style={styles.text}>{`${this.props.balance} $`}</Text>
          {this.state.value ? (
            <Text style={styles.valueText}>{`Coin value: ${
              this.state.coin
            } €`}</Text>
          ) : (
            ""
          )}
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
    },
    saveUserBalance: balance => {
      const action = {
        type: actions.SAVE_BALANCE,
        payload: balance
      };
      dispatch(action);
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

const styles = StyleSheet.create({
  text: {
    color: "#663300",
    fontSize: 85,
    fontWeight: "bold"
  },
  valueText: {
    color: "#663300",
    fontSize: 25,
    top: 110
  },
  balance: {
    alignSelf: "flex-end",
    backgroundColor: "#d9b18c",
    width: 110,
    height: 45,
    marginTop: 10,
    marginRight: 10,
    padding: 5,
    alignItems: "center",
    borderRadius: 30
  },
  view1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 25,
    color: "#663300",
    fontWeight: "bold"
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
