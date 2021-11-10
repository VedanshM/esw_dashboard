import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { Chart } from "react-google-charts";
import "./main.css"

const options = {
    hAxis: {
        title: 'Time',
    },
    vAxis: {
        title: 'Angle',
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
            users: [],
            label: [],
            data1: [],
            data2: [],
            graphstate: [['time', 'Current Angle', 'Target angle'], [1, 1, 1]]
        };
        this.handleAngle = this.handleAngle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            document.title = "ESW-Project"
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

    onSubmit(event) {
        event.preventDefault();
        const newAngle = {
            angle: this.state.angle
        }
        let temp = this.state.angle.length > 0;
        if (temp) {
            axios.post('/api/sendData', newAngle)
                .then(res => {
                    console.log("Angle Sent");
                    console.log(res);
                    this.setState({angle:''})
                })
                .catch(err => {
                    console.log("Failed to Send Angle, Check connection");
                });
        }
    }
    render() {
        console.log(this.state.graphstate)
        return (
            <div>
                <div>
                    <Chart
                        width={'100%'}
                        height={'420px'}
                        chartType="LineChart"
                        data={this.state.graphstate}
                        options={options}
                    />
                </div>
                <div div id="firstDivistion" class="division">
                    <form onSubmit={this.onSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <label>
                                <p>Angle : </p>
                            </label>
                            <Form.Control autoFocus type="string" value={this.state.angle}
                                onChange={this.handleAngle} />
                        </Form.Group>
                        <br/>
                        <Button block size="lg" type="submit" value="send" id="btn_1">
                            Send
                        </Button>
                    </form>
                </div>
                <div id="secondDivistion" class="division">
                    <iframe
                        src="https://player.twitch.tv/?channel=esw_project&parent=esw-team4.herokuapp.com"
                        height="100%"
                        width="100%"
                        allowfullscreen="true"
                    >
                    </iframe>
                </div>
            </div>

        );
    }
}

export default Main;
