import { userRepository } from "../repositories/userRepository.js";


export async function getUser(req, res) {
    const { user } = res.locals;

    try {
      res.send(user);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
}

export async function getUserId(req, res) {
  const {id} = req.params;
  try {
    const user = (await userRepository.usersId(id)).rows

    if(user.length === 0){
      return res.sendStatus(404);
    }

    delete user[0].email;
    delete user[0].password;
    res.status(200).send(user[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500)
  }
}