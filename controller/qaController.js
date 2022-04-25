const pool = require('../db/index');

exports.getQuestions = async (req, res) => {
    try {
        const { product_id } = req.query;
        const page = req.query.page || 1;
        const count = req.query.count || 1;
        const questionBody = await pool.query(
            `SELECT row_to_json(quest)
        FROM(
          SELECT product_id,
          (
            SELECT json_agg(json_build_object('question_id', questions.question_id, 'question_body', question_body, 'question_date', question_date, 'asker_name', asker_name, 'question_helpfulness', question_helpfulness, 'reported', reported, 'answers',
            (
              SELECT json_object_agg(
                answer_id, json_build_object(
                  'id', answers.answer_id,
                  'body', answers.body,
                  'date', answers.date,
                  'answerer_name', answers.answerer_name,
                  'helpfulness', answers.helpfulness,
                  'photos',
                  (SELECT array
                    (SELECT url from photos where photos.answer_id = answers.answer_id)
                  )
                )
              )
            FROM answers
            WHERE answers.question_id = questions.question_id
            )
          ))
          FROM questions
          WHERE questions.product_id = ${product_id}  AND questions.reported = false
          ) as results
          FROM questions WHERE questions.product_id = ${product_id}
        ) quest`
        );
        res.status(200).json({
            status: 'OK',
            body: questionBody.rows[0].row_to_json,
        });
    } catch (err) {
        res.send(err);
    }
};

exports.getAnswers = async (req, res) => {
    try {
        const questionId = req.params.question_id;
        const page = req.query.page || 1;
        const count = req.query.count || 5;
        const answerBody = await pool.query(`
      SELECT json_build_object(
          'question', question_id,
          'page', ${page},
          'count', ${count},
          'results',
          (
            SELECT json_agg(
              json_build_object(
                'answer_id', answers.answer_id,
                'body', body,
                'date', date,
                'answerer_name', answerer_name,
                'helpfulness', helpfulness,
                'photos',
                (SELECT json_agg(
                  json_build_object(
                    'id', id,
                    'url', url
                  )
                ) FROM photos
                WHERE photos.answer_id = answers.answer_id
              )
            )
          ) as results
          FROM answers
          WHERE question_id = questions.question_id AND answers.reported=false
          )
        ) FROM questions WHERE questions.question_id = ${questionId} `);
        res.status(200).json({
            status: 'OK',
            body: answerBody.rows[0].json_build_object,
        });
    } catch (err) {
        res.send(err);
    }
};

exports.addQuestion = async (req, res) => {
    try {
        const questionBody = [
            req.body.product_id,
            req.body.question_body,
            new Date().getTime(),
            req.body.asker_name,
            req.body.asker_email,
        ];
        await pool.query(
            'INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email) VALUES($1, $2, $3, $4, $5)',
            questionBody
        );
        res.status(201).send('CREATED A QUESTION');
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addAnswer = async (req, res) => {
    try {
        const answerBody = [
            req.body.question_id,
            req.body.body,
            new Date().getTime(),
            req.body.answerer_name,
            req.body.answerer_email,
            req.body.photo,
        ];
        await pool.query(
            `WITH temp AS (
          INSERT INTO answers
            (question_id, body, date, answerer_name, answerer_email )
          VALUES
            ($1, $2, $3, $4, $5)
          RETURNING answer_id)
        INSERT INTO photos
          (answer_id, url)
        VALUES ((SELECT answer_id FROM temp), unnest($6::text[]))
        `,
            answerBody
        );
        res.status(201).send('CREATED AN ANSWER');
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.markQuesHelpful = async (req, res) => {
    try {
        const theQuesId = req.params.question_id;
        pool.query(
            `UPDATE questions SET question_helpfulness=question_helpfulness+1 WHERE question_id=${theQuesId}`
        );
        res.status(204).send('UPDATED');
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.reportQues = async (req, res) => {
    try {
        const theQuesId = req.params.question_id;
        pool.query(
            `UPDATE questions SET reported=true WHERE question_id=${theQuesId}`
        );
        res.status(204).send('UPDATED');
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.markAnsHelpful = async (req, res) => {
    try {
        const theAnswerId = req.params.answer_id;
        pool.query(
            `UPDATE answers SET helpfulness=helpfulness+1 WHERE answer_id=${theAnswerId}`
        );
        res.status(204).send('UPDATED');
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.reportAns = async (req, res) => {
    try {
        const theAnswerId = req.params.answer_id;
        pool.query(
            `UPDATE answers SET reported=true WHERE answer_id=${theAnswerId}`
        );
        res.status(204).send('UPDATED');
    } catch (err) {
        res.status(400).send(err);
    }
};
