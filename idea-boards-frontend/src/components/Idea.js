import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import IdeaForm from './IdeaForm';
import { PencilSquare } from 'react-bootstrap-icons';

const Idea = ({ idea, onDelete, onEdit }) => {
    const [showIdeaForm, setShowIdeaForm] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/ideas/${idea.id}`);
            onDelete(idea.id);
        } catch (error) {
            console.error('Failed to delete idea', error);
        }
    };

    const handleVote = async () => {
        try {
            const updatedIdea = { ...idea, votes: idea.votes + 1 };
            await axios.put(`http://localhost:8080/api/ideas/${idea.id}`, updatedIdea);
            onEdit(updatedIdea);
        } catch (error) {
            console.error('Failed to update votes', error);
        }
    };

    const handleSave = async (ideaId, updatedContent) => {
        try {
            const updatedIdea = { ...idea, content: updatedContent };
            const response = await axios.put(`http://localhost:8080/api/ideas/${ideaId}`, updatedIdea);
            onEdit(response.data);
            setShowIdeaForm(false);
        } catch (error) {
            console.error('Failed to save idea', error);
        }
    };

    return (
        <>
            <Card className="mt-2">
                <Card.Body>
                    <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                        {idea.content}
                    </Card.Text>
                    <div className="d-flex align-items-center">
                        <Button variant="outline-primary" onClick={handleVote} style={{ marginRight: '8px' }}>
                            + {idea.votes}
                        </Button>
                        <Button variant="outline-secondary" onClick={() => setShowIdeaForm(true)} className="ml-2">
                            <PencilSquare />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <IdeaForm
                show={showIdeaForm}
                onHide={() => setShowIdeaForm(false)}
                onSave={handleSave}
                onDelete={handleDelete}
                ideaId={idea.id}
                ideaContent={idea.content}
            />
        </>
    );
};

export default Idea;