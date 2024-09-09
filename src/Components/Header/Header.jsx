import React, { useContext } from 'react';
import './header.css';
import { AuthContext } from '../Providers/AuthProvider';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from context
  const location = useLocation();

  const handleLogout = () => {
    logout()
      .then(result => {})
      .catch(error => console.error(error));
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="info">
      <Container>
        <Navbar.Brand href="/" class='pe-6'>
            <h3 class="fst-italic text-white">Product Zone</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
          <Nav className="me-auto fs-4 fw-semibold">
            <Link className='pe-4 ps-4' to='/'>Home</Link>

            {/* Conditionally render these links if the user is logged in */}
            {user && (
              <>
                <Link className='ps-4 pe-4' to='/add-product'>Add Product</Link>
                <Link to='/all-products'>All Products</Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <div className="d-flex align-items-center">
                <span className="me-3 fw-semibold">{user.displayName}</span>
                <Button onClick={handleLogout} style={{ backgroundColor: "#0B5ED7" }}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className='login-btn' variant="secondary" style={{ backgroundColor: "#0B5ED7" }}>
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
