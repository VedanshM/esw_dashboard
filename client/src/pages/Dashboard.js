import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { Chart } from "react-google-charts";
import { withRouter } from "react-router-dom";
import './navbar.css'
import styles from "./dashboard.module.css"

import UserContext from "../contexts/User/UserContext";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"

const options = {
    hAxis: {
        title: 'Time (ms)',
    },
    vAxis: {
        title: 'Angle ( °)',
    },
};

var data = [
    ['time', 'Current Angle', 'Target angle'],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
]

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: '',
            email: '',
            k_p: 10,
            k_i: 5,
            k_d: 0.025,
            users: [],
            label: [],
            data1: [],
            data2: [],
            graphstate: [['time', 'Current Angle', 'Target angle'], [1, 1, 1]]
        };
        this.handleAngle = this.handleAngle.bind(this);
        this.handlekp = this.handlekp.bind(this);
        this.handleki = this.handleki.bind(this);
        this.handlekd = this.handlekd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            axios.get('/api/getData')
                .then(response => {
                    data = response.data
                    console.log(data)
                    data = data.map(el => el.map(Number))
                    data.unshift(['time', 'Current Angle', 'Target angle'])
                    this.setState({ graphstate: data })
                })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleAngle(event) {
        this.setState({ angle: event.target.value });
    }

    handlekp(event) {
        this.setState({ k_p: event.target.value });
    }

    handleki(event) {
        this.setState({ k_i: event.target.value });
    }

    handlekd(event) {
        this.setState({ k_d: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        
        if (isNaN(this.state.angle) || this.state.angle < 0 || this.state.angle > 360)
        {
            alert("Target Angle should be an integer between 0 and 360");
            return;
        }
    
        if (isNaN(this.state.k_p) || this.state.k_p < 0)
        {
            alert("k_p should be a decimal number greater than or equal to 0");
            return;
        }
        if (isNaN(this.state.k_i) || this.state.k_i < 0)
        {
            alert("k_i should be a decimal number greater than or equal to 0");
            return;
        }
        if (isNaN(this.state.k_d) || this.state.k_d < 0)
        {
            alert("k_d should be a decimal number greater than or equal to 0");
            return;
        }
        
        if (this.state.angle == "")
            this.setState({ angle: 0 });
        if (this.state.k_p == "")
            this.setState({ k_p: 10 });
        if (this.state.k_i == "")
            this.setState({ k_i: 5 });
        if (this.state.k_d == "")
            this.setState({ k_d: 0.025 });
        

        const newAngle = {
            angle: this.state.angle,
            k_i: this.state.k_i,
            k_d: this.state.k_d,
            k_p: this.state.k_p
        }
        
        axios.post('/api/sendData', newAngle)
            .then(res => {
                console.log("Angle Sent");
                console.log(res);
                this.setState({ angle: '' })
            })
            .catch(err => {
                console.log("Failed to Send Angle, Check connection");
            });
    
    }
    render() {
        return (<>
            <UserContext.Consumer>
                {context => (
                    <div>
                        <div id="navbar">
                            <a href="/">Home</a>
                            <a href="/" onClick={() => context.handleLogout()}>Logout</a>
                            <a className="active" >Dashboard</a>
                        </div>
                        <div className={styles.charts}>
                            <Chart
                                width={'100%'}
                                height={'420px'}
                                chartType="LineChart"
                                data={this.state.graphstate}
                                options={options}
                            />
                        </div>
                        <div className={styles.firstDivistion}>
                            <form onSubmit={this.onSubmit}>
                                <table className={styles.table}>
                                    <tbody>
                                        <tr className={styles.tr}>
                                            <td className={styles.td}>
                                                <Form.Group size="lg" controlId="email">
                                                    <label className={styles.label}>
                                                        Angle (&deg;) :
                                                    </label>
                                                    <Form.Control className={styles.input} autoFocus type="number" value={this.state.angle}
                                                        onChange={this.handleAngle} />
                                                </Form.Group>
                                            </td>
                                            <td className={styles.td}>
                                                <Form.Group size="lg" controlId="email">
                                                    <label className={styles.label}>
                                                        K<sub> p</sub> (default : 10):
                                                    </label>
                                                    <Form.Control className={styles.input} autoFocus type="decimal" value={this.state.k_p}
                                                        onChange={this.handlekp} />
                                                </Form.Group>
                                            </td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td}>
                                                <Form.Group size="lg" controlId="email">
                                                    <label className={styles.label}>
                                                        K<sub> i</sub> (default : 5) :
                                                    </label>
                                                    <Form.Control className={styles.input} autoFocus type="decimal" value={this.state.k_i}
                                                        onChange={this.handleki} />
                                                </Form.Group>
                                            </td>
                                            <td className={styles.td}>
                                                <Form.Group size="lg" controlId="email">
                                                    <label className={styles.label}>
                                                        K<sub> d</sub> (default : 0.025):
                                                    </label>
                                                    <Form.Control className={styles.input} autoFocus type="decimal" value={this.state.k_d}
                                                        onChange={this.handlekd} />
                                                </Form.Group>
                                            </td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.button_td} colSpan='2'>
                                                <Button className={styles.button} block size="lg" type="submit" value="send" id="btn_1">
                                                    Send
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <div className={styles.secondDivistion}>
                            <iframe
                                src="https://player.twitch.tv/?channel=esw_project&parent=esw-team4.herokuapp.com"
                                height="100%"
                                width="100%"
                                allowFullScreen={true}
                            >
                            </iframe>
                        </div>
                    </div>
                )}
            </UserContext.Consumer>
        </>);
    }
}

// export default Main;

// Uncomment for protecting dashboard from access without login
export default withRouter(ProtectedRoute(Main));
