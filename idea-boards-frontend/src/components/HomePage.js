import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Button, Alert } from 'react-bootstrap';
import BoardList from './BoardList';
import CreateBoardForm from './CreateBoardForm';
import { AuthContext } from './authComponents/context/AuthContext';

const HomePage = () => {
    const { token } = useContext(AuthContext);
    const [boards, setBoards] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [error, setError] = useState('');

    const fetchBoards = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/boards', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBoards(response.data);
        } catch (error) {
            setError('Failed to fetch boards.');
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchBoards().then(() => {});
        }
    }, [token, fetchBoards]);

    const handleBoardCreated = () => {
        fetchBoards().then(() => {});
        setShowCreateForm(false);
    };

    const deleteBoard = async (boardId) => {
        try {
            await axios.delete(`http://localhost:8080/api/boards/${boardId}`);
            await fetchBoards();
        } catch (error) {
            setError('Failed to delete the board.');
        }
    };

    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            {token ? (
                <>
                    <Button variant="primary" onClick={() => setShowCreateForm(true)} className="my-3">
                        Create Board
                    </Button>
                    <BoardList boards={boards} onDelete={deleteBoard} />
                    <CreateBoardForm show={showCreateForm} onHide={() => setShowCreateForm(false)} onBoardCreated={handleBoardCreated} />
                </>
            ) : (
                <p style={{ marginTop: '20px' }}>Welcome to IdeaBoards. Please <a href="/login">login</a> to create and manage your boards.</p>
            )}
        </Container>
    );
};

export default HomePage;
