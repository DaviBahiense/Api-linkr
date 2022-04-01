import { repostRepository } from "../repositories/repostRepository.js";

export async function handleRepost(req, res) {
    const { id, type } = req.params;
    const { user } = res.locals;
    try {
        const repostExistence = await repostRepository.checkRepostExistence(user.id, id);

        if (type === "repost" && repostExistence.rowCount === 0) {
            const repost = await repostRepository.repost(user.id, id);
        } else if (type === "unrepost" && repostExistence.rowCount > 0) {
            const unrepost = await repostRepository.unrepost(user.id, id);
        } else {
            return res.sendStatus(422);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getReposts(req, res){
    const {id} = req.params;
    try {
        const result = await repostRepository.getReposts(id);
        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}