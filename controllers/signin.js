const handleSignin = async (req, res, postgres, bcrypt, findUser) => {
    const {email, password} = req.body;
    const foundUser = await findUser(email);
    if (!foundUser) return res.status(200).json(false);
    const hash = await postgres('login').where({email: email}).select('hash');
    const result = bcrypt.compareSync(password, hash[0].hash);
    return res.status(200).json(result)
}

export default handleSignin;