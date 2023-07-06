import React from "react";
import Transaction from "./Transaction";
import transaction from "../utils/datas/transactions.json";

function UserAccount() {
  return transaction.map(({ title, amount }) => (
    <Transaction key={title} title={title} amount={amount} />
  ));
}

export default UserAccount;
