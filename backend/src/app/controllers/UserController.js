import User from '../models/User';
import File from '../models/File';
import UserExistsService from '../services/UserExistsService';
import UserUpdateService from '../services/UserUpdateService';

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

    await UserExistsService.run({ email });

    const { id, name } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, old_password } = req.body;
    const { userId } = req.params;

    await UserUpdateService.run({
      email,
      oldPassword: old_password,
      userId,
      body: req.body,
    });

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
