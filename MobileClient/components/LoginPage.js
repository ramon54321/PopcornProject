import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import actions from "../redux/actions";
import { login, balance } from "../api";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const mapStateToProps = store => {
  return { user: store.user };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserData: nickname => {
      const action = {
        type: actions.SAVE_USER,
        payload: {
          nickname
        }
      };

      dispatch(action);
    },
    saveUserBalance: balance => {
      const action = {
        type: actions.SAVE_BALANCE,
        payload: {
          balance
        }
      };
      dispatch(action);
    }
  };
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: ""
    };
  }

  getBalance = async () => {
    const response = await balance();
    if (response.balance) {
      const balance = response.balance;
    } else {
      const balance = 0;
    }
    this.props.saveUserBalance(balance);
  };

  onPressLogin = async () => {
    const { nickname, password } = this.state;
    if (nickname === "" || password === "") return;

    const response = await login(nickname, password);
    if (response) {
      await AsyncStorage.setItem("nickname", nickname);
      this.getBalance();
      this.props.saveUserData(nickname);
      this.props.navigation.navigate("SignedIn");
    }
  };

  createNewAccount = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.header}>Log in</Text>
        <View>
          <Text style={styles.text}>Nickname</Text>
          <TextInput
            placeholder={"Nickname"}
            autoCorrect={false}
            autoCapitalize="none"
            editable={true}
            maxLength={40}
            onChangeText={nickname => this.setState({ nickname })}
            style={styles.input}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder={"Password"}
            editable={true}
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={40}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={this.onPressLogin}>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
