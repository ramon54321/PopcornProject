import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, StyleSheet, Text, View, AppRegistry } from "react-native";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import Main from "./Main";
import SendPage from "./SendPage";
import ListView from "./ListView";
import { StackNavigator, SwitchNavigator } from "react-navigation";
import "../api";
import AskPage from "./AskPage";
import AuthLoadingScreen from "./AuthLoadingScreen";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const SignedIn = StackNavigator({
  Main: {
    screen: Main
  },
  AskPage: {
    screen: AskPage
  },
  SendPage: {
    screen: SendPage
  }
});

const SignedOut = StackNavigator({
  Login: {
    screen: LoginPage
  },
  Register: {
    screen: RegistrationPage
  }
});

const App = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    SignedOut,
    SignedIn
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default App;
