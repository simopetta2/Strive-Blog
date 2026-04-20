import { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { apiRequest } from '../services/api';
import { FiUserPlus, FiCamera } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', birthDate: '' });
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (avatar) data.append('avatar', avatar);

        try {
            await apiRequest('/authors', {
                method: 'POST',
                body: data
            });
            window.location.href = "/login";
        } catch (err) {
            setError(err.message || "Errore durante la registrazione.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow border-0 rounded-4">
                        <h2 className="text-center fw-bold mb-4">Registrati</h2>

                        <Button
                            variant="outline-dark"
                            className="w-100 mb-4 d-flex align-items-center justify-content-center gap-2 rounded-3"
                            onClick={() => window.location.href = "http://localhost:3000/auth/google"}
                        >
                            <FcGoogle size={20} /> Registrati con Google
                        </Button>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}><Form.Group className="mb-3"><Form.Label>Nome</Form.Label><Form.Control type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} /></Form.Group></Col>
                                <Col md={6}><Form.Group className="mb-3"><Form.Label>Cognome</Form.Label><Form.Control type="text" required onChange={e => setFormData({ ...formData, surname: e.target.value })} /></Form.Group></Col>
                            </Row>
                            <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" required onChange={e => setFormData({ ...formData, email: e.target.value })} /></Form.Group>
                            <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" required onChange={e => setFormData({ ...formData, password: e.target.value })} /></Form.Group>
                            <Form.Group className="mb-4"><Form.Label>Foto Profilo</Form.Label><Form.Control type="file" onChange={e => setAvatar(e.target.files[0])} /></Form.Group>
                            <Button variant="primary" type="submit" className="w-100 fw-bold py-2" disabled={loading}>
                                {loading ? 'Caricamento...' : 'Crea Account'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;