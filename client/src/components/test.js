import React, { Component } from "react";
import axios from "axios";

class Test extends Component {
    constructor(){
        super()
        this.state=  {"val":null}
        axios
            .get("https://esw-team4.herokuapp.com/api")
            .then((res) => {
                console.log(res.data)
                this.setState({"val":res.data})
            })
            .catch((res) => {
                console.log(res);
                alert("error");
            });
    }
    render() {
        return (
            <div>
                {"This is test. " + this.state["val"]}
            </div>
        );
    }
}

export default Test;
