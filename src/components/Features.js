import React from "react";
import features from "../utils/datas/features.json"
import Feature from "./Feature";

function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {features.map(({ img, title, text }) => (
                <Feature key={title} img={img} title={title} text={text} />
            ))}
        </section>
    )
}

export default Features