class OrganizerService {
  async run({ organizerId, userId }) {
    if (organizerId !== userId) {
      throw new Error('Só pode editar eventos em que você é o organizador');
    }
  }
}

export default new OrganizerService();
