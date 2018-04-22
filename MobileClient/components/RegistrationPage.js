import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import {
  register,
  nickname,
  logout,
  login,
  balance,
  askTransaction,
  transactionsList,
  getTransactionByCode
} from "../api";

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
      checkPassword: "",
      inputStyle: styles.input,
      checkPassText: styles.hidden,
      checkNickText: false,
      error: false,
      text: ""
    };
    this.createNewAccount = this.createNewAccount.bind(this);
  }

  checkPassword = () => {
    const { nickname, password, checkPassword } = this.state;
    if (password === "" && checkPassword === "") {
      this.setState({
        checkPassText: styles.hidden
      });
    }
    if (password !== checkPassword) {
      this.setState({
        checkPassText: styles.redText,
        error: true,
        text: "The passwords are not the same!"
      });
    } else {
      this.setState({
        checkPassText: styles.hidden,
        error: false
      });
    }
  };

  checkName = async () => {
    const response = await nickname(this.state.nickname);
    console.log("kek");
    console.log(response);
    console.log(this.state.checkNickText);
    if (response && response.success) {
      this.setState({
        inputStyle: styles.redInput,
        checkNickText: true,
        error: true,
        text: "Nickname already exists"
      });
    } else {
      this.setState({
        inputStyle: styles.input,
        checkNickText: false,
        error: false
      });
    }
  };

  createNewAccount = async () => {
    const { nickname, password, checkPassword } = this.state;
    this.checkPassword();
    if (nickname === "" || password === "" || checkPassword !== password)
      return;

    const response = await register(nickname, password);
    if (response.success) {
      this.props.navigation.navigate("Login");
      this.setState({
        error: false
      });
    } else {
      this.setState({
        error: true,
        text: "Something went wrong!"
      });
    }
  };

  render() {
    return (
      <View style={styles.view}>
        <View>
          <Text style={styles.header}>Registration</Text>
        </View>
        <View>
          <Text style={styles.text}>Nickname</Text>
          <TextInput
            placeholder={"Nickname"}
            autoCorrect={false}
            autoCapitalize="none"
            onEndEditing={this.checkName}
            editable={true}
            maxLength={40}
            onChangeText={nickname => this.setState({ nickname })}
            style={this.state.inputStyle}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder={"Password"}
            editable={true}
            maxLength={40}
            onContentSizeChange={this.checkPassword}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            style={styles.input}
          />
          <Text style={styles.text}>Repeat Password</Text>
          <TextInput
            placeholder={"Repeat Password"}
            editable={true}
            maxLength={40}
            onContentSizeChange={this.checkPassword}
            onChangeText={checkPassword => this.setState({ checkPassword })}
            secureTextEntry={true}
            style={styles.input}
          />
          {this.state.error ? (
            <Text style={styles.redText}>{this.state.text}</Text>
          ) : (
            ""
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={this.createNewAccount}>
          <Text style={styles.buttonText}> Create Account </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hidden: {
    opacity: 0
  },
  redText: {
    color: "#FF0000",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 5
  },
  text: {
    color: "#331a00",
    fontSize: 25,
    marginTop: 10
  },
  button: {
    backgroundColor: "#663300",
    width: 300,
    height: 45,
    marginTop: 10,
    padding: 5,
    alignItems: "center",
    borderRadius: 20
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
  redInput: {
    borderColor: "#FF0000",
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
