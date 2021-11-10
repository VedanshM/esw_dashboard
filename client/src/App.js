import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Test from "./components/test";
import Main from "./components/main";

function App() {
    return (
        <Router>
            <Route path="/" exact component={Main} />
        </Router>
    );
}

export default App;
