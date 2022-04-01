import { connection } from "../database.js";

async function searchUsers(value) {
  return await connection.query(
    `
      SELECT 
      id, 
      name, 
      img 
      FROM users 
        WHERE name ILIKE $1 LIMIT 10
    ` , [`${value}%`]
  )
}

async function verifyFollow(userId, followId) {
  return await connection.query(
    `
    SELECT "followId" 
    FROM follows
      WHERE "userId" = $1 AND "followId" = $2
    `,
    [userId, followId]
  )
}

export const searchBarRepository = {
  searchUsers,
  verifyFollow
}