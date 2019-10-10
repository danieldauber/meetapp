import User from '../models/User';

class UserExistsService {
  async run({ email }) {
    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error('E-mail em uso');
    }
  }
}

export default new UserExistsService();
