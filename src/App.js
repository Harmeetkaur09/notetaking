import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const addNoteHandler = (note) => {
    const newNotes = [note, ...notes];
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const deleteNoteHandler = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Note Taking App</h1>
          
          <Routes>
            <Route path="/" element={
              <>
                <div className="mb-4 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Search notes by title"
                  />
                  <Link
                    to="/add-note"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                  >
                    Add Note
                  </Link>
                </div>
                <NoteList notes={filteredNotes} onDeleteNote={deleteNoteHandler} />
              </>
            } />
            <Route path="/add-note" element={<AddNote onAddNote={addNoteHandler} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

