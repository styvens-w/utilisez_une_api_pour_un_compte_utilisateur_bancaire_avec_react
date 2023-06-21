

function UserAccount() {
    return (
        <section className="user__account">
            <div className="user__account__content-wrapper">
                <h3 className="user__account__content-wrapper__title">Argent Bank Checking (x8349)</h3>
                <p className="user__account__content-wrapper__amount">$2,082.79</p>
                <p className="user__account__content-wrapper__amount-description">Available Balance</p>
            </div>
            <div className="user__account__content-wrapper cta">
                <button className="user__account__content-wrapper__transaction-button">View transactions</button>
            </div>
        </section>
    )
}

export default UserAccount