CREATE TABLE publisher_kind (
  kind TEXT UNIQUE NOT NULL
);

INSERT INTO publisher_kind (kind) VALUES ('PUBLISHER', 'IMPRINT');

CREATE TABLE publishers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type REFERENCES publisher_kind(kind) NOT NULL,
  parent_publisher_id REFERENCES publishers(id)
);

CREATE TABLE titles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  publisher_id REFERENCES publishers(id) NOT NULL,

  metadata JSONB
);

CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title_id REFERENCES titles(id) NOT NULL,

  metadata JSONB
);

CREATE TABLE issue_conditions (
  issue_id REFERENCES issues(id) NOT NULL,
  raw_values REAL[22] NOT NULL,
  graded_values REAL[22] NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE prices (
  issue_id REFERENCES issues(id) NOT NULL,
  grade TEXT NOT NULL,
  price REAL NOT NULL,
  date TIMESTAMP NOT NULL
);
