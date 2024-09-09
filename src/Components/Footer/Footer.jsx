import React from 'react'
import { Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';


const Footer = () => {
return (
<footer className="bg-success text-white mt-5 p-5">
    <div className="container-fluid py-3">
        <div className="row">
            <div className="col-md-4 ">
                <h3 className="fst-italic">Product Zone</h3>
                <p className='pe-3 fs-6 fw-semibold text-white'>Product Zone is a simple website where users can add, update, edit, and delete product details. It also includes a user login system for secure access.</p>
            </div>
            <div className="col-md-4 text-center">
                <h3>Quick Link</h3>
                <ul className="list-unstyled fs-5">
                    <Link to='/' className='text-white'><li>Home</li></Link>
                    <Link to='/add-product' className='text-white'><li>Add Products</li></Link>
                    <Link to='/all-products' className='text-white'><li>All Products</li></Link>
                
                </ul>
            </div>
            <div className="col-md-4 text-center">
                <h3>Contact Info</h3>
                <ul className="list-unstyled fs-5">
                    <li><FaMapMarkerAlt></FaMapMarkerAlt>Bangladesh</li>
                    <li><FaPhone></FaPhone> +8801790759568</li>
                    <li><FaEnvelope></FaEnvelope>shimul1322@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr></hr>
        <p className='text-center'>&copy; 2024 Product Zone. Developed by <span className='text-warning'>Shimul Chandra Das</span>.</p>
    </div>
</footer>
)
}

export default Footer