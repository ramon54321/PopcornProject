import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SendPage from "./SendPage";

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
  renderTabs() {
    let newTabs = [];
    for (let i = 0; i < this.props.names.length; i++) {
      newTabs.push(
        <TouchableOpacity key={i} style={styles.tab} onPress={this.onPress}>
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
