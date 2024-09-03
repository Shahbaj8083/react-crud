import React, { useEffect, useState } from "react";

export function Project() {
    const [content, setContent] = useState(<ProjectList showForm={showForm} />);

    function showContent() {
        setContent(<ProjectList showForm={showForm} />);
    }

    function showForm() {
        setContent(<ProjectForm showContent={showContent} />);
    }

    return (
        <div className="container my-5">
            {content}
            {/* <ProjectList />
            <ProjectForm /> */}
        </div>
    )
}

function ProjectList(props) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, [])

    async function fetchProjects() {
        // async function getData() {
        // const url = "https://example.org/products.json";
        const url = "http://localhost:4000/projects";;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const jsonData = await response.json();
            console.log(jsonData);
            setProjects(jsonData);
        } catch (error) {
            console.error(error.message);
        }
        //   }

    }
    return (
        <>
            <h2 className="text-center mb-3">
                List of products
            </h2>
            <button
                type="button"
                className="btn btn-primary me-2"
                onClick={() => props.showForm()}
            >
                Create
            </button>
            <button
                type="button"
                className="btn btn-outline-primary me-2"
                onClick={() => fetchProjects()}
            >
                Refresh
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Start date</th>
                        <th>Team lead</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        projects.map((project, index) => {
                            return (
                                <tr key={index}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.start_date}</td>
                                    <td>{project.team_lead}</td>
                                    <td>{project.active}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <button type="button" className="btn btn-primary btn-sm me-2">Edit</button>
                                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

function ProjectForm(props) {
    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);

        //convert formData to Object
        const project = Object.fromEntries(formData.entries());

        //form validation
        if(!project.name || !project.start_date || !project.team_lead){
            console.log("please provide required fields");
            return
            
        }
    }
    return (
        <>
            <h2 className="text-center mb-3">Create new project</h2>

            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" defaultValue="" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Start date</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="start_date" defaultValue="" type="date" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Team lead</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="team_lead" defaultValue="" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Members</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="members" type="number" defaultValue="" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Status</label>
                            <div className="col-sm-8">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        id="active"
                                        value="active"
                                    />
                                    <label className="form-check-label" htmlFor="active">
                                        Active
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        id="inactive"
                                        value="inactive"
                                    />
                                    <label className="form-check-label" htmlFor="inactive">
                                        Inactive
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Project Type</label>
                            <div className="col-sm-8">
                                <select className="form-control" name="project_type">
                                    <option value="internal">Internal</option>
                                    <option value="client">Client/External</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary btn-sm me-3">Save</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    onClick={() => props.showContent()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
