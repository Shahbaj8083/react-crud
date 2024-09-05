import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {

    const isAuthenticated = !!sessionStorage.getItem('authToken');
    const navigate = useNavigate();
    const handleLogout = () => {
        // Remove token from sessionStorage
        sessionStorage.removeItem('authToken');
        navigate("/");
    };

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand p-2" to="/">
                        <img src="/h-square.svg" className="p-1" alt="Project Management Logo" />
                        Project Management
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* <ul className="navbar-nav mb-2 mb-lg-0"> */}
                        <ul className="navbar-nav d-flex flex-row justify-content-between w-100 mb-2 mx-5 mb-lg-0"> {/* Use Flexbox to space items */}
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact-us">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/projects">Projects</Link>
                            </li>
                            {isAuthenticated ? (
                                // Show Admin dropdown with Logout option if authenticated
                                <li className="nav-item dropdown ms-auto">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Admin
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </li>
                            ) : (
                                // Show Login link if not authenticated
                                <li className="nav-item ms-auto">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>


        </React.Fragment>
    );
}