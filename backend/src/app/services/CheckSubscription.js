import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';

class CheckSubscription {
  async run({ userId, meetupId, date, organizerId }) {
    const checkSubscription = await Subscription.findOne({
      where: {
        user_id: userId,
        meetup_id: meetupId,
      },
    });

    if (checkSubscription) {
      throw new Error('Você já está inscrito nesse MeetUp');
    }

    if (organizerId === userId) {
      throw new Error('Você não pode se inscrever no seu próprio MeetUp');
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date,
          },
        },
      ],
    });

    if (checkDate) {
      throw new Error('Você já está cadastrado em um MeetUp nesse horário');
    }
  }
}

export default new CheckSubscription();
