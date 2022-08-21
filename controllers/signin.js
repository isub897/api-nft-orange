const handleSignin = async (req, res, postgres, bcrypt, findUser, session) => {
    const {email, password} = req.body;
    const foundUser = await findUser(email);
    if (!foundUser) return res.status(200).json(false);
    const hash = await postgres('login').where({email: email}).select('hash');
    const result = bcrypt.compareSync(password, hash[0].hash);
    if (!result) return res.status(200).json(result)
    const user = await postgres('users').where('email', email);
    req.session.authenticated = true;
    req.session.user = email;
    return res.status(200).json(user[0]);
}

export default handleSignin;