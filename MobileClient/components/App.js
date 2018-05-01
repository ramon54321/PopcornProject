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

const SignedIn = StackNavigator({
  Main: {
    screen: Main
  },
  AskPage: {
    screen: AskPage
  },
  SendPage: {
    screen: SendPage
  },
  AskList: {
    screen: ListView
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
