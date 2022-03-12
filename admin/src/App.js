import './app.css';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';

import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductLists from './pages/productLists/ProductLists';
import Product from './pages/product/Product';
import Login from './pages/login/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewProduct from './pages/newProduct/NewProduct';
import { useSelector } from 'react-redux';

function App() {
  const isAdmin = useSelector((state) => state.user.curresntUser?.isAdmin);

  return (
    <div>
      <Topbar />
      <div className="container">
        <Router>
          {
            <>
              {isAdmin && <Sidebar />}
              <Routes>
                <Route path="/login" element={<Login />} />

                {isAdmin && (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/newUser" element={<NewUser />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:userId" element={<User />} />
                    <Route path="/products" element={<ProductLists />} />
                    <Route path="/products/:productId" element={<Product />} />
                    <Route path="/newproduct" element={<NewProduct />} />
                  </>
                )}
              </Routes>
            </>
          }
        </Router>
      </div>
    </div>
  );
}

export default App;
