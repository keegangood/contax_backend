import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  newNoteText: "",
  updatedNoteText: "",
};

const NoteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    addNote: (state, action) => {
      const { newNoteText } = action.payload;
      return {
        notes: state.notes.concat({ text: newNoteText, editing: false }),
      };
    },
    editNote: (state, action) => {
      const { noteIndex, editing } = action.payload;
      return {
        notes: state.notes.map((note, index) =>
          noteIndex === index
            ? { ...note, editing }
            : { ...note, editing: false }
        ),
      };
    },
    updateNote: (state, action) => {
      const { noteIndex, updatedNoteText } = action.payload;
      return {
        notes: state.notes.map((note, index) =>
          noteIndex === index
            ? { ...note, text: updatedNoteText, editing: false }
            : note
        ),
      };
    },
    deleteNote: (state, action) => {
      const { noteIndex } = action.payload;

      return {
        ...state,
        notes: state.notes.filter((note, index) => noteIndex !== index),
      };
    },
    setNotes: (state, action) => {
      const { notes } = action.payload;
      return {
        ...state,
        notes,
      };
    },
  },
});

export const { addNote, editNote, updateNote, deleteNote } = NoteSlice.actions;

export default NoteSlice.reducer;
