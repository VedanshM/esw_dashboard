import React, { Component } from 'react';
import axios from 'axios';

import UserContext from "../contexts/User/UserContext";
import styles from './about.module.css'

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "stats": {
                "average": 0,
                "count": 0
            }
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            axios.get('/stat/getStats')
                .then(response => {
                    // alert(response)
                    let data = response.data
                    this.setState({
                        "stats": {
                            "average": data.average,
                            "count": data.count
                        }
                    })
                })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (<>
            <UserContext.Consumer>
                {context => (
                    <div>
                        <div id="navbar">
                            <a className="active">Home</a>
                            {!context.name && <a href="/#/Login">LogIn</a>}
                            {!context.name && <a href="/#/register">Register</a>}
                            {context.name && <a href="javascript:window.location.reload(true)" onClick={() => context.handleLogout()}>Logout</a>}
                            <a href="https://github.com/VedanshM/esw_dashboard" target="_blank" rel="noopener noreferrer">Github</a>
                            {context.name && <a href="/#/Dashboard">Dashboard</a>}
                            {/* {context.name && <p>Welcome, {context.name}</p>} */}
                        </div>
                        <div className={styles.about_main_div}>
                            <div>
                                <h1 className={styles.heading_1}>ESW Project</h1>
                            </div>
                            <div>
                                <h5 className={styles.team_name}><p>( Team 4 )</p></h5>
                            </div>
                            <div>
                                <h3 className={styles.team_name}><p> PID control of the angular position of a DC motor </p></h3>
                            </div>
                            <br />
                            <div>
                                <h2 style={{ textAlign: "center" }}> Statistics</h2>
                                <table className={styles.table_name}>
                                    <tbody>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} > No. of Runs </td>
                                            <td className={styles.td} > {this.state.stats.count} </td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} > Average Convergence Time</td>
                                            <td className={styles.td} > {this.state.stats.average / 1000}s </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <div>
                                <div style={{
                                    "margin": 50,
                                    "margin-left": 200,
                                    "margin-right": 200,
                                }}>

                                    The main experiment is given an initial angular position and a final target position, we wish to reach the final position using PID logic.
                                    <br />
                                    One must register and login to access the dashboard where you can provide the target angle as well as the 3 PID constants and then observe the result.
                                    <br />
                                    The code for the project is present <a href="https://github.com/VedanshM/esw_dashboard">here</a>.
                                </div>
                            </div>
                            <br />
                            <div>
                                <h3 style={{ textAlign: "center" }}> Contributors</h3>
                                <table className={styles.table_name}>
                                    <tbody>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> Pratyanshu Pandey</td>
                                            <td className={styles.td} >2019101025</td>
                                            <td className={styles.td} ><a href="https://github.com/pratyanshupandey" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> Vedansh Mittal</td>
                                            <td className={styles.td} >2019101054</td>
                                            <td className={styles.td} ><a href="https://github.com/VedanshM" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> Utkarsh Upadhyay</td>
                                            <td className={styles.td} >2019101010</td>
                                            <td className={styles.td} ><a href="https://github.com/utkarsh-ls" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> Prince Singh Tomar</td>
                                            <td className={styles.td} >2019101021</td>
                                            <td className={styles.td} ><a href="https://github.com/princesinghtomar" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> Bhaskar Joshi</td>
                                            <td className={styles.td} >2019111002</td>
                                            <td className={styles.td} ><a href="https://github.com/BhaskarJoshi-01" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                )}
            </UserContext.Consumer>
        </>);
    }
}

export default About;
