const handleSession = async (req, res, postgres, session) => {

    if (!req.session.authenticated) return res.status(200).json(false);
    try {
      const response = await postgres('users').where('email', req.session.user);
      res.status(200).json(response[0]);
    } catch(err) {
      res.status(200).json(false);
    }
  
}

export default handleSession;