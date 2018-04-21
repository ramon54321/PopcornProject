import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AppRegistry } from "react-native";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import Main from "./Main";
import SendPage from "./SendPage";
import ListView from "./ListView";
import { StackNavigator } from "react-navigation";
import "../api";
import AskPage from "./AskPage";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  render() {
    return <RegistrationPage />;
    // return <Main />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
