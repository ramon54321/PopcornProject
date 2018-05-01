import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import Tabs from "./Tabs";
import { askTransaction, transactionsList } from "../api";
import { connect } from "react-redux";
import actions from "../redux/actions";

class AskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: "",
      isHash: false,
      hash: ""
    };
  }

  confirmAsk = async () => {
    console.log(this.state.coins);
    const hash = await askTransaction(this.state.coins);
    console.log(hash.requestCode);
    this.setState({
      hash: hash.requestCode,
      isHash: true
    });

    const response = await transactionsList();
    this.props.saveUserRequests(response.requests);
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.view1}>
          {this.state.isHash ? (
            <Text style={styles.text}>{this.state.hash}</Text>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                editable={true}
                onChangeText={coins => this.setState({ coins })}
                maxLength={6}
                style={styles.input}
              />
              <Text style={styles.currency}>$</Text>
            </View>
          )}
        </View>

        <Tabs
          names={["Back", "Ask"]}
          pages={["Back", this.confirmAsk]}
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
export default connect(mapStateToProps, mapDispatchToProps)(AskPage);

const styles = StyleSheet.create({
  currency: {
    fontSize: 60
  },
  text: {
    color: "#663300",
    fontSize: 60,
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
  input: {
    borderColor: "#000000",
    borderBottomWidth: 1,
    width: 160,
    height: 80,
    padding: 10,
    margin: 5,
    borderRadius: 4,
    fontSize: 60,
    textAlign: "center"
  },
  inputContainer: {
    height: 80,
    flexDirection: "row"
  }
});
