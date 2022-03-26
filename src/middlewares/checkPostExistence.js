import { likeRepository } from "../repositories/likeRepository.js";

export async function checkPostExistence (req, res, next) {
    const {id} = req.params;
    try {
        const postExistence = await likeRepository.checkPostExistence(id);
        if (postExistence.rowCount === 0) {
            return res.sendStatus(422);
        }

        next();
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}