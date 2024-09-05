import React, { useEffect, useState } from "react";
import { ProjectListMolecule } from "./ProjectList";

export function Project() {
    const [content, setContent] = useState(<ProjectList showForm={showForm} />);

    function showContent() {
        setContent(<ProjectList showForm={showForm} />);
    }

    function showForm(project) {
        setContent(<ProjectForm project={project} showContent={showContent} />);
    }

    return (
        <div className="container my-5">
            {content}
        </div>
    )
}

function ProjectList(props) {
    const url = "http://localhost:4000/projects/";

    const [projects, setProjects] = useState([]);
    const [viewMode, setViewMode] = useState('card');

    useEffect(() => {
        fetchProjects();
    }, [])

    function deleteProject(id) {
        // Show confirmation dialog
        if (window.confirm("Are you sure you want to delete this project?")) {
            // User confirmed
            fetch(url + id, {
                method: "DELETE",
            })
            .then((response) => response.json())
            .then(() => fetchProjects())
            .catch((error) => console.error("Error deleting project:", error));
        } else {
            // User canceled
            console.log("Project deletion canceled.");
        }
    }

    async function fetchProjects(searchQuery = '', sort = 'asc') {
        const baseUrl = "http://localhost:4000/projects";
        let url = baseUrl;

        // Build the query string
        const queryParams = new URLSearchParams();

        if (searchQuery) {
            queryParams.append('q', searchQuery);
        }

        if (sort) {
            queryParams.append('sort', sort);
        }

        // Append query parameters to the base URL
        if (queryParams.toString()) {
            url += `?${queryParams.toString()}`;
        }

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
    }

    return (
        <div className="container my-5">
            <ProjectListMolecule
                projects={projects}
                viewMode={viewMode}
                setViewMode={setViewMode}
                deleteProject={deleteProject}
                fetchProjects={fetchProjects}
                showForm={props.showForm}
            />
        </div>
    );
}

function ProjectForm(props) {
    const [error, setError] = useState("");

    const url = "http://localhost:4000/projects/";

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        //convert formData to Object
        const project = Object.fromEntries(formData.entries());

        //form validation
        if (!project.name || !project.start_date || !project.team_lead) {
            setError(
                <div className="alert alert-warning" role="alert">
                    Please provide all requred the fields!
                </div>
            )
            return
        }
        if (props.project.id) {
            //update the existing project
            fetch(url + props.project.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => props.showContent())
                .catch((error) => {
                    console.log("error :", error);

                });

        } else {

            //create a new project
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => props.showContent())
                .catch((error) => {
                    console.log("error :", error);

                });
        }


    }
    return (
        <>
            <h2 className="text-center mb-3">{props.project.id ? "Edit Project" : "Create new project"}</h2>

            <div className="row">
                <div className="col-lg-6 mx-auto">
                    {error}
                    <form onSubmit={(event) => handleSubmit(event)}>

                        {props.project.id && <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">ID</label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control-plaintext" name="id" defaultValue={props.project.id} />
                            </div>
                        </div>
                        }
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" defaultValue={props.project.name} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Start date</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="start_date" defaultValue={props.project.start_date} type="date" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Team lead</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="team_lead" defaultValue={props.project.team_lead} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Members</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="members" type="number" defaultValue={props.project.members} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Status</label>
                            <div className="col-sm-8" >
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
                                <select className="form-control" name="project_type" defaultValue={props.project.project_type}>
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
