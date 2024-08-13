const Admin = require('../model/Admins');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ where: { email: email } });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.mdp);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      var token = jwt.sign({ id: admin.id }, config.secret, {
          expiresIn: 86400
      });
  
      res.status(200).send({ auth: true, token: token ,admin: {
        id: admin.id,
        email: admin.email,
      }});
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = { loginAdmin };
