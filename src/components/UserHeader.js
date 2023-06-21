import React from "react";
import { useSelector } from "react-redux";


function UserHeader() {
    const firstName = useSelector(state => state.user.firstName);
    const lastName = useSelector(state => state.user.lastName);


    return (
        <React.Fragment>
            <div className="user__header">
                <h1>Welcome back<br/>{firstName + ' ' + lastName}</h1>
                <button className="user__header__edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
        </React.Fragment>
    )
}

export default UserHeader