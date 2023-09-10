import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card, Row, CardImg, Container } from 'react-bootstrap';
import { createCustomer } from '../../api';
import AddCustomerForm from './customer/AddCustomer';
import './home.css';
import image4 from './images/image4.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image7 from './images/image7.webp';
import image6 from './images/image6.jpg';
import image8 from './images/image8.webp';
import image9 from './images/image9.webp';
import logo from './images/image1.jpg';



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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container px-5">
            <a className="navbar-brand" href="#home">
                <img src={logo} alt="" className='logoo'/>Royal Jet
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="#home">Home</a></li>
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="#services">Services</a></li>
                    <li className="nav-item"><a className="nav-link active" aria-current="page" href="#about">About</a></li>
                    {/* <li className="nav-item"><a className="nav-link active " aria-current="page" href="#contact">Contact</a></li> */}
                    <Button className="-me-4" variant="dark" onClick={handleShowModal}>
          Request Order
        </Button>
                </ul>
            </div>
        </div>
    </nav>
    <header className="hero py-5">
        <div className="container px-5">
            <div className="row gx-5 justify-content-left">
                <div className="col-lg-6">
                    <div className="text-left my-5">
                        <h1 className="display-5 fw-bolder text-white mb-2">Welcome to Royaljet</h1>
                        <p className="lead text-white-50 mb-4">We are your regional solutions provider. Sagaljet expertise is in understanding our customers’ needs – from concept to execution. Combined with our breadth of products and services, we are equipped to handle your multi-channel strategic execution!</p>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">

                            {/* <Button className="me-2" variant="success" onClick={handleShowModal}>
          Order Design 
        </Button> */}



        
        
                            
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
                <img src={image4} alt="" className="image" />
                </div>
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <img src={image2} alt="image 2" className="image"/>
                </div>

                <div className="col-lg-4">
                   <img src={image3} alt="image 3" className="image"/>
                </div>
            </div>
        </div>


        
    </section>

    
   
    
    
    <section className="py-5 border-bottom" id="services">
        <div className="container px-5 my-5">
            <div className="row gx-5">
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                    <h2 className="h4 fw-bolder">Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We will add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a className="text-decoration-none" href="#!">
                        <i className="bi bi-arrow-right"></i>
                    </a>
                </div>
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building"></i></div>
                    <h2 className="h4 fw-bolder">Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We will add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a className="text-decoration-none" href="#!">
                       
                        <i className="bi bi-arrow-right"></i>
                    </a>
                </div>

                <div className="col-lg-4">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                    <h2 className="h4 fw-bolder">Featured title</h2>
                    <p>We are your regional solutions provider. Royaljet expertise is in understanding our customers’ needs – from concept to execution. Combined with our breadth of products and services, we are equipped to handle your multi-channel strategic execution..</p>
                    <a className="text-decoration-none" href="#!">
                      
                        <i className="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>


        
    </section>
    
    <div className="responsive">
  <div className="gallery">
    <a target="_blank" href="img_5terre.jpg">
      <img src={image8} alt="Cinque Terre" />
    </a>
  </div>
</div>

<div className="responsive">
  <div className="gallery">
    <a target="_blank" href="img_forest.jpg" >
      <img src={image7} alt="Forest" />
    </a>
  </div>
</div>

<div className="responsive">
  <div className="gallery">
    <a target="_blank" href="img_lights.jpg">
      <img src={image6} alt="Northern Lights" />
    </a>
  </div>
</div>

<div className="responsive">
  <div className="gallery">
    <a target="_blank" href="img_mountains.jpg">
      <img src={image9} alt="Mountains" />
    </a>
  </div>
</div>

<div className="clearfix"></div>
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
    <section>
        <div className="bg-primary text-center py-2 text-white">
            <p className='footer'>
                Royaljet@2023
            </p>
        </div>
    </section>
</div>
</>
  );
};
export default Home;