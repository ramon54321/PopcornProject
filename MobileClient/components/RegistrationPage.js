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
import Spinner from "react-native-loading-spinner-overlay";

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
      checkPassword: "",
      nicknameError: false,
      passwordsError: false,
      visible: false
    };
    this.createNewAccount = this.createNewAccount.bind(this);
  }

  checkPassword = () => {
    const { nickname, password, checkPassword } = this.state;
    if (password === "" || checkPassword === "") {
      return;
    }
    if (password !== checkPassword) {
      this.setState({
        passwordsError: true
      });
    } else {
      this.setState({
        passwordsError: false
      });
    }
  };

  checkName = async () => {
    return;
    const response = await nickname(this.state.nickname);
    if (response && response.success) {
      this.setState({
        nicknameError: true
      });
    } else {
      this.setState({
        nicknameError: false
      });
    }
  };

  createNewAccount = async () => {
    const { nickname, password, checkPassword } = this.state;
    this.checkPassword();
    if (nickname === "" || password === "" || checkPassword !== password)
      return;
    this.setState({
      visible: true
    });
    const response = await register(nickname, password);
    if (response.success) {
      this.props.navigation.navigate("Login");
      this.setState({
        error: false,
        visible: false
      });
    } else {
      this.setState({
        error: true,
        text: "Something went wrong!",
        visible: false
      });
    }
  };

  render() {
    return (
      <View style={styles.view}>
        <Spinner visible={this.state.visible} />
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
            underlineColorAndroid="transparent"
            editable={true}
            maxLength={40}
            onChangeText={nickname => this.setState({ nickname })}
            style={this.state.nicknameError ? styles.redInput : styles.input}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder={"Password"}
            editable={true}
            maxLength={40}
            onEndEditing={this.checkPassword}
            underlineColorAndroid="transparent"
            onContentSizeChange={
              this.state.passwordsError ? this.checkPassword : () => {}
            }
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            style={styles.input}
          />
          <Text style={styles.text}>Repeat Password</Text>
          <TextInput
            placeholder={"Repeat Password"}
            editable={true}
            maxLength={40}
            underlineColorAndroid="transparent"
            onContentSizeChange={
              this.state.passwordsError ? this.checkPassword : () => {}
            }
            onEndEditing={this.checkPassword}
            onChangeText={checkPassword => this.setState({ checkPassword })}
            secureTextEntry={true}
            style={styles.input}
          />
          {this.state.passwordsError && (
            <Text style={styles.redText}>Passwords do not match!</Text>
          )}
          {this.state.nicknameError && (
            <Text style={styles.redText}>Nickname already exists!</Text>
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
