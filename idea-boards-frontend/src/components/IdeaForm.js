import React, { useState, useEffect } from 'react';
import {Modal, Form, Button, Alert} from 'react-bootstrap';

const IdeaForm = ({ show, onHide, onSave, onDelete, ideaId, ideaContent }) => {
    const [content, setContent] = useState('');
    const [error] = useState('');

    useEffect(() => {
        if (show) {
            setContent(ideaContent || '');
        }
    }, [show, ideaContent]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (ideaId) {
            await onSave(ideaId, content);
        } else {
            await onSave(content);
        }
        onHide();
    };

    const handleDelete = () => {
        onDelete && onDelete(ideaId);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{ideaId ? 'Edit Idea' : 'Add New Idea'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Idea Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        {ideaId && (
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        )}
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default IdeaForm;
