import React from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";
import { logoutHandler } from "../api";

const style = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.loadUser();
  }

  async loadUser() {
    const nickname = await AsyncStorage.getItem("nickname");
    this.props.navigation.navigate(nickname ? "SignedIn" : "SignedOut");

    logoutHandler(this.props.navigation);
  }

  render() {
    return (
      <View style={style.view}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

export default AuthLoadingScreen;
