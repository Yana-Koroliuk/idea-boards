import React, { useState } from 'react';
import {Card, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import Idea from './Idea';
import IdeaForm from './IdeaForm';
import '../custom-styles.css';

const Section = ({ section, setSections }) => {
    const [showIdeaForm, setShowIdeaForm] = useState(false);
    const [error, setError] = useState('');

    const handleSaveIdea = async (newIdeaContent) => {
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/api/ideas', {
                content: newIdeaContent,
                votes: 0,
                sectionId: section.id
            });
            if (response.data) {
                setSections((prevSections) => prevSections.map(s => {
                    if (s.id === section.id) {
                        return { ...s, ideas: [...s.ideas, response.data] };
                    }
                    return s;
                }));
            }
            setShowIdeaForm(false);
        } catch (error) {
            setError('Failed to add idea: ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    const handleDeleteIdea = (id) => {
        setSections(prevSections =>
            prevSections.map(s => {
                if (s.id === section.id) {
                    return { ...s, ideas: s.ideas.filter(idea => idea.id !== id) };
                }
                return s;
            })
        );
    };

    const handleEditIdea = async (updatedIdea) => {
        setSections(prevSections => prevSections.map(s => {
            if (s.id === section.id) {
                return { ...s, ideas: s.ideas.map(idea => idea.id === updatedIdea.id ? updatedIdea : idea) };
            }
            return s;
        }));
    };

    return (
        <Card className="mb-3 section-card">
            <Card.Header>
                {section.title} <Button variant="outline-success" size="sm" onClick={() => setShowIdeaForm(true)} className="float-right">+</Button>
            </Card.Header>
            <Card.Body>
                {section.ideas.map((idea) => (
                    <Idea
                        key={idea.id}
                        idea={idea}
                        onDelete={handleDeleteIdea}
                        onEdit={handleEditIdea}
                    />
                ))}
                {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
            </Card.Body>
            <IdeaForm
                show={showIdeaForm}
                onHide={() => setShowIdeaForm(false)}
                onSave={handleSaveIdea}
                ideaContent={''}
            />
        </Card>
    );
};

export default Section;