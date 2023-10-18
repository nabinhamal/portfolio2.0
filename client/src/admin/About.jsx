import React, { useState } from 'react';

const PostForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    aboutMe: '',
    aboutHome: '',
    exp: [],
    profileHome: null,
    profileAbout: null,
    cv: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExpChange = (e, index) => {
    const newExp = [...formData.exp];
    newExp[index] = e.target.value;
    setFormData({ ...formData, exp: newExp });
  };

  const handleAddExp = () => {
    const newExp = [...formData.exp, ''];
    setFormData({ ...formData, exp: newExp });
  };

  const handleRemoveExp = (index) => {
    const newExp = [...formData.exp];
    newExp.splice(index, 1);
    setFormData({ ...formData, exp: newExp });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="aboutMe" className="block font-bold mb-2">
            About Me
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="aboutHome" className="block font-bold mb-2">
            About Home
          </label>
          <textarea
            id="aboutHome"
            name="aboutHome"
            value={formData.aboutHome}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Experience</label>
          {formData.exp.map((exp, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={exp}
                onChange={(e) => handleExpChange(e, index)}
                className="w-full p-2 border rounded mr-2"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveExp(index)}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddExp}
            className="px-4 py-2 bg-green-500 text-white font-bold rounded"
          >
            Add Experience
          </button>
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-6">Profile Home</label>
          <label className="border border-blue-500 cursor-pointer p-4">
            {formData.profileHome ? 'Change Home Photo' : 'Upload Home Photo'}
            <input
              type="file"
              name="profileHome"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, profileHome: e.target.files[0] })}
              hidden
            />
          </label>
          {formData.profileHome && (
            <div className="text-center mt-2">
              <img
                src={URL.createObjectURL(formData.profileHome)}
                alt="Home Photo"
                className="max-h-40 mx-auto"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-4">Profile About</label>
          <label className="border border-blue-500 cursor-pointer p-4">
            {formData.profileAbout ? 'Change About Photo' : 'Upload About Photo'}
            <input
              type="file"
              name="profileAbout"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, profileAbout: e.target.files[0] })}
              hidden
            />
          </label>
          {formData.profileAbout && (
            <div className="text-center mt-2">
              <img
                src={URL.createObjectURL(formData.profileAbout)}
                alt="About Photo"
                className="max-h-40 mx-auto"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-4">CV</label>
          <label className="border border-blue-500 cursor-pointer p-4">
            {formData.cv ? 'Change CV' : 'Upload CV'}
            <input
              type="file"
              name="cv"
              accept=".pdf"
              onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
              hidden
            />
          </label>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
          >
            Submit
          </button>
        </div>
      </form>
   
  );
};

export default PostForm;
