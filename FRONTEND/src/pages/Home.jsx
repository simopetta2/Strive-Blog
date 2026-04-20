import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Badge, Spinner, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiRequest } from '../services/api';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiRequest('/blogposts')
            .then(data => setPosts(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <Container className="text-center mt-5 py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Caricamento storie...</p>
        </Container>
    );

    return (
        <Container className="py-5">
            <header className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-2">Strive Blog</h1>
                <p className="text-muted">Scopri le ultime storie dalla nostra community</p>
            </header>

            <Row>
                {posts.map((post) => (
                    <Col md={6} lg={4} key={post._id} className="mb-5">
                        <Card className="h-100 shadow-sm rounded-4 post-card">
                            <Link to={`/post/${post._id}`} className="text-decoration-none">
                                <div className="position-relative overflow-hidden rounded-top-4">
                                    <Card.Img
                                        variant="top"
                                        src={post.cover}
                                        style={{ height: '240px', objectFit: 'cover' }}
                                    />
                                    <Badge className="position-absolute top-0 end-0 m-3 category-badge bg-primary rounded-pill shadow">
                                        {post.category}
                                    </Badge>
                                </div>

                                <Card.Body className="p-4 d-flex flex-column">
                                    <Card.Title className="post-title fs-4 mb-3">
                                        {post.title}
                                    </Card.Title>

                                    <div className="mt-auto d-flex align-items-center pt-3 border-top">
                                        <Image
                                            src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.name}+${post.author?.surname}`}
                                            roundedCircle
                                            className="author-avatar me-3"
                                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                        />
                                        <div className="d-flex flex-column">
                                            <span className="author-name fw-bold">
                                                {post.author ? `${post.author.name} ${post.author.surname}` : 'Autore Anonimo'}
                                            </span>
                                            <span className="text-muted small">
                                                {new Date(post.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;