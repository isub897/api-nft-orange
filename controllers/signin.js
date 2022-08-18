const handleSignin = (req, res, users) => {
    const user = users.find((data) => {
        return data.email === req.body.email;
    })
    if (!user || user.password != req.body.password) {
        return res.status(400).json("incorrect credentials")
    }
    return res.status(200).json("success")
}

export default handleSignin;