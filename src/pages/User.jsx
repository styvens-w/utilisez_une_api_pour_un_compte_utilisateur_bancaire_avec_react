import "../assets/scss/pages/user.scss"
import UserHeader from "../components/UserHeader";
import UserAccount from "../components/UserAccount";

function user() {
    return (
        <main className="main bg-dark user">
            <UserHeader />
            <UserAccount />
        </main>
    )
}

export default user