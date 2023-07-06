import React from "react";

function Transaction({ title, amount }) {
  return (
    <React.Fragment>
      <section className="user__account">
        <div className="user__account__content-wrapper">
          <h3 className="user__account__content-wrapper__title">{title}</h3>
          <p className="user__account__content-wrapper__amount">{amount}</p>
          <p className="user__account__content-wrapper__amount-description">
            Available Balance
          </p>
        </div>
        <div className="user__account__content-wrapper cta">
          <button className="user__account__content-wrapper__transaction-button">
            View transactions
          </button>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Transaction;
