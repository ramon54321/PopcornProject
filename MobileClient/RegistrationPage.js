import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default class RegistrationPage extends Component {
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
        <View>
          <Text
            style={{
              fontSize: 45,
              color: "#331a00"
            }}
          >
            Registration
          </Text>
        </View>
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
            secureTextEntry={true}
            style={styles.input}
          />
          <Text style={styles.text}>Repeat Password</Text>
          <TextInput
            placeholder={"Reapest Password"}
            editable={true}
            maxLength={40}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text style={styles.buttonText}> Create Account </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#331a00",
    fontSize: 25,
    marginTop: 10
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
  }
});
