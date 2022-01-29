// 這邊的資料夾命名方式可以不用指定裡面的index
import Navbar from "./components/Navbar";
import Home from './pages/Home'
import Map from './pages/Map'
import About from './pages/About'
import Store from './pages/Store'
import StoreList from './pages/StoreList'
import StoreCheck from './pages/StoreCheck'
import Login from './pages/Login'
import Register from './pages/Register'
import Product from './pages/Product'

function App() {
  return ( 
    <div className="App">
      <Navbar />
      <Home />
      <Map />
      <About />
      <Store />
      <StoreList />
      <StoreCheck />
      <Login />
      <Register />
      <Product />
    </div>
  );
}

export default App;