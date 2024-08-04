
import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

const Comments = ({ comments, onComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(comment);
      setComment('');
    }
  };

  return (
    <div>
      <Button variant="outline-secondary" onClick={() => {
        const userComment = prompt('Enter your comment:');
        if (userComment) onComment(userComment);
      }}>
        Comment
      </Button>
      <Form onSubmit={handleSubmit} className="mt-2">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-2">Add Comment</Button>
      </Form>
      {comments.map((comment, i) => (
        <Card.Text key={i}><strong>Comment {i + 1}:</strong> {comment}</Card.Text>
      ))}
    </div>
  );
};

export default Comments;
