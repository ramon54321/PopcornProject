import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import SendPage from "./SendPage";
import AskPage from "./AskPage";
import { StackNavigator } from "react-navigation";
import { transactionsList } from "../api";

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: []
    };
    this.renderTabs = this.renderTabs.bind(this);
  }

  componentWillMount() {
    this.renderTabs();
  }

  navigate = i => async () => {
    const navigation = this.props.navigation;
    console.log(this.props);
    if (this.props.pages[i] == "Back") {
      navigation.goBack();
    } else if (typeof this.props.pages[i] === "function") {
      this.props.pages[i]();
    } else {
      navigation.navigate(this.props.pages[i]);
    }
  };

  renderTabs() {
    let newTabs = [];
    const navigation = this.props.navigation;
    for (let i = 0; i < this.props.names.length; i++) {
      newTabs.push(
        <TouchableOpacity key={i} style={styles.tab} onPress={this.navigate(i)}>
          <Text style={styles.text}> {this.props.names[i]} </Text>
        </TouchableOpacity>
      );
    }

    this.setState({
      tabs: newTabs
    });
  }

  render() {
    return <View style={styles.view}>{this.state.tabs}</View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "#d9b18c",
    height: 75,
    marginTop: 10,
    padding: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#663300",
    fontSize: 25,
    fontWeight: "bold"
  },
  view: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center"
  }
});
