import * as Yup from 'yup';
import User from '../../models/user/User';
import File from '../../models/files/File';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['path', 'url'],
      },
    });

    res.json(users);
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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      const e = [];
      await schema.validate(req.body).catch(err => {
        e.push({ ...err });
      });
      return res.status(400).json(e);
    }

    const { email, oldPassword } = req.body;
    const { userId } = req.params;

    const userUpdate = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!userUpdate) {
      return res.status(401).json({ error: 'user does not exists' });
    }

    if (email !== userUpdate.email) {
      const userExists = await User.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status('401').json({ error: 'Email already in use' });
      }
    }

    if (oldPassword && !(await userUpdate.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'old password does not match' });
    }

    const { id, name } = await userUpdate.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
