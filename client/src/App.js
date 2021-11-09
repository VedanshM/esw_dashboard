import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Test from "./components/test";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
                <Route path="/" exact component={Test} />
        </Router>
    );
}

export default App;
