const Clients = require('../model/Clients');
const PasswordClient = require('../model/Password_clients');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouver le client par email
    const client = await Clients.findOne({ where: { email: email } });
    if (!client) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Trouver le mot de passe du client
    const passwordClient = await PasswordClient.findOne({ where: { id_client: client.id } });
    if (!passwordClient) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, passwordClient.mdp);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    var token = jwt.sign({ id: client.id }, config.secret, {
        expiresIn: 86400
    });
    // Authentification réussie
    res.status(200).send({ auth: true, token: token });
    //res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
