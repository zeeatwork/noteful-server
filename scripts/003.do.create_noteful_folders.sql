CREATE TABLE noteful_folders (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  folder-name TEXT NOT NULL,
  note-list TEXT
  date_published TIMESTAMPTZ DEFAULT now() NOT NULL
);