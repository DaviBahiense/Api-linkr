import { commentRepository } from "../repositories/commentRepository.js";

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
