import React, { Component } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import Tabs from "./Tabs";

class Main extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.mainView}>
        <View style={styles.view1}>
          <Text style={styles.text}>27 $</Text>
          <Text
            style={styles.text}
            onPress={async () => {
              await AsyncStorage.removeItem("nickname");
              this.props.navigation.navigate("SignedOut");
            }}
          >
            Logout
          </Text>
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

const mapStateToProps = store => ({
  user: store.user
});

export default connect(mapStateToProps)(Main);

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
