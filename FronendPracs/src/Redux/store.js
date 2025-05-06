import { configureStore } from "@reduxjs/toolkit";
import notesSliceReducer from './Slices/notes.slice'
const store = configureStore({
    reducer:{
        notes:notesSliceReducer
    },
    devTools:true
})

export default store