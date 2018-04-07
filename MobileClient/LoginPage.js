import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: ""
    };
    this.createNewAccount = this.createNewAccount.bind(this);
  }

  createNewAccount() {
    console.log("create new account");
  }
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.header}>Log in</Text>
        <View>
          <Text style={styles.text}>Nickname</Text>
          <TextInput
            placeholder={"Nickname"}
            editable={true}
            maxLength={40}
            onChangeText={nickname => this.setState({ nickname })}
            style={styles.input}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder={"Password"}
            editable={true}
            maxLength={40}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonText}> Log in </Text>
          </TouchableOpacity>
          <Text onPress={this.createNewAccount} style={styles.link}>
            Create a new account?
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#331a00",
    fontSize: 25,
    marginTop: 20
  },
  button: {
    backgroundColor: "#663300",
    width: 200,
    height: 40,
    marginTop: 10,
    padding: 5,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 25,
    color: "#fff"
  },
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    width: 300,
    height: 40,
    padding: 10
  },
  view: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  link: {
    color: "#663300",
    marginTop: 10
  },
  header: {
    fontSize: 45,
    color: "#331a00"
  }
});
