
import React from 'react';
import { Button } from 'react-bootstrap';

const Save = ({ saved, onSave }) => {
  return (
    <Button variant="outline-success" onClick={onSave}>
      {saved ? 'Unsave' : 'Save'}
    </Button>
  );
};

export default Save;
