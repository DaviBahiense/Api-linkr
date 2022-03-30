import { commentRepository } from "../repositories/commentRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export async function createComment(req, res) {
  const body = req.body;
  try {
    await commentRepository.create(body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getComments(req, res) {
  const { postId } = req.params;

  try {
    const { rows: data } = await commentRepository.get(postId);

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
