import bcrypt from "bcrypt";
import { urlsRepository } from "../repositories/urlsRepository.js";
import { v4 as uuid } from "uuid";

export async function singUp(req, res) {
  const { email, password, name, img } = req.body;

  try {
    const existingUsers = await urlsRepository.checkExist(email);
    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await urlsRepository.createUser(email, passwordHash, name, img);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const { rows: users } = await urlsRepository.checkExist(email);
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await urlsRepository.createToken(token, user.id);
    return res.send(token);
  }

  res.sendStatus(401);
}
