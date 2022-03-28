import { connection } from "../database.js";

async function searchUsers(value) {
  console.log(value)
  return await connection.query(
    `
      SELECT id, name, img FROM users WHERE name like $1 LIMIT 6
    ` , [`${value}%`]
  )
}

export const searchBarRepository = {
  searchUsers
}