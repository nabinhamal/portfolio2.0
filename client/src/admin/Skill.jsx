import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../utils/auth";
import toast, { Toaster } from 'react-hot-toast';

const EducationSkillForm = () => {
  const [education, setEducation] = useState([{ degree: '', school: '', year: '' }]);
  const [skills, setSkills] = useState([{ skill: '', pre: '', color: '' }]);
  const [formData, setFormData] = useState({ user: null, education: [], skills: [] });
  const [auth,setAuth] = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/qualification/get-all`);
  console.log(response)
      const { data } = response;
  
      if (data?.success && data.records.length > 0) {
        const records = data.records[0];
        if (records?.user === auth?.user?.userId) {
        setFormData({
          user: records.user,
          education: records.education || [],
          skills: records.skills || [],
        });
  
        setEducation(records.education || []);
        setSkills(records.skills || []);
      } else {
        setFormData({
          user: auth?.user?.userId || null,
          education: [],
          skills: [],
        });
      }
    }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching data');
    }
  };
  

  const handleAddEducation = () => {
    setEducation([...education, { degree: '', school: '', year: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...education];
    updatedEducation[index][name] = value;
    setEducation(updatedEducation);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { skill: '', pre: '', color: '' }]);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = [...skills];
    updatedSkills[index][name] = value;
    setSkills(updatedSkills);
  };

  const sendDataToServer = async () => {
    try {
      const form = new FormData();
      form.append('user', auth?.user?.userId);
      form.append('education', JSON.stringify(education));
      form.append('skills', JSON.stringify(skills))
      if (formData.user) {
        // Update existing data

         
console.log(formData)
      const { data } = await axios.put(`${process.env.REACT_APP_API}/qualification/update-qualification/${formData.user}`, form, {
        headers: {
          Authorization: `${auth?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.success) {
        toast.success('Qualification updated  successfully');
      } else {
        toast.error(data?.message);
      }
    } else {
      // Create new data
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/qualification/create-qualification`,
        form,
        {
          headers: {
            Authorization: `${auth?.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data?.success) {
        toast.success('Qualification created successfully');
      } else {
        toast.error(data?.message);
      }
    }
  } catch (error) {
    console.error(error);
    toast.error('Error sending data');
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendDataToServer();
  };
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block font-bold mb-2">
            User
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={auth?.user?.userId}
            readOnly
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <h2 className="text-xl font-bold mb-2">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="Degree"
              className="w-full p-2 border rounded mr-2"
            />
            <input
              type="text"
              name="school"
              value={edu.school}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="School"
              className="w-full p-2 border rounded mr-2"
            />
            <input
              type="text"
              name="year"
              value={edu.year}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="Year"
              className="w-full p-2 border rounded mr-2"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEducation}
          className="px-4 py-2 bg-green-500 text-white font-bold rounded"
        >
          Add Education
        </button>
  
        <h2 className="text-xl font-bold my-4">Skills</h2>
        {skills.map((skill, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              name="skill"
              value={skill.skill}
              onChange={(e) => handleSkillChange(index, e)}
              placeholder="Skill"
              className="w-full p-2 border rounded mr-2"
            />
            <input
              type="text"
              name="pre"
              value={skill.pre}
              onChange={(e) => handleSkillChange(index, e)}
              placeholder="Pre"
              className="w-full p-2 border rounded mr-2"
            />
            <input
              type="text"
              name="color"
              value={skill.color}
              onChange={(e) => handleSkillChange(index, e)}
              placeholder="Color"
              className="w-full p-2 border rounded mr-2"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSkill}
          className="px-4 py-2 bg-green-500 text-white font-bold rounded"
        >
          Add Skill
        </button>
  
        <button
          type="submit" // Change the type to submit
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded mt-4"
          onClick={sendDataToServer}
        >
          {formData.user ? 'Update' : 'Create'}
        </button>
      </form>
  
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}  
export default EducationSkillForm;
