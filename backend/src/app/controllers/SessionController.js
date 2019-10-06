import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';
import CheckLogin from '../services/CheckLogin';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    await CheckLogin.run({ user, password });

    const { id, name, avatar } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
