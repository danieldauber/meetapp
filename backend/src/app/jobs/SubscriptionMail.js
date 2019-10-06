import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    Mail.sendMail({
      to: meetup.user.email,
      subject: `[MeetUp] Nova inscrição no MeetUp ${meetup.title}`,
      template: 'subscription',
      context: {
        title: meetup.title,
        nameSubscription: user.name,
        emailSubscription: user.email,
        nameOrganizer: meetup.user.name,
      },
    });
  }
}

export default new SubscriptionMail();
