import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Button, Card, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://hotel.aotrek.net/api/auth/manage', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.categories);
      }
    };

    fetchProducts();
  }, [user]);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://hotel.aotrek.net/api/auth/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
          .then(() => {
            setProducts(products.filter(product => product.id !== id));
            Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          })
          .catch(err => {
            Swal.fire('Error!', 'There was a problem deleting the product.', 'error');
          });
      }
    });
  };

  return (
    <div className="container mt-5">
      <Row>
        {products.map(product => (
          <Col key={product.id} md={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle>{product.title}</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" onClick={() => handleUpdate(product.id)}>Update</Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(product.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ManageProducts;
