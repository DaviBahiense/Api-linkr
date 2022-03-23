

export async function getUser(req, res) {
    const { user } = res.locals;

    try {
      res.send(user);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
}