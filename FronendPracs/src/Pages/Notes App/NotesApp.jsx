import { useEffect, useState } from 'react';
import { Trash2, Edit, Plus, ArrowLeft } from 'lucide-react';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { createNotes, deleteNotes, getAllNotes, updateNotes } from '../../Redux/Slices/notes.slice';
export default function NotesApp() {

  

  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const {loading,error,notes}  = useSelector((state)=>state.notes)
  console.log('this is notes',notes)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const viewNote = (note) => {
    setCurrentNote(note);
    setIsEditing(false);
  };

  const goBack = () => {
    setCurrentNote(null);
    setIsEditing(false);
  };

  const editNote = (note) => {
    setCurrentNote(note);
    setFormData({ title: note.title, content: note.content });
    setIsEditing(true);
  };

  const deleteNote = (id) => {
    console.log('this is the id',id)
    dispatch(deleteNotes(id))
    if (currentNote && currentNote.id === id) {
      goBack();
    }
  };

  useEffect(()=>{
    dispatch(getAllNotes())
  },[dispatch])

  const saveNote = async(e) => {
    e.preventDefault();
    if (currentNote) {
        const updatedNote = {
            title: formData.title,
            notes: formData.content, // assuming the backend expects `notes` as the content field
          };
        const id = currentNote._id
        await dispatch(updateNotes( updatedNote,id ));
        
    } else {
      const newNote = {
        // id: Date.now(),
        title: formData.title,
        content: formData.content,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      const response = await dispatch(createNotes(newNote))

    //   setNotes([newNote, ...notes]);
    }
    setIsEditing(false);
    setCurrentNote(null);
    setFormData({ title: '', content: '' });
  };

  const createNewNote = () => {
    setCurrentNote(null);
    setFormData({ title: '', content: '' });
    setIsEditing(true);
  };

  const renderNotesList = () => (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Notes</h1>
        <button 
          onClick={createNewNote}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Plus size={20} className="stroke-[2.5]" />
          <span className="font-medium">Create Note</span>
        </button>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-xl mb-2">No notes yet</p>
          <p className="text-gray-500 dark:text-gray-400">Click the button above to create your first note!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {notes.map(note => (
            <div 
              key={note.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => viewNote(note)}
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">{note.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{note.date}</p>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{note.content}</p>
                </div>
                <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        editNote(note);
                      }}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Edit note"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note._id);
                      }}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Delete note"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Note detail view
  const renderNoteDetail = () => (
    <div className="p-4 max-w-4xl mx-auto">
      <button 
        onClick={goBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Back to notes</span>
      </button>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{currentNote.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{currentNote.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => editNote(currentNote)}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Edit note"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={() => deleteNote(currentNote.id)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Delete note"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
          {currentNote.content}
        </div>
      </div>
    </div>
  );

  // Note edit/create form
  const renderNoteForm = () => (
    <div className="p-4 max-w-4xl mx-auto">
      <button 
        onClick={goBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Cancel</span>
      </button>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {currentNote ? 'Edit Note' : 'Create New Note'}
        </h1>
        
        <form onSubmit={saveNote}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Note title"
            />
          </div>
          
          <div className="mb-8">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="8"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Write your note here..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            {currentNote ? 'Save Changes' : 'Create Note'}
          </button>
        </form>
      </div>
    </div>
  );

  // Determine which view to render
  const renderContent = () => {
    if (isEditing) {
      return renderNoteForm();
    } else if (currentNote) {
      return renderNoteDetail();
    } else {
      return renderNotesList();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {renderContent()}
    </div>
  );
}