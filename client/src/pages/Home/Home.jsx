import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createCustomer } from '../../api';
import AddCustomerForm from './customer/AddCustomer';
import './style.css'
const Home = () => {
    const [customers, setCustomers] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(8);
    const [filterName, setFilterName] = useState('');
    const [newCustomerData, setNewCustomerData] = useState({
      fullname: '',
      phone: 0,
      Address: '',
      OrderDetails: '',
      status: '',
    });

  const handleShowModal = () => {
    setShowAddCustomerModal(true); // Open the modal
  };
  const handleCloseModal = () => {
    setShowAddCustomerModal(false); // Close the modal
  };
  const handleAddCustomer = async (customerData) => {
    try {
      await createCustomer(customerData);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };
  return (
    <>
    <div>
      {/* <div className="bg-green-300 h-screen w-full">
        <h1>Welcome to royal jet</h1>
        <Button className="me-2" variant="success" onClick={handleShowModal}>
          Order Design 
        </Button>
      </div> */}
      {/* Modal to display the "Add Emp" form */}
      <Modal show={showAddCustomerModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCustomerForm
            onAddCustomer={handleAddCustomer}
            onClose={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </div>
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
            <a className="navbar-brand" href="#home">Royal Jet</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="#home">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                    <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                    <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <header className="bg-dark py-5">
        <div className="container px-5">
            <div className="row gx-5 justify-content-center">
                <div className="col-lg-6">
                    <div className="text-center my-5">
                        <h1 className="display-5 fw-bolder text-white mb-2">Your Visbility Is Our Responsibility</h1>
                        <p className="lead text-white-50 mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit!</p>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                            <Button className="me-2" variant="success" onClick={handleShowModal}>
          Order Design 
        </Button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section className="py-5 border-bottom" id="services">
        <div className="container px-5 my-5">
            <div className="row gx-5">
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                    <h2 className="h4 fw-bolder">Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We will add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a className="text-decoration-none" href="#!">
                        Call to action
                        <i className="bi bi-arrow-right"></i>
                    </a>
                </div>
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building"></i></div>
                    <h2 className="h4 fw-bolder">Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We will add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a className="text-decoration-none" href="#!">
                        Call to action
                        <i className="bi bi-arrow-right"></i>
                    </a>
                </div>
                <div className="col-lg-4">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                    <h2 className="h4 fw-bolder">Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We will add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a className="text-decoration-none" href="#!">
                        Call to action
                        <i className="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <section className="bg-light py-5 border-bottom">
        <div className="container px-5 my-5">
            <div className="text-center mb-5">
                <h2 className="fw-bolder">Pay as you grow</h2>
                <p className="lead mb-0">With our no hassle pricing plans</p>
            </div>
            <div className="row gx-5 justify-content-center">
                <div className="col-lg-6 col-xl-4">
                    <div className="card mb-5 mb-xl-0">
                        <div className="card-body p-5">
                            <div className="small text-uppercase fw-bold text-muted">Free</div>
                            <div className="mb-3">
                                <span className="display-4 fw-bold">$0</span>
                                <span className="text-muted">/ mo.</span>
                            </div>
                            <ul className="list-unstyled mb-4">
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    <strong>1 users</strong>
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    5GB storage
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Unlimited public projects
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Community access
                                </li>
                                <li className="mb-2 text-muted">
                                    <i className="bi bi-x"></i>
                                    Unlimited private projects
                                </li>
                                <li className="mb-2 text-muted">
                                    <i className="bi bi-x"></i>
                                    Dedicated support
                                </li>
                                <li className="mb-2 text-muted">
                                    <i className="bi bi-x"></i>
                                    Free linked domain
                                </li>
                                <li className="text-muted">
                                    <i className="bi bi-x"></i>
                                    Monthly status reports
                                </li>
                            </ul>
                            <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-xl-4">
                    <div className="card mb-5 mb-xl-0">
                        <div className="card-body p-5">
                            <div className="small text-uppercase fw-bold">
                                <i className="bi bi-star-fill text-warning"></i>
                                Pro
                            </div>
                            <div className="mb-3">
                                <span className="display-4 fw-bold">$9</span>
                                <span className="text-muted">/ mo.</span>
                            </div>
                            <ul className="list-unstyled mb-4">
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    <strong>5 users</strong>
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    5GB storage
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Unlimited public projects
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Community access
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Unlimited private projects
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Dedicated support
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Free linked domain
                                </li>
                                <li className="text-muted">
                                    <i className="bi bi-x"></i>
                                    Monthly status reports
                                </li>
                            </ul>
                            <div className="d-grid"><a className="btn btn-primary" href="#!">Choose plan</a></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-xl-4">
                    <div className="card">
                        <div className="card-body p-5">
                            <div className="small text-uppercase fw-bold text-muted">Enterprise</div>
                            <div className="mb-3">
                                <span className="display-4 fw-bold">$49</span>
                                <span className="text-muted">/ mo.</span>
                            </div>
                            <ul className="list-unstyled mb-4">
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    <strong>Unlimited users</strong>
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    5GB storage
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Unlimited public projects
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Community access
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Unlimited private projects
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    Dedicated support
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check text-primary"></i>
                                    <strong>Unlimited</strong>
                                    linked domains
                                </li>
                                <li className="text-muted">
                                    <i className="bi bi-check text-primary"></i>
                                    Monthly status reports
                                </li>
                            </ul>
                            <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="py-5 border-bottom">
        <div className="container px-5 my-5 px-5">
            <div className="text-center mb-5">
                <h2 className="fw-bolder">Customer testimonials</h2>
                <p className="lead mb-0">Our customers love working with us</p>
            </div>
            <div className="row gx-5 justify-content-center">
                <div className="col-lg-6">
                    <div className="card mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex">
                                <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                <div className="ms-4">
                                    <p className="mb-1">Thank you for putting together such a great product. We loved working with you and the whole team, and we will be recommending you to others!</p>
                                    <div className="small text-muted">- Client Name, Location</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body p-4">
                            <div className="d-flex">
                                <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                <div className="ms-4">
                                    <p className="mb-1">The whole team was a huge help with putting things together for our company and brand. We will be hiring them again in the near future for additional work!</p>
                                    <div className="small text-muted">- Client Name, Location</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</>
  );
};
export default Home;