import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import SendPage from "./SendPage";
import Tabs from "./Tabs";
import { StackNavigator } from "react-navigation";
import AskPage from "./AskPage";

class Main extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.view1}>
          <Text style={styles.text}>27 $</Text>
        </View>

        <Tabs
          names={["Send", "Ask"]}
          pages={["SendPage", "AskPage"]}
          navigation={this.props.navigation}
        />
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

export default StackNavigator({
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
