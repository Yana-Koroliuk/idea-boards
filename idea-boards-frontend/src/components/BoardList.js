import React from 'react';
import { Link } from 'react-router-dom';
import {Button, ListGroup} from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const BoardList = ({ boards, onDelete }) => {
    return (
        <ListGroup>
            {boards.map(board => (
                <ListGroup.Item key={board.id} className="d-flex justify-content-between align-items-center">
                    <Link to={`/boards/${board.id}`}>{board.name}</Link>
                    <Button variant="outline-danger" onClick={() => onDelete(board.id)}>
                        <Trash />
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default BoardList;