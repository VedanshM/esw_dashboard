import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { Chart } from "react-google-charts";

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
            graphstate: {}
        };
        this.handleAngle = this.handleAngle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // if (sessionStorage.getItem('email') == null) {
        //     this.setState({
        //         gotologin: true
        //     })
        // } else {
        //     this.setState({
        //         email: sessionStorage.getItem('email'),
        //     });
        // }
        this.interval = setInterval(() => {
            axios.get('/api/getData')
                .then(response => {
                    console.log("here are the users : ")
                    console.log(response.data)
                    data = response.data
                    data.unshift(['time', 'Current Angle', 'Target angle'])
                })
        }, 2000);
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
        console.log(temp)
        if (temp) {
            axios.post('/api/sendData', newAngle)
                .then(res => {
                    console.log("Angle Sent");
                    console.log(res);
                })
                .catch(err => {
                    console.log("Failed to Send Angle, Check connection");
                });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="LineChart"
                        data={data}
                        options={options}
                    />
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <label>
                                Angle :
                            </label>
                            <Form.Control autoFocus type="string" value={this.state.angle}
                                onChange={this.handleAngle} />
                        </Form.Group>
                        <Button block size="lg" type="submit" value="send" >
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Main;