import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNote = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
    }
  };

  const handleBlur = (field) => {
    if (field === 'title' && title.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, title: 'Title is required!' }));
    }
    if (field === 'description' && description.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, description: 'Description is required!' }));
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();

    let formIsValid = true;
    if (title.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, title: 'Title is required!' }));
      formIsValid = false;
    }
    if (description.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, description: 'Description is required!' }));
      formIsValid = false;
    }

    if (formIsValid) {
      const newNote = {
        id: Date.now(),
        title,
        description,
      };

      onAddNote(newNote);
      setTitle('');
      setDescription('');
      setErrors({ title: '', description: '' });
      navigate('/');
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleAddNote} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => handleBlur('title')}
            className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Note Title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            onBlur={() => handleBlur('description')}
            className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Note Description"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;

