import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateBoardForm = ({ show, onHide, onBoardCreated }) => {
    const [boardName, setBoardName] = useState('');
    const [description, setDescription] = useState('');
    const [sections, setSections] = useState(['']);
    const [error, setError] = useState('');

    const handleAddSection = () => {
        setSections([...sections, '']);
    };

    const handleSectionTitleChange = (index, event) => {
        const newSections = [...sections];
        newSections[index] = event.target.value;
        setSections(newSections);
    };

    const resetForm = () => {
        setBoardName('');
        setDescription('');
        setSections(['']);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/boards', {
                name: boardName,
                description,
                sectionTitles: sections.filter(title => title.trim() !== ''),
            });
            onBoardCreated();
            resetForm();
            onHide();
        } catch (error) {
            setError('Failed to create board. ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    const handleClose = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Board</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Board Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {sections.map((section, index) => (
                        <Form.Group key={index} className="mb-3">
                            <Form.Label>Section Title {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                value={section}
                                onChange={(e) => handleSectionTitleChange(index, e)}
                                required
                            />
                        </Form.Group>
                    ))}
                    <Button variant="secondary" onClick={handleAddSection} className="mb-2">
                        Add Section
                    </Button>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateBoardForm;
