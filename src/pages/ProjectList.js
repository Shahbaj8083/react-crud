import React from "react";

export function ProjectListMolecule(props) {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-2">Projects</h2>

                <div className="col-md-4 d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        onChange={(e) => props.fetchProjects(e.target.value)} // Replace with your search logic
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className={`btn ${props.viewMode === 'card' ? 'btn-secondary' : 'btn-outline-secondary'} me-2`}
                        onClick={() => props.setViewMode('card')}
                    >
                        Card View
                    </button>
                    <button
                        type="button"
                        className={`btn ${props.viewMode === 'list' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                        onClick={() => props.setViewMode('list')}
                    >
                        List View
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => props.showForm({})}
                >
                    Create
                </button>
                <button
                    type="button"
                    className="btn btn-outline-primary me-2"
                    onClick={() => props.fetchProjects()}
                >
                    Refresh
                </button>

            </div>
            {props.viewMode === 'card' ? (
                <div className="row">
                    {props.projects.map((project, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card h-100">
                                <img
                                    // src={`https://via.placeholder.com/150?text=${project.name}`} // Placeholder image URL
                                    src={project.logo} // Placeholder image URL
                                    className="card-img-top"
                                    alt={`${project.name} logo`}
                                    style={{height:"180px"}}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-success text-center">{project.name}</h5><hr />
                                    <p className="card-text">
                                        <strong>ID:</strong> {project.id}<br />
                                        <strong>Start Date:</strong> {project.start_date}<br />
                                        <strong>Team Lead:</strong> {project.team_lead}<br />
                                        <strong>Members:</strong> {project.members}<br />
                                        <strong>Type:</strong> {project.project_type}<br />
                                        <strong>Status:</strong> {project.active == true ? <span className="text-success">Active</span> : <span className="text-danger">Inactive</span>}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            onClick={() => props.showForm(project)}
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => props.deleteProject(project.id)}
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>Team Lead</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.projects.map((project, index) => (
                            <tr key={index}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.start_date}</td>
                                <td>{project.team_lead}</td>
                                <td>{project.active == true ? <span className="text-success">Active</span> : <span className="text-danger">Inactive</span>}</td>
                                <td>
                                    <button
                                        onClick={() => props.showForm(project)}
                                        type="button"
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => props.deleteProject(project.id)}
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}