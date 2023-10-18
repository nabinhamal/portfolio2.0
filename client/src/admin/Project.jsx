import React, { useState } from 'react';

const Project = () => {
  const [projectTitles, setProjectTitles] = useState([{ title: '', gitUrl: '' }]);
  const [projectImages, setProjectImages] = useState([{ image: null, preview: null }]);

  const handleAddTitle = () => {
    setProjectTitles([...projectTitles, { title: '', gitUrl: '' }]);
  };

  const handleRemoveTitle = (index) => {
    const updatedTitles = [...projectTitles];
    updatedTitles.splice(index, 1);
    setProjectTitles(updatedTitles);
  };

  const handleTitleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTitles = [...projectTitles];
    updatedTitles[index][name] = value;
    setProjectTitles(updatedTitles);
  };

  const handleAddImage = () => {
    setProjectImages([...projectImages, { image: null, preview: null }]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...projectImages];
    updatedImages.splice(index, 1);
    setProjectImages(updatedImages);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedImages = [...projectImages];
    updatedImages[index].image = file;
    updatedImages[index].preview = URL.createObjectURL(file);
    setProjectImages(updatedImages);
  };

  const handleUpdate = () => {
    // Add logic to handle the update here
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Project Titles</h2>
      {projectTitles.map((title, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            name="title"
            value={title.title}
            onChange={(e) => handleTitleChange(index, e)}
            placeholder="Project Title"
            className="w-full p-2 border rounded mr-2"
          />
          <input
            type="text"
            name="gitUrl"
            value={title.gitUrl}
            onChange={(e) => handleTitleChange(index, e)}
            placeholder="GitHub URL"
            className="w-full p-2 border rounded mr-2"
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveTitle(index)}
              className="px-4 py-2 bg-red-500 text-white font-bold rounded"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddTitle}
        className="px-4 py-2 bg-green-500 text-white font-bold rounded"
      >
        Add Project Title
      </button>

      <h2 className="text-xl font-bold my-4">Project Images</h2>
      {projectImages.map((image, index) => (
        <div key={index} className="flex mb-2">
          <label className="border border-blue-500 cursor-pointer p-4">
            {image.image ? 'Change Project Image' : 'Upload Project Image'}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
              hidden
            />
          </label>
          {image.preview && (
            <div className="text-center mt-2">
              <img
                src={image.preview}
                alt="Project Image Preview"
                className="max-h-40 mx-auto"
              />
            </div>
          )}
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="px-4 py-2 bg-red-500 text-white font-bold rounded"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddImage}
        className="px-4 py-2 bg-green-500 text-white font-bold rounded"
      >
        Add Project Image
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

export default Project;
