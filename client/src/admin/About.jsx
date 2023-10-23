import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../utils/auth"; // Replace with your actual auth context path
import toast, { Toaster } from 'react-hot-toast';

const PostForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    aboutMe: '',
    aboutHome: '',
    exp: [],
    profileHome: null,
    profileAbout: null,
    cv: null,
    user: null // Add user field to formData
  });

  const [auth, setAuth] = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/detail/get-detail`);

      if (response.headers['content-type'].includes('application/json')) {
        const { data } = response;

        if (data?.success && data.details.length > 0) {
          const details = data.details[0];

          if (details?.user === auth?.user?.userId) {
            setFormData({
              user: details.user,
              username: details.username,
              aboutMe: details.about,
              aboutHome: details.abouthome,
              exp: details.exp || [''], 
              profileHome: details.profilehome,
              profileAbout: details.profileabout,
              cv: details.cv,
            });
          } else {
            toast.error('You are not authorized to update these details.');
          }
        } else if (data?.message === 'No data found') {
          // If there's no data, set user field
          setFormData({
            ...formData,
            user: auth?.user?.userId,
          });
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    if (name === 'cv') {
      // Read the file as a Buffer
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result;
        setFormData({ ...formData, [name]: buffer });
      };
      reader.readAsArrayBuffer(file);
    } else {
      setFormData({ ...formData, [name]: file });
    }
  };

  const sendDataToServer = async () => {
    try {
      const form = new FormData();
      form.append('user', formData.user);
      form.append('username', formData.username);
      form.append('about', formData.aboutMe);
      form.append('abouthome', formData.aboutHome);
      form.append('exp', JSON.stringify(formData.exp));
      form.append('profilehome', formData.profileHome);
      form.append('profileabout', formData.profileAbout);
      form.append('cv', formData.cv);

      if (formData.user) {
        // Update existing data
        const { data } = await axios.put(
          `${process.env.REACT_APP_API}/detail/update-detail/${formData.user}`,
          form,
          {
            headers: {
              Authorization: `${auth?.token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (data?.success) {
          toast.success('Details updated successfully');
        } else {
          toast.error(data?.message);
        }
      } else {
        // Create new data
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/detail/create-detail`,
          form,
          {
            headers: {
              Authorization: `${auth?.token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (data?.success) {
          toast.success('Details created successfully');
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
      <div className="mb-4">
        <label htmlFor="username" className="block font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData?.username}
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
        {formData.exp?.map((exp, index) => (
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
          Add HerotypeWriter
        </button>
      </div>
      <div className="mb-6">
        <label className="block font-bold mb-6" htmlFor="profileHome">
          Profile Home
        </label>
        <label className="border border-blue-500 cursor-pointer p-4">
          {formData.profileHome ? 'Change Home Photo' : 'Upload Home Photo'}
          <input
            type="file"
            id="profileHome"
            name="profileHome"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, profileHome: e.target.files[0] })}
            hidden
          />
        </label>
        {formData.profileHome && formData.profileHome instanceof File && (
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
        <label className="block font-bold mb-4" htmlFor="profileAbout">
          Profile About
        </label>
        <label className="border border-blue-500 cursor-pointer p-4">
          {formData.profileAbout ? 'Change About Photo' : 'Upload About Photo'}
          <input
            type="file"
            id="profileAbout"
            name="profileAbout"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, profileAbout: e.target.files[0] })}
            hidden
          />
        </label>
        {formData.profileAbout && formData.profileAbout instanceof File && (
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
      <label className="block font-bold mb-4" htmlFor="cv">
  CV
</label>
<label className="border border-blue-500 cursor-pointer p-4">
  {formData.cv ? 'Change CV' : 'Upload CV'}
  <input
    type="file"
    id="cv"
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
          {formData.user ? 'Update' : 'Create'}
        </button>
      </div>
      <Toaster position="top-right " reverseOrder={false} />
    </form>
  );
};

export default PostForm;
