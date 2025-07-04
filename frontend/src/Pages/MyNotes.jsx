import React, {useEffect, useState} from 'react';
import axios from "axios";
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md";

function MyNotes() {
    const [notes, setNotes] = useState([])
    const [error, setError] = useState('')

    const [showEdit, setShowEdit] = useState(false)
    const [currentNote, setCurrentNote] = useState(null)

    const [showCreateNote, setShowCreateNote] = useState(false)

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userId = user?._id;

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/notes/get/${userId}`);
                console.log(res)
                setNotes(res.data);
            } catch (err) {
                setError('Failed to fetch notes. Please try again later.');
            }
        };

        if (userId) {
            fetchNotes();
        }
    }, [userId]);

    const handleEdit = (note) => {
        setCurrentNote(note); // 🟢 selected note
        setShowEdit(true);
    };

  return (
      <div className="min-h-screen bg-gray-50 py-10 px-6 flex" >
          <div className="flex flex-col justify-start mb-4">
              <button onClick={()=>setShowCreateNote(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                  Create Note
              </button>
          </div>

          <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">My Notes</h2>

              {error && (
                  <div className="text-red-600 mb-4 text-center">{error}</div>
              )}
              {notes.length === 0 ? (
                  <p className="text-gray-500 text-center">You have no notes yet.</p>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {notes.map(note => (
                          <div key={note._id} className="bg-white p-4 rounded-xl shadow-md border w-[300px]">
                              <h3 className="text-xl font-semibold text-blue-700 mb-2">{note.topic}</h3>
                              <p className="text-gray-700">{note.desc}</p>
                              <CiEdit size={24} className="cursor-pointer" onClick={() => handleEdit(note)} /> <MdDelete size={30}/>
                          </div>
                      ))}
                  </div>
              )}
          </div>

          {showEdit && currentNote && (
              <Edit note={currentNote} onClose={() => setShowEdit(false)} />
          )}

          {showCreateNote && (
              <CreateNote onClose={() => setShowCreateNote(false)} />
          )}
      </div>
  );
}

export default MyNotes;


function Edit({ note, onClose }) {
    const [topic, setTopic] = useState(note.topic);
    const [desc, setDesc] = useState(note.desc);
    const [change, setChange] = useState(false)

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/notes/update/${note._id}`, {
                topic,
                desc
            });
            alert("Note updated!");
            onClose(); // close edit box
            window.location.reload(); // 🔁 Reload the page
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                <h2 className="text-lg font-bold mb-4">Edit Note</h2>
                <input
                    type='text'
                    value={topic}
                    onChange={(e) => {
                        setTopic(e.target.value)
                        setChange(true)}}
                    placeholder="Topic"
                    className="w-full mb-3 px-3 py-2 border rounded"
                />
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Description"
                    className="w-full mb-3 px-3 py-2 border rounded"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleUpdate} className={`px-4 py-2 rounded text-white ${change ? 'bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}>Save</button>
                </div>
            </div>
        </div>
    );
}





function CreateNote({ onClose }) {
    const [topic, setTopic] = useState('');
    const [desc, setDesc] = useState('');

    const handleSave = async () => {
        try {
            // Call your backend API to save the note
            const res = await axios.post('http://localhost:5000/api/notes/create', {
                topic,
                desc,
                userId: JSON.parse(localStorage.getItem('currentUser'))._id
            });

            alert("Note created!");
            onClose(); // Close the form after success
            window.location.reload(); // Optional: reload notes
        } catch (err) {
            alert("Error saving note.");
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md mx-auto mt-4">
            <input
                type="text"
                placeholder="Note topic"
                className="w-full mb-3 p-2 border rounded"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <textarea
                placeholder="Note description"
                className="w-full mb-3 p-2 border rounded"
                rows="4"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <div className="flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

