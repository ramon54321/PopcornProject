const HOST = "http://localhost:3000/api";

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

  const response = await logoutRequest.json();
}

async function balance() {
  const url = `${HOST}/balance`;

  const balanceRequest = await fetch(url, {
    method: "GET",
    credentials: "include"
  });

  const response = await balanceRequest.text();
  console.log(response);
}

async function askTransaction(coins) {
  const url = `${HOST}/transactionRequest/${coins}`;

  const transactionRequest = await fetch(url, {
    method: "POST",
    credentials: "include"
  });

  const response = await transactionRequest.text();
  console.log(response);
}

async function transactionsList() {
  const url = `${HOST}/transaction`;

  const transactionsRequest = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include"
  });

  const response = await transactionsRequest.json();
  console.log(response);
}

async function getTransactionByCode(code) {
  const url = `${HOST}/transaction/${code}`;

  const transactionsRequest = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include"
  });

  const response = await transactionsRequest.json();
  console.log(response);
}

async function nickname(nickname) {
  const url = `${HOST}/nickname/${nickname}`;

  const nicknameRequest = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  const response = await nicknameRequest.json();
}

async function confirmTransaction(code) {
  const url = `${HOST}/transaction/${code}`;

  const transactionsRequest = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include"
  });

  const response = await transactionsRequest.json();
  console.log(response);
}

export {
  register,
  login,
  logout,
  balance,
  askTransaction,
  nickname,
  transactionsList,
  getTransactionByCode,
  confirmTransaction
};
