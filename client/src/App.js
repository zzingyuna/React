import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './page/NotFound';
import Home from './page/Home'
import About from './page/About';
import Test1 from './page/test/Test1';
import Test2 from './page/test/Test2';

function App() {
  return (
    <div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/test1" element={<Test1 />}></Route>
					<Route path="/test2" element={<Test2 />}></Route>
					{/* <Route path="/product/*" element={<Product />}></Route> */}
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
      {/*  */}
    </div>
  );
}

export default App;
