import { connection } from "../database.js";

async function create(body) {
  return connection.query(
    `
    INSERT
    INTO comments ("userId", "postId", comment)
    VALUES ($1, $2, $3)
  `,
    [body.userId, body.postId, body.comment]
  );
}

export const commentRepository = {
  create,
};
