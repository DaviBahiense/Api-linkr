import { connection } from "../database.js"

async function checkExist(email) {
  return connection.query(
  'SELECT * FROM users WHERE email=$1', [email])
}

async function createUser(email, passwordHash, name, img) {
  return connection.query(`
  INSERT INTO 
    users(email, password, name, img) 
  VALUES ($1, $2, $3, $4)
`, [email, passwordHash, name, img])
}

async function createToken(token, id) {
  return connection.query(`
    INSERT INTO 
      sessions (token, "userId") 
    VALUES ($1, $2)`, [token, id])
}

export const urlsRepository = {
  checkExist,
  createUser,
  createToken
}