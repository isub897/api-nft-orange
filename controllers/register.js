const handleRegister = async (req, res, postgres, bcrypt, findUser) => {
    const {username, email, password} = req.body;
    const foundUser = await findUser(email);

    if (foundUser) return res.status(200).json("taken")
        
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
        await postgres.transaction(async (trx) => {
            try {
                const date = new Date();

                const insertLogin = await postgres('login').transacting(trx).insert({
                email: email,
                hash: hash
                });
                const insertUsers = await postgres('users').transacting(trx).insert({
                username: username,
                email: email,
                joined: date,
                logins: 0
                }); 
                const trxResult = await trx.commit;
                return res.status(200).json({
                    username: username,
                    email: email,
                    joined: date,
                    logins: 0
                });
            } catch(err) {
                const trxFail = await trx.rollback;
                return res.status(200).json(trxFail) 
            }
        })
    } catch(err) {
        return console.error(false);
    }
}

export default handleRegister;