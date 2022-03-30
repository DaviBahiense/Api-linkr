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
async function get(postId) {
  return connection.query(
    `
      SELECT comments.*, users.img, users.name 
      FROM comments 
      JOIN users ON comments."userId"=users.id
      WHERE "postId"=$1 
    `,
    [postId]
  );
}

export const commentRepository = {
  create,
  get,
};
