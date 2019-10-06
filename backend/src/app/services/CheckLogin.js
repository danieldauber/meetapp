class CheckLogin {
  async run({ user, password }) {
    if (!user) {
      throw new Error('Login error');
    }

    if (!(await user.checkPassword(password))) {
      throw new Error('Login error');
    }
  }
}

export default new CheckLogin();
