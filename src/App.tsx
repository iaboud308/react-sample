import { BrowserRouter } from "react-router-dom";
import Main from "./Components/Main";
import Header from "./Components/Header";


function App() {
  return (
    <div>
		<BrowserRouter>
			<Header />
			<Main />
		</BrowserRouter>
    </div>
  );
}

export default App;
