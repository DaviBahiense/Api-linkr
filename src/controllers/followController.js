import { followRepository } from "../repositories/followRepository.js";

export async function handleFollow(req, res) {
    const { id, type } = req.params;
    const { user } = res.locals;
    try {
        if(user.id === id) {
            return res.sendStatus(404);
        }

        const followExistence = await followRepository.checkFollowExistence(user.id, id);

        if (type === "follow" && followExistence.rowCount === 0) {
            await followRepository.follow(user.id, id);
        } else if (type === "unfollow" && followExistence.rowCount > 0) {
            await followRepository.unfollow(user.id, id);
        } else {
            return res.sendStatus(422);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getFollow(req, res){
    const {id} = req.params;
    const { user } = res.locals;
    try {
        if(user.id === id) {
            return res.sendStatus(404);
        }

        const result = await followRepository.checkFollowExistence(user.id, id);
        res.status(200).send(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
