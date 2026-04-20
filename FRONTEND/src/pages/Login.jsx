import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { apiRequest } from '../services/api';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            window.location.href = "/";
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            });
            localStorage.setItem('token', data.token);
            window.location.href = "/";
        } catch (err) {
            setError("Credenziali non valide.");
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Card className="p-4 p-md-5 border-0 rounded-5 shadow-lg bg-white" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Bentornato!</h2>
                    <p className="text-muted small">Accedi per iniziare a scrivere</p>
                </div>

                {error && <Alert variant="danger" className="rounded-4 text-center py-2">{error}</Alert>}

                <Button
                    variant="white"
                    className="w-100 mb-4 d-flex align-items-center justify-content-center gap-2 py-2 border rounded-4 shadow-sm"
                    onClick={() => window.location.href = "http://localhost:3000/auth/google"}
                >
                    <FcGoogle size={24} /> <span className="fw-semibold">Accedi con Google</span>
                </Button>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control className="rounded-3 py-2 bg-light border-0" type="email" placeholder="Email" required onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control className="rounded-3 py-2 bg-light border-0" type="password" placeholder="Password" required onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 py-3 fw-bold btn-primary">Entra</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;