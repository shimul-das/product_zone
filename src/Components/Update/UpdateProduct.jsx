import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get product id from route parameters
  const navigate = useNavigate();

  const [products, setProducts] = useState([]); // To store the list of all products
  const [product, setProduct] = useState({
    name: '',
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch all products and match the product by id
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://hotel.aotrek.net/api/auth/manage', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          const matchedProduct = data.categories.find((p) => p.id === parseInt(id));
          if (matchedProduct) {
            setProduct({
              name: matchedProduct.name,
              title: matchedProduct.title,
              description: matchedProduct.description,
            });
          } else {
            Swal.fire('Error!', 'Product not found.', 'error');
            navigate('/manage'); // Redirect back to manage page if product not found
          }
        } else {
          Swal.fire('Error!', 'Failed to fetch products.', 'error');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        Swal.fire('Error!', 'Failed to fetch products.', 'error');
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };
    fetchProducts();
  }, [id, user.token, navigate]);

  // Handle form change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://hotel.aotrek.net/api/auth/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();

      if (data.success) {
        Swal.fire('Success!', 'Product has been updated.', 'success');
        navigate('/manage'); // Redirect to the manage products page
      } else {
        Swal.fire('Error!', 'Failed to update the product.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong!', 'error');
    }
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />; // Show a spinner while loading
  }

  return (
    <div className="container mt-5">
      <h2>Update Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;
