import React from 'react';

const NoteItem = ({ note, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-lg">{note.title}</h3>
          <p className="text-gray-600">{note.description}</p>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
