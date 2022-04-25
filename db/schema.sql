-- Step 1: create three tables
CREATE TABLE "questions" (
  question_id SERIAL PRIMARY KEY,
  product_id integer NOT NULL,
  question_body varchar(1000) NOT NULL,
  question_date bigint NOT NULL,
  asker_name varchar(60) NOT NULL,
  asker_email varchar(60) NOT NULL,
  reported boolean default false,
  question_helpfulness integer default 0
);

CREATE TABLE "answers" (
  answer_id SERIAL PRIMARY KEY,
  question_id integer,
  body varchar(1000) NOT NULL,
  date bigint NOT NULL,
  answerer_name varchar(60) NOT NULL,
  answerer_email varchar(60) NOT NULL,
  reported boolean default false,
  helpfulness integer default 0
);

CREATE TABLE "photos" (
  id SERIAL PRIMARY KEY,
  answer_id integer NOT NULL,
  url varchar NOT NULL
);

-- step 2: import corresponding data to the table;
-- step 3: create indexes on tables to enhance performance;

CREATE INDEX ON "questions" ("product_id");

CREATE INDEX ON "answers" ("question_id");

CREATE INDEX ON "photos" ("answer_id");

ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("question_id");

ALTER TABLE "photos" ADD FOREIGN KEY ("answer_id") REFERENCES "answers" ("answer_id");

-- step 4: auto increment id at the bottom of the table
-- sub step1:
CREATE sequence questions_question_id_seq;

ALTER TABLE questions ALTER COLUMN id SET DEFAULT nextval('questions_question_id_seq');
-- sub step2:

ALTER SEQUENCE questions_question_id_seq OWNED BY questions.question_id;

SELECT setval('questions_question_id_seq',  COALESCE(max(question_id), 0)) from questions;


-- step 5: auto increment id at the bottom of the table
-- sub step1:
CREATE sequence answers_answer_id_seq;

ALTER TABLE answers ALTER COLUMN id SET DEFAULT nextval('answers_answer_id_seq');
-- sub step2:
ALTER SEQUENCE answers_answer_id_seq OWNED BY answers.answer_id;

SELECT setval('answers_answer_id_seq',  COALESCE(max(answer_id), 0)) from answers;


-- step 5: auto increment id at the bottom of the table
-- sub step1:
CREATE sequence photos_id_seq;

ALTER TABLE photos ALTER COLUMN id SET DEFAULT nextval('photos_id_seq');
-- sub step2:
ALTER SEQUENCE photos_id_seq OWNED BY photos.id;

SELECT setval('photos_id_seq',  COALESCE(max(id), 0)) from photos;