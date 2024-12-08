import React, { useState } from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onDeleteNote }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = [...notes].reverse().slice(indexOfFirstNote, indexOfLastNote); // Reverse the notes before slicing

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {notes.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No notes yet</p>
      ) : (
        <div>
          <div className="space-y-4">
            {currentNotes.map((note) => (
              <NoteItem key={note.id} note={note} onDelete={onDeleteNote} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;

