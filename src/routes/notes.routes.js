const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../helpers/auth");
const {
  renderNotesForm,
  renderNewCreate,
  renderNotes,
  renderEditNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");
// new note
router.get("/notes/add", isAuthenticated, renderNotesForm);
router.post("/notes/new-note", isAuthenticated, renderNewCreate);

// get notes
router.get("/notes", isAuthenticated, renderNotes);

// edit notes
router.get("/notes/edit/:id", isAuthenticated, renderEditNotes);
router.put("/notes/edit/:id", isAuthenticated, updateNote);
//delete note
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);
module.exports = router;
