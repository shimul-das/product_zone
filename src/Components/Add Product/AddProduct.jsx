import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    title: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem('authToken'); // Replace with Redux if necessary

    try {
      const response = await fetch('https://hotel.aotrek.net/api/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use stored token for authorization
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const result = await response.json();

        // Show success message using SweetAlert2
        Swal.fire({
          title: 'Product Created!',
          text: 'Your product has been successfully created.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/all-products'); // Redirect to all products after success
        });
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      // Show error message using SweetAlert2
      Swal.fire({
        title: 'Error',
        text: error.message || 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setError(error.message);
    }
  };

  return (
    <Container className="my-5">
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter product name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter product title"
            value={productData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            placeholder="Enter product description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
