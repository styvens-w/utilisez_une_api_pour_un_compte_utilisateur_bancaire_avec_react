import iconChat from "../assets/img/iconChat.png"
import iconMoney from "../assets/img/iconMoney.png"
import iconSecurity from "../assets/img/iconSecurity.png"

function Feature({ img, title, text }) {
    let icon;

    // eslint-disable-next-line default-case
    switch (img) {
        case `iconChat`:
            icon = iconChat;
            break;
        case `iconMoney`:
            icon = iconMoney;
            break;
        case `iconSecurity`:
            icon = iconSecurity;
            break;
    }
    return (
        <div className="feature__item">
            <img src={icon} alt="Chat Icon" className="feature__item__icon"/>
            <h3 className="feature__item__title">{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Feature