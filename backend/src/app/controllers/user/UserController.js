import * as Yup from 'yup';
import User from '../../models/user/User';

class UserController {
  async index(req, res) {
    res.json({ hello: 'world' });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      const e = [];
      await schema.validate(req.body).catch(err => {
        e.push({ ...err });
      });
      return res.status(400).json(e);
    }

    const { email } = req.body;

    const result = await User.findOrCreate({
      where: {
        email,
      },
      defaults: req.body,
    }).spread((user, created) => {
      if (created) {
        const { id, name } = user;
        return { id, name, email };
      }
      return { error: 'User already exists' };
    });

    return res.json(result);
  }
}

export default new UserController();
