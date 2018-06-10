import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, ListView } from "react-native";
import Tabs from "./Tabs";
import { transactionsList } from "../api";
import { connect } from "react-redux";

class List extends Component {
  formatDate = miliseconds => {
    const date = new Date(miliseconds);
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  render() {
    const requests = this.props.requests.requests;
    console.log("requests", requests);
    let rows = requests.map(row => (
      <View key={row.creationDate} style={styles.row}>
        <Text style={styles.text}>{`${row.amount} $`}</Text>
        <Text style={styles.text}>{row.code}</Text>
      </View>
    ));
    return (
      <View style={styles.mainView}>
        <View style={styles.view1}>
          <Text style={styles.header}>List of requests</Text>
          <View style={styles.list}>{rows}</View>
        </View>
        <Tabs
          names={["Back", "Ask"]}
          pages={["Back", "AskPage"]}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  requests: store.requests
});

export default connect(mapStateToProps)(List);

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
