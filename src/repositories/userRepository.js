import { connection } from "../database.js";

async function usersId(id) {
  return await connection.query(
    `
            SELECT
                *
                FROM users
                WHERE id = $1
        `,
    [id]
  );
}

export const userRepository = {
  usersId,
};
