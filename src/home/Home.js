import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Home() {
    return (
        <div className="container-fluid bg-light p-5">
            <div className="row">
                <div className="card mb-4 shadow-sm">
                    <div className="col text-center">
                        <h1 className="display-4 text-primary">Welcome to My Homepage</h1>
                        <p className="lead text-muted">This is where I showcase my amazing content.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
