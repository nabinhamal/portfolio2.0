import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../utils/auth";
import toast, { Toaster } from 'react-hot-toast';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/project/get-project`);

      if (response.headers['content-type'].includes('application/json')) {
        const { data } = response;

        if (data?.success && data.projects.length > 0) {
          const projects = data.projects;

          setProjects(projects);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching data');
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/project/delete-project/${projectId}`, {
        headers: {
          Authorization: `${auth?.token}`,
        },
      });

      if (response.data?.success) {
        toast.success('Project deleted successfully!');
        setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
      } else {
        toast.error('Error deleting project');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting project');
    }
  };

  const handleAddProject = async () => {
    try {
      const ptitle = document.getElementById('ptitle').value;
      const gitUrl = document.getElementById('gitUrl').value;
      const pimage = document.getElementById('pimage').files[0];
  
      if (!ptitle || !gitUrl) {
        toast.error('Please enter Project Title and GitHub URL');
        return;
      }
  
      const pname = ptitle.toLowerCase().replace(/\s/g, '-'); // Generate pname from ptitle
  
      const formData = new FormData();
      formData.append('ptitle', ptitle);
      formData.append('gitUrl', gitUrl);
      formData.append('pimage', pimage);
      formData.append('pname', pname); // Add pname to the formData
  
      const response = await axios.post(`${process.env.REACT_APP_API}/project/create-project`, formData, {
        headers: {
          Authorization: `${auth?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data?.success) {
        toast.success('New project created!');
        setProjects(prevProjects => [...prevProjects, response.data.project]);
      } else {
        toast.error('Error creating project');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error creating project');
    }
  };
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Projects</h2>
      {projects.map(project => (
        <ProjectCard
          key={project._id}
          project={project}
          onDelete={handleDelete}
        />
      ))}
      <div className="border p-4 mb-4">
        <h3 className="text-xl font-bold mb-2">Add Project</h3>
        <input
          type="text"
          name="ptitle"
          id="ptitle"
          placeholder="Project Title"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="gitUrl"
          id="gitUrl"
          placeholder="GitHub URL"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="file"
          name="pimage"
          id="pimage"
          accept="image/*"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="button"
          onClick={handleAddProject}
          className="px-4 py-2 bg-green-500 text-white font-bold rounded"
        >
          Add Project
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

const ProjectCard = ({ project, onDelete }) => {
  if (!project) {
    return null; // Return null if project is undefined
  }

  return (
    <div className="border p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{project.ptitle}</h3>
      <p className="mb-2">{project.gitUrl}</p>
      <button
        type="button"
        onClick={() => onDelete(project._id)}
        className="px-4 py-2 bg-red-500 text-white font-bold rounded"
      >
        Delete
      </button>
    </div>
  );
};


export default Project;
