import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import SendPage from "./SendPage";
import Tabs from "./Tabs";

export default class Main extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.view1}>
          <Text style={styles.text}>27 $</Text>
        </View>

        <Tabs names={["Send", "Ask"]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#663300",
    fontSize: 85,
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
  }
});
