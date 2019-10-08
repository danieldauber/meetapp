import User from '../models/User';
import UserExistsService from './UserExistsService';

class UserUpdateService {
  async run({ email, oldPassword, userId, body }) {
    const userUpdate = await User.findByPk(userId);

    if (!userUpdate) {
      throw new Error('User does not exists');
    }

    if (email !== userUpdate.email) {
      await UserExistsService.run({ email });
    }

    if (oldPassword && !(await userUpdate.checkPassword(oldPassword))) {
      throw new Error('old password does not match');
    }

    await userUpdate.update(body);
  }
}

export default new UserUpdateService();
