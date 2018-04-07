import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: ""
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Nickname</Text>
        <TextInput
          placeholder={"Nickname"}
          editable={true}
          maxLength={40}
          onChangeText={nickname => this.setState({ nickname })}
          style={{
            borderColor: "#000000",
            borderWidth: 1,
            width: 200,
            height: 40,
            padding: 10
          }}
        />
        <Text style={{ fontSize: 30 }}>Password</Text>
        <TextInput
          placeholder={"Password"}
          editable={true}
          maxLength={40}
          onChangeText={password => this.setState({ password })}
          style={{
            borderColor: "#000000",
            borderWidth: 1,
            width: 200,
            height: 40,
            padding: 10
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#663300",
            width: 200,
            height: 40,
            marginTop: 10,
            padding: 5,
            alignItems: "center"
          }}
          onPress={this.onPress}
        >
          <Text style={{ fontSize: 25, color: "#fff" }}> Log in </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
