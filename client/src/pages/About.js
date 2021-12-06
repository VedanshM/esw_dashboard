import React, { Component } from 'react';

import UserContext from "../contexts/User/UserContext";
import styles from './about.module.css'

class About extends Component {

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
                                <h1 className={styles.heading_1}>Esw Project</h1>
                            </div>
                            <div>
                                <h5 className={styles.team_name}><p>Team 4</p></h5>
                            </div>
                            <div>
                                <table className={styles.table_name}>
                                    <tbody>
                                        <tr>
                                            <td>Pratyanshu Pandey</td>
                                            <td>2019101025</td>
                                            <td><a href="https://github.com/pratyanshupandey" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                        <tr>
                                            <td>Vedansh Mittal</td>
                                            <td>2019101054</td>
                                            <td><a href="https://github.com/VedanshM" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                        <tr>
                                            <td>Utkarsh Upadhyay</td>
                                            <td>2019101010</td>
                                            <td><a href="https://github.com/utkarsh-ls" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                        <tr>
                                            <td>Prince Singh Tomar</td>
                                            <td>2019101021</td>
                                            <td><a href="https://github.com/princesinghtomar" target="_blank" rel="noopener noreferrer">Github</a></td>
                                        </tr>
                                        <tr>
                                            <td>Bhaskar Joshi</td>
                                            <td>2019111002</td>
                                            <td><a href="https://github.com/BhaskarJoshi-01" target="_blank" rel="noopener noreferrer">Github</a></td>
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
