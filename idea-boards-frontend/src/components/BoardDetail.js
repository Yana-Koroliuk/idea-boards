import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Container, Alert, Col, Row} from 'react-bootstrap';
import Section from './Section';
import '../custom-styles.css';

const BoardDetail = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [sections, setSections] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBoardDetails = async () => {
            try {
                const boardResponse = await axios.get(`http://localhost:8080/api/boards/${boardId}`);
                setBoard(boardResponse.data);
            } catch (error) {
                setError('Failed to fetch board details.');
            }
        };

        const fetchSections = async () => {
            try {
                const sectionsResponse = await axios.get(`http://localhost:8080/api/sections/board/${boardId}`);
                const sectionsWithIdeas = await Promise.all(sectionsResponse.data.map(async (section) => {
                    const ideasResponse = await axios.get(`http://localhost:8080/api/ideas/section/${section.id}`);
                    return { ...section, ideas: ideasResponse.data };
                }));
                setSections(sectionsWithIdeas);
            } catch (error) {
                setError('Failed to fetch sections and ideas.');
            }
        };

        fetchBoardDetails().then(() => {});
        fetchSections().then(() => {});
    }, [boardId]);

    if (error) return <Container><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container style={{ marginTop: '20px' }}>
            <h1>{board?.name}</h1>
            <p>{board?.description}</p>
            <Row xs={1} sm={2} md={3} className="g-4">
                {sections.map((section) => (
                    <Col key={section.id} lg={4}>
                        <Section section={section} setSections={setSections} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BoardDetail;