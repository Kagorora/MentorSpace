import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import userModal from '../model/users';
import userValidation from '../helper/userValidation';

dotenv.config();
class userController {
  static signUp(req, res) {
    const {
      firstName, lastName, email, password, address, bio, occupation, expertise, userType,
    } = req.body;
    const checkEmail = userModal.find(u => u.email === email);
    if (checkEmail) {
      return res.status(401).json({
        status: 401,
        error: 'email exist',
      });
    }
    const idNo = userModal.length + 1;
    const jToken = jwt.sign({ id: idNo, email, userType }, 'maxime@123');
    const hashedPsw = bcrypt.hashSync(password);
    const newUser = userValidation.validate({
    // eslint-disable-next-line max-len
      token: jToken, id: idNo, firstName, lastName, email, password: hashedPsw, address, bio, occupation, expertise, userType,
    });
    if (!newUser.error) {
      userModal.push(newUser.value);
      return res.status(201).json({
        status: 201,
        data: userModal,
      });
    }
    const validationError = newUser.error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: validationError,
    });
  }
}

export default userController;
