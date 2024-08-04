
import React from 'react';
import { Button } from 'react-bootstrap';

const Likes = ({ count, onLike }) => {
  return (
    <Button variant="outline-primary" onClick={onLike}>
      Like {count}
    </Button>
  );
};

export default Likes;
