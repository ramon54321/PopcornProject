import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import Tabs from "./Tabs";

export default class AskPage extends Component {
  constructor(props) {
    super(props);

    this.showAlert = this.showAlert.bind(this);
    this.back = this.back.bind(this);
    this.state = {
      isHash: false,
      hash: 2345
    };
  }
  inputs = [];

  showAlert() {
    this.setState({
      isHash: true
    });
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
          {this.state.isHash ? (
            <Text style={styles.text}>{this.state.hash}</Text>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                editable={true}
                ref={ref => this.inputs.push(ref)}
                maxLength={6}
                style={styles.input}
              />
              <Text style={styles.currency}>$</Text>
            </View>
          )}
        </View>

        <Tabs names={["Back", "Ask"]} functions={[this.back, this.showAlert]} />
      </View>
    );
  }
}

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
