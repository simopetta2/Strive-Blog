import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';

export default function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Router>
      <Navbar expand="lg" className="navbar sticky-top mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-3">
            🚀 STRIVE<span className="text-dark">BLOG</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
            </Nav>
            <Nav className="align-items-center gap-3">
              {token ? (
                <>
                  <Button as={Link} to="/create" variant="primary" className="rounded-pill px-4 shadow-sm">Nuovo Post</Button>
                  <Button variant="outline-danger" className="rounded-pill px-3" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="fw-bold text-primary">Accedi</Nav.Link>
                  <Button as={Link} to="/register" variant="primary" className="rounded-pill px-4">Inizia</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}