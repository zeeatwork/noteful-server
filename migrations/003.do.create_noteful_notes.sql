CREATE TABLE noteful_notes (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  note_details TEXT,
  note_title TEXT NOT NULL,
  parent_folder INTEGER REFERENCES noteful_folders(id) ON DELETE CASCADE NOT NULL,
  date_created TIMESTAMPTZ DEFAULT now() NOT NULL
)

/*IS MY CASCADE IN THE CORRECT PLACE? IF 
THE FOLDER IS DELETED, I WANT THE CORRESPONDING NOTES TO BE DELETED*/