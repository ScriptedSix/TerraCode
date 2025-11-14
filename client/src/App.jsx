import Signup from './user/Signup.jsx'
import Signin from './user/Signin.jsx'

// import "./styles/styles.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


// import ScrollToTop from "./utils/scrollToTop"

function App() {
  return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/signup" element={<Signup />}/>
					<Route path="/signin" element={<Signin />} />
				</Routes>
			</Router>
		</div>
  );
}

export default App;
