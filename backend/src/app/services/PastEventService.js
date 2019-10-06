class PastEventService {
  async run({ past }) {
    if (past) {
      throw new Error('Esse evento já ocorreu');
    }
  }
}

export default new PastEventService();
