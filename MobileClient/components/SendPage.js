import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import Tabs from "./Tabs";
import Main from "./Main";
import { StackNavigator } from "react-navigation";

export default class SendPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [null, null, null, null],
      text: ""
    };

    this.showAlert = this.showAlert.bind(this);
    this.back = this.back.bind(this);
  }
  inputs = [];

  showAlert() {
    Alert.alert("Confirmation window", "Do you want send money?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  }

  back() {
    console.log("back");
  }

  handleTextInputChange = (value, index) => {
    if (!value) return;
    const currentValues = [...this.state.values];
    currentValues[index] = value;

    this.setState(
      {
        values: currentValues
      },
      () => {
        if (index !== 3) {
          this.inputs[index + 1].focus();
        } else {
          this.inputs[index].blur();
          this.setState({
            text: "Send 5$ to HannuBoy "
          });
        }
      }
    );
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.view1}>
          <View style={styles.inputContainer}>
            <TextInput
              editable={true}
              ref={ref => this.inputs.push(ref)}
              maxLength={1}
              onChangeText={code => this.handleTextInputChange(code, 0)}
              style={styles.input}
            />
            <TextInput
              editable={true}
              ref={ref => this.inputs.push(ref)}
              maxLength={1}
              onChangeText={code => this.handleTextInputChange(code, 1)}
              style={styles.input}
            />
            <TextInput
              editable={true}
              ref={ref => this.inputs.push(ref)}
              maxLength={1}
              onChangeText={code => this.handleTextInputChange(code, 2)}
              style={styles.input}
            />
            <TextInput
              editable={true}
              ref={ref => this.inputs.push(ref)}
              maxLength={1}
              onChangeText={code => this.handleTextInputChange(code, 3)}
              style={styles.input}
            />
          </View>
          <Text style={styles.text}>{this.state.text}</Text>
        </View>

        <Tabs
          names={["Back", "Confirm"]}
          pages={["Back", "Back"]}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

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
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    width: 60,
    height: 60,
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
