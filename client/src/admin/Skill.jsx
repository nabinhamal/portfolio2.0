import React, { useState } from 'react';

const Skill = () => {
  const [education, setEducation] = useState([{ degree: '', school: '', year: '' }]);
  const [skills, setSkills] = useState([{ skill: '', per: '', color: '' }]);

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
    setSkills([...skills, { skill: '', per: '', color: '' }]);
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

  const handleUpdate = () => {
    // Add logic to handle the update here
    console.log('Education Data:', education);
    console.log('Skills Data:', skills);
  };

  return (
    <div>
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
            name="per"
            value={skill.per}
            onChange={(e) => handleSkillChange(index, e)}
            placeholder="Percentage"
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
        type="button"
        onClick={handleUpdate}
        className="px-4 py-2 bg-blue-500 text-white font-bold rounded mt-4"
      >
        Update
      </button>
    </div>
  );
};

export default Skill;
