import { followRepository } from "../repositories/followRepository.js";

export async function checkUserExistence (req, res, next) {
    const {id} = req.params;
    try {
        const userExistence = await followRepository.checkUserExistence(id)
        if (userExistence.rowCount === 0) {
            return res.sendStatus(422);
        }

        next();
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}