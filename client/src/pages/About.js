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
                                <h5 className={styles.team_name}><p>( Team 4 )</p></h5>
                            </div>
                            <div>
                                <h3 className={styles.team_name}><p>[ PID control of the speed of a DC motor ]</p></h3>
                            </div>
                            <br />
                            <div>
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
