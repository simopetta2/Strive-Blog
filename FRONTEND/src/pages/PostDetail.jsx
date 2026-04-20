import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Badge, Image, Spinner, Row, Col, Card } from 'react-bootstrap';
import { apiRequest } from '../services/api';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        apiRequest(`/blogposts/${id}`).then(setPost).catch(console.error);
    }, [id]);

    if (!post) return <div className="text-center mt-5"><Spinner animation="grow" variant="primary" /></div>;

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col lg={9}>
                    <Link to="/" className="text-decoration-none text-primary fw-bold mb-4 d-inline-flex align-items-center gap-2">
                        <FiArrowLeft /> Torna ai post
                    </Link>

                    <div className="mb-4">
                        <Badge className="mb-2 px-3 py-2 rounded-pill shadow-sm" style={{ backgroundColor: 'var(--secondary)' }}>
                            {post.category}
                        </Badge>
                        <h1 className="display-4 fw-bold text-dark">{post.title}</h1>
                        <div className="text-muted d-flex gap-3 small mt-2">
                            <span><FiCalendar /> {new Date(post.createdAt).toLocaleDateString()}</span>
                            <span><FiClock /> {post.readTime?.value || 5} min lettura</span>
                        </div>
                    </div>

                    <Image src={post.cover} fluid className="rounded-5 shadow-lg mb-5 w-100" style={{ maxHeight: '500px', objectFit: 'cover' }} />

                    {/* CONTENUTO DEL POST */}
                    <div className="bg-white p-4 p-md-5 rounded-5 shadow-sm mb-5 fs-5 lh-lg">
                        {post.content}
                    </div>

                    {/* SEZIONE AUTORE SOTTO IL POST */}
                    <Card className="border-0 rounded-5 shadow-sm p-4 bg-white">
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <Image
                                    src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.name}`}
                                    roundedCircle
                                    className="author-avatar"
                                    style={{ width: '80px', height: '80px' }}
                                />
                            </Col>
                            <Col>
                                <h4 className="fw-bold mb-1">{post.author?.name} {post.author?.surname}</h4>
                                <p className="text-muted mb-0">{post.author?.email}</p>
                                <div className="mt-2 text-primary small fw-bold">Community Author & Content Creator</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PostDetail;