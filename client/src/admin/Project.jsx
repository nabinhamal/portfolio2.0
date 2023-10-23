import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    user: '',
    pdetail: [{ ptitle: '', gitUrl: '', pimage: null }]
  });

  useEffect(() => {
    // Fetch projects from the server
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:YOUR_SERVER_PORT/api/auth/project/get-projects');
        setProjects(response.data.projects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index].pdetail[0][field] = value;
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    setNewProject({
      user: '',
      pdetail: [{ ptitle: '', gitUrl: '', pimage: null }]
    });
  };

  const handleSaveProject = async (index, e) => {
    e.preventDefault();
    try {
      const projectToUpdate = projects[index];
      const response = await axios.put(`http://localhost:YOUR_SERVER_PORT/api/auth/project/update-project/${projectToUpdate._id}`, {
        user: projectToUpdate.user,
        ptitle: projectToUpdate.pdetail[0].ptitle,
        gitUrl: projectToUpdate.pdetail[0].gitUrl
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleAddProject}>Add New Project</button>

      {projects.map((project, index) => (
        <form key={project._id} onSubmit={(e) => handleSaveProject(index, e)}>
          <h2>Project {index + 1}</h2>
          <div>
            <label>User:</label>
            <input
              type="text"
              value={project.user}
              onChange={(e) => handleInputChange(index, 'user', e.target.value)}
            />
          </div>
          <div>
            <label>Project Title:</label>
            <input
              type="text"
              value={project.pdetail[0].ptitle}
              onChange={(e) => handleInputChange(index, 'ptitle', e.target.value)}
            />
          </div>
          <div>
            <label>Git URL:</label>
            <input
              type="text"
              value={project.pdetail[0].gitUrl}
              onChange={(e) => handleInputChange(index, 'gitUrl', e.target.value)}
            />
          </div>
          <button type="submit">Save Project</button>
        </form>
      ))}
    </div>
  );
};

export default UpdateProjects;
