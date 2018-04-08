import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import SendPage from "./SendPage";

export default class Main extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>27 $</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#663300",
    fontSize: 65,
    fontWeight: "bold"
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
