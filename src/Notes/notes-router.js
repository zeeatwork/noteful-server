const path = require("path");
const express = require("express");
const xss = require("xss");
const NotesService = require("./notes-service");
const foldersRouter = require("../Folders/folders-router");

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNotes = (note) => ({
  id: String(note.id),
  content: xss(note.note_details),
  name: xss(note.note_title),
  folderId: xss(note.parent_folder),
  modified: note.date_created,
});

notesRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    NotesService.getAllNotes(knexInstance)
      .then((notes) => {
        res.json(notes.map(serializeNotes));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name , content , folderId } = req.body;
    const newNote = { note_title: name, 
            note_details: content,
            parent_folder: folderId};

    for (const [key, value] of Object.entries(newNote)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }
    }


    NotesService.insertNote(req.app.get("db"), newNote)
      .then((note) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          .json(serializeNotes(note));
      })
      .catch(next);
  });

notesRouter
  .route("/:note_id")
  .all((req, res, next) => {
    NotesService.getById(req.app.get("db"), req.params.note_id)
      .then((note) => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Note doesn't exist` },
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeNotes(res.note));
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(req.app.get("db"), req.params.note_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { note_title, note_details} = req.body;
    const noteToUpdate = { note_title, note_details };

    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'note_title' or 'note_details'`,
        },
      });

    NotesService.updateNote(req.app.get("db"), req.params.note_id, noteToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = notesRouter;
