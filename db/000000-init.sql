CREATE EXTENSION "uuid-ossp";

CREATE TABLE emails (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE publisher_kind (
  kind TEXT PRIMARY KEY
);

INSERT INTO publisher_kind VALUES
  ('PUBLISHER'),
  ('IMPRINT');

CREATE TABLE publishers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT REFERENCES publisher_kind(kind) NOT NULL,
  parent_publisher_id UUID REFERENCES publishers(id)
);

CREATE TABLE titles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  publisher_id UUID REFERENCES publishers(id) NOT NULL,

  metadata JSONB
);

CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title_id UUID REFERENCES titles(id) NOT NULL,

  metadata JSONB
);

CREATE TABLE issue_conditions (
  issue_id UUID REFERENCES issues(id) NOT NULL,
  raw_values REAL[22] NOT NULL,
  graded_values REAL[22] NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE prices (
  issue_id UUID REFERENCES issues(id) NOT NULL,
  grade TEXT NOT NULL,
  price REAL NOT NULL,
  date TIMESTAMP NOT NULL
);
