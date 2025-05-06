import Notes from "../Model/Notes/notes.model.js";
import AppError from "../Utils/Apperror.js";

const createNotes = async (req, res, next) => {
  try {
    const { title, content, date } = req.body;
    console.log(req.body)
    const newNote = new Notes({
      title,
      content,
      date,
    //   tags,
    });
    
    const savedNote = await newNote.save();
    
    res.status(200).json({ success:true,message: "Note created successfully", notes: savedNote });
  } catch (error) {
    return next(new AppError('no notes found',502))
  }
};

const getNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (id) {
      const note = await Notes.findById(id);
      if (!note) {
        return next(new AppError('no notes found with this id',592))
      }
      res.status(200).json({
        success:true,
        message:'Notes ',
        notes:note
      })
    } else {
      const notes = await Notes.find({});
      res.status(200).json(notes);
    }
  } catch (error) {
    return next(new AppError('no notes found with this id',592))
  }
};

const updateNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('this is the id',id)
    
    const updatedNote = await Notes.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedNote) {
        return next(new AppError('no notes found',502))
    }
    
    res.status(200).json({success:true, message: "Note updated successfully", notes: updatedNote });
  } catch (error) {
    return next(new AppError(error,502))
  }
};

const deleteNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deletedNote = await Notes.findByIdAndDelete(id);
    
    if (!deletedNote) {
        return next(new AppError('no notes found',502))
    }
    
    res.status(200).json({success:true, message: "Note deleted successfully" });
  } catch (error) {
    return next(new AppError(error,502))
  }
};
const getAll = async(req,res,next) =>{
    const notess = await Notes.find()
    if(!notess){
        return next(new AppError('no notes found',502))
    }
    res.status(200).json({
        success:true,
        message:'ALl notes',
        notes:notess
    })
}

export {
  createNotes,
  getNotes,
  updateNotes,
  deleteNotes,
  getAll
};
