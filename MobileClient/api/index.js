import { Platform, AsyncStorage, Alert } from "react-native";

const endpoint = Platform.select({
  ios: "localhost",
  android: "10.0.2.2"
});

const HOST = `https://popcorn-project.herokuapp.com/api`;

let timeoutLogout;

const logoutHandler = navigation =>
  (timeoutLogout = async () => {
    await AsyncStorage.removeItem("nickname");
    navigation.navigate("SignedOut");
  });

const secureFetch = (...args) =>
  AsyncStorage.getItem("nickname")
    .then(nickname => {
      if (nickname) {
        return fetch(...args);
      }
      return Error();
    })
    .then(response => {
      if (response.status === 401 && timeoutLogout) {
        timeoutLogout();
        Alert.alert("Account", `Your session has expired, please log in again`);
        return Error();
      }
      return response;
    })
    .catch(() => {});

async function register(nickname, password) {
  const url = `${HOST}/register`;
  let body = `nickname=${encodeURIComponent(nickname)}`;
  body += `&pass=${encodeURIComponent(password)}`;

  const regiserRequest = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  const response = await regiserRequest.json();

  return response;
}

async function login(nickname, password) {
  const url = `${HOST}/login`;
  let body = `nickname=${encodeURIComponent(nickname)}`;
  body += `&pass=${encodeURIComponent(password)}`;
  const loginRequest = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  const response = await loginRequest.json();
  return response;
}

async function getNickname(id) {
  const url = `${HOST}/userid/${id}`;

  const request = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  const response = await request.json();
  return response;
}

async function getCoinValue() {
  const url = `${HOST}/value`;

  const request = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  const response = await request.json();
  return response;
}

async function logout() {
  const url = `${HOST}/logout`;

  const logoutRequest = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

async function getBalance() {
  const url = `${HOST}/balance`;

  const balanceRequest = await secureFetch(url, {
    method: "GET",
    credentials: "include"
  });
  const response = await balanceRequest.json();
  return response;
}

async function askTransaction(coins) {
  const url = `${HOST}/transactionRequest/${coins}`;

  const transactionRequest = await secureFetch(url, {
    method: "POST",
    credentials: "include"
  });

  const response = await transactionRequest.json();
  return response;
}

async function transactionsList() {
  const url = `${HOST}/transaction`;

  const transactionsRequest = await secureFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include"
  });

  const response = await transactionsRequest.json();
  return response;
}

async function getTransactionByCode(code) {
  const url = `${HOST}/transaction/${code}`;

  const transactionsRequest = await secureFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include"
  });

  const response = await transactionsRequest.json();

  return response;
}

async function nickname(nickname) {
  const url = `${HOST}/nickname/${nickname}`;

  const nicknameRequest = await secureFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  const response = await nicknameRequest.json();
  return response;
}

async function confirmTransaction(code) {
  const url = `${HOST}/transaction/${code}`;

  const transactionsRequest = await secureFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include"
  });

  const response = await transactionsRequest.json();

  return response;
}

export {
  register,
  login,
  logout,
  getBalance,
  askTransaction,
  nickname,
  transactionsList,
  getTransactionByCode,
  confirmTransaction,
  logoutHandler,
  getNickname,
  getCoinValue
};
