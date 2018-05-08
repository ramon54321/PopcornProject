import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import Tabs from "./Tabs";

export default class SendPage extends Component {
  constructor() {
    super();

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
          <Text style={styles.header}>List of requests</Text>
          <View style={styles.list}>
            <View style={styles.row}>
              <Text style={styles.text}>65$</Text>
              <Text style={styles.text}>5:38</Text>
            </View>
          </View>
        </View>
        <Tabs names={["Back"]} functions={[this.back]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#663300",
    fontSize: 30,
    fontWeight: "bold"
  },
  view1: {
    flex: 1
  },
  list: {
    marginTop: 20
  },
  row: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "#663300",
    borderBottomWidth: 1,
    alignItems: "stretch"
  },
  mainView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  header: {
    fontSize: 45,
    color: "#663300",
    marginTop: 20
  },
  inputContainer: {
    height: 80,
    flexDirection: "row"
  }
});
