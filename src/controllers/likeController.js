import { likeRepository } from "../repositories/likeRepository.js";

export async function handleLike(req, res) {
    const { id, type } = req.params;
    const { user } = res.locals;
    try {

        const likeExistence = await likeRepository.checkLikeExistence(user.id, id);

        if (type === "like" && likeExistence.rowCount === 0) {
            await likeRepository.like(user.id, id);
        } else if (type === "unlike" && likeExistence.rowCount > 0) {
            await likeRepository.unlike(user.id, id);
        } else {
            return res.sendStatus(422);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getLikes(req, res){
    const {id} = req.params;
    try {

        const result = await likeRepository.getLikes(id);
        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
