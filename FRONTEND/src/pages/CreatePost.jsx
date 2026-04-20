import { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { apiRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [formData, setFormData] = useState({ title: '', category: '', content: '' });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const post = await apiRequest('/blogposts', { method: 'POST', body: JSON.stringify(formData) });
            if (file && post._id) {
                const data = new FormData();
                data.append('cover', file);
                await apiRequest(`/blogposts/${post._id}/cover`, { method: 'PATCH', body: data });
            }
            navigate('/');
        } catch (err) { alert(err.message); } finally { setLoading(false); }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="p-4 p-md-5 border-0 rounded-5 shadow-lg bg-white">
                        <h2 className="mb-4 fw-bold text-center text-primary">Scrivi un nuovo Post</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold text-muted small">TITOLO</Form.Label>
                                <Form.Control size="lg" className="rounded-3 bg-light border-0" placeholder="Inserisci il titolo..." required onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold text-muted small">CATEGORIA</Form.Label>
                                <Form.Control className="rounded-3 bg-light border-0" placeholder="Es: Tecnologia" required onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold text-muted small">CONTENUTO</Form.Label>
                                <Form.Control as="textarea" rows={8} className="rounded-3 bg-light border-0" placeholder="Di cosa vuoi parlare oggi?" required onChange={e => setFormData({ ...formData, content: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold text-muted small">COPERTINA</Form.Label>
                                <Form.Control type="file" className="rounded-3 bg-light border-0" onChange={e => setFile(e.target.files[0])} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 py-3 fw-bold" disabled={loading}>
                                {loading ? 'Sto pubblicando...' : 'Pubblica Articolo'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default CreatePost;