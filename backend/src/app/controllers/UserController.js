import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

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
    const { email, oldPassword } = req.body;
    const { userId } = req.params;

    const userUpdate = await User.findByPk(userId);

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

    await userUpdate.update(req.body);

    const { id, name, avatar } = await User.findByPk(userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, avatar });
  }
}

export default new UserController();
