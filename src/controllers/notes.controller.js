const res = require("express/lib/response");
const Note = require("../models/Note");
const { all } = require("../routes/notes.routes");
const notesCtrl = {};

notesCtrl.renderNotesForm = (req, res) => {
  console.log(req.user);
  res.render("notes/newNotes");
};
notesCtrl.renderNewCreate = async (req, res) => {
  const { title, description } = req.body;

  const newNote = new Note({
    title,
    description,
  });
  newNote.user = req.user.id;

  await newNote.save();
  req.flash("success_msg", "Note added Successfully");
  res.redirect("/notes");
};

notesCtrl.renderNotes = async (req, res) => {
  const allNotes = await Note.find({ user: req.user.id }).sort({
    createdAt: "desc",
  });
  console.log(allNotes);
  res.render("notes/all-notes", { allNotes });
};
notesCtrl.renderEditNotes = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user != req.user.id) {
    req.flash("error_msg", "NO TIENES PERMISOS");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};
notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note updated Successfully");

  res.redirect("/notes");
};
notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note Delete Successfully");

  res.redirect("/notes");
};
module.exports = notesCtrl;
