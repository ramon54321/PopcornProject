import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import Tabs from "./Tabs";
import { getTransactionByCode, confirmTransaction, getNickname } from "../api";
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";

class SendPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [null, null, null, null],
      text: "",
      user: "",
      coins: "",
      hash: "",
      confirmed: false,
      visible: false
    };

    this.showAlert = this.showAlert.bind(this);
  }
  inputs = [];

  confirmRequest = async () => {
    this.setState({
      visible: true
    })
    const response = await confirmTransaction(this.state.hash);
    if (response.success) {
      this.setState({
        text: "You sent brownies!",
        values: [null, null, null, null],
        visible: false,
      });
    } else {
      this.setState({
        text: "Something went wrong!",
        visible: false,
      });
    }
  };

  showAlert() {
    Alert.alert(
      "Confirmation window",
      `Do you want send ${this.state.coins}$ to ${this.state.user}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: this.confirmRequest }
      ]
    );
  }

  handleTextInputChange = (value, index) => {
    const currentValues = [...this.state.values];
    currentValues[index] = value;
    if (value) {
      this.setState(
        {
          values: currentValues
        },
        async () => {
          if (index !== 3 && currentValues.includes(null)) {
            this.inputs[index + 1].focus();
          } else {
            this.inputs[index].blur();
            const code = currentValues.reduce((string, input) => {
              return string + input;
            }, "");
            const response = await getTransactionByCode(code);
            if (response.request) {
              if(response.request.amount <= this.props.balance){
                const nicknameResponse = await getNickname(response.request.userid);
                if(nicknameResponse){
                  this.setState({
                    text: `Send ${response.request.amount}$ to ${
                      nicknameResponse.user.nickname
                    } `,
                    user: nicknameResponse.user.nickname,
                    coins: response.request.amount,
                    hash: code
                  });
                }
              } else{
                this.setState({
                  text: `You can't send ${response.request.amount}$`
                });  
              }
            } else {
              this.setState({
                text: `The code is wrong! `
              });
            }
          }
        }
      );
    } else {
      this.setState({
        values: currentValues
      });
    }
  };



  render() {
    return (
      <View style={styles.mainView}>
        <Spinner visible={this.state.visible}/>
        <Text style={styles.balance}>{`${this.props.balance} $`}</Text>
        <View style={styles.view1}>
          <View style={styles.inputContainer}>
            <TextInput
              editable={true}
              ref={ref => this.inputs.push(ref)}
              underlineColorAndroid="transparent"
              maxLength={1}
              onChangeText={code => this.handleTextInputChange(code, 0)}
              style={styles.input}
              value={this.state.values[0]}
            />
            <TextInput
              editable={true}
              ref={ref => this.inputs.push(ref)}
              underlineColorAndroid="transparent"
              maxLength={1}
              onChangeText={code => this.handleTextInputChange(code, 1)}
              style={styles.input}
              value={this.state.values[1]}
            />
            <TextInput
              editable={true}
              ref={ref => this.inputs.push(ref)}
              underlineColorAndroid="transparent"
              maxLength={1}
              onChangeText={code => this.handleTextInputChange(code, 2)}
              style={styles.input}
              value={this.state.values[2]}
            />
            <TextInput
              editable={true}
              ref={ref => this.inputs.push(ref)}
              underlineColorAndroid="transparent"
              maxLength={1}
              onChangeText={code => this.handleTextInputChange(code, 3)}
              style={styles.input}
              value={this.state.values[3]}
            />
          </View>
          <Text style={styles.text}>{this.state.text}</Text>
        </View>

        <Tabs
          names={["Back", "Confirm"]}
          pages={["Back", this.showAlert]}
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

export default connect(mapStateToProps)(SendPage);

const styles = StyleSheet.create({
  text: {
    color: "#663300",
    fontSize: 35,
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
  balance: {
    color: "#663300",
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "flex-end"
  },
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    width: 70,
    height: 70,
    padding: 10,
    margin: 5,
    borderRadius: 4,
    fontSize: 50,
    textAlign: "center"
  },
  inputContainer: {
    height: 80,
    flexDirection: "row"
  }
});
