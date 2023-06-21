import "../assets/scss/pages/form.scss";
import FormC from "../components/FormC";

function Form({ type }) {
    return (
        <main className="main bg-dark">
            <FormC type={type} />
        </main>
    )
}

export default Form