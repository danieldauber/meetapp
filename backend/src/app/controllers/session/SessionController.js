import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../../models/user/User';
import authConfig from '../../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('O email não é valido')
        .required('O email é requerido'),
      password: Yup.string().required('A senha é requerida'),
    });

    if (!(await schema.isValid(req.body))) {
      const e = [];
      await schema.validate(req.body).catch(err => {
        e.push({ error: err.message });
      });
      return res.status(400).json(e);
    }
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Login error' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
