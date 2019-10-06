import { isBefore, parseISO } from 'date-fns';

class PastDateService {
  async run({ date }) {
    if (isBefore(parseISO(date), new Date())) {
      throw new Error('Não é possível criar eventos em datas passadas');
    }
  }
}

export default new PastDateService();
