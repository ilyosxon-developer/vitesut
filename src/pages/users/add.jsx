import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddUserModal() {
  const [show, setShow] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    user_type: ''
  });

  useEffect(() => {
    axios.get('https://crmapimilk.pythonanywhere.com/api/user_types/')
      .then(response => setUserTypes(response.data))
      .catch(error => console.error('Error fetching user types:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('https://crmapimilk.pythonanywhere.com/api/users/', formData)
      .then(() => { setShow(false); window.location.reload(); })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Add User
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first_name" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last_name" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>User Type</Form.Label>
              <Form.Control as="select" name="user_type" onChange={handleChange} required>
                <option value="">Select User Type</option>
                {userTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
