import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import {Badge, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useContext} from "react";
import {Store} from "./Store";
import CartScreen from "./screen/CartScreen";
import SigninScreen from "./screen/SigninScreen";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from "./screen/ShippingAdressScreen";
import SignupScreen from "./screen/SignupScreen";

function App() {
    const { state, dispatch: ctxDispatch} = useContext(Store);
    const {cart, userInfo} = state;

    const signoutHandler = () => {
        ctxDispatch({type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');

    }

    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">

                <ToastContainer position="bottom-center" limit={1} />

                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand>amazon</Navbar.Brand>
                            </LinkContainer>

                            <Nav className="me-auto">
                                <Link to="/cart" className="nav-link">
                                    Cart
                                    {cart.cartItems.length > 0 && (
                                        <Badge pill bg="danger">
                                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                        </Badge>
                                    )}
                                </Link>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orderhistory">
                                            <NavDropdown.Item>Order History</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider/>
                                        <Link
                                            className="dropdown-item"
                                        to="#signout"
                                            onClick={signoutHandler}
                                        >
                                            Sign Out
                                        </Link>

                                    </NavDropdown>
                                ) : (
                                    <Link className="nav-link" to="/signin">
                                        Sign In
                                    </Link>
                                )}
                            </Nav>

                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container className="mt-3">
                        <Routes>
                            <Route path="/product/:slug" element={<ProductScreen/>}/>
                            <Route path="/cart" element={<CartScreen/>}/>
                            <Route path="/signin" element={<SigninScreen/>}/>
                            <Route path="/signup" element={<SignupScreen/>}/>

                            <Route path="/shipping" element={<ShippingAddressScreen/>}/>
                            <Route path="/" element={<HomeScreen/>}/>
                        </Routes>
                    </Container>
                </main>
                <footer>
                    <div className="text-center">
                        All rights reserved.
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}


export default App;
