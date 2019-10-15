import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Meetup, Button } from './styles';
import Detail from './Detail';
import api from '~/services/api';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups/organizer');

      const data = response.data.map(meetup => {
        meetup.dateFormatted = format(
          parseISO(meetup.date),
          "d 'de' MMMM, 'às' H'h'",
          { locale: pt }
        );

        return meetup;
      });

      setMeetups(data);
    }
    loadMeetups();
  }, []);

  function handleDetail(meetup) {
    setDetail(meetup);
    setVisible(true);
  }

  return (
    <Container>
      {visible ? (
        <Detail detail={detail} visible={visible} />
      ) : (
        <>
          <header>
            <h1>Meus MeetUps</h1>
            <Link to="meetup/new">
              <Button type="button">Novo MeetUp</Button>
            </Link>
          </header>

          <ul>
            {meetups.map(meetup => (
              <Meetup
                key={meetup.id}
                past={meetup.past}
                onClick={() => handleDetail(meetup)}
              >
                <strong>{meetup.title}</strong>
                <span>{meetup.dateFormatted}</span>
              </Meetup>
            ))}
          </ul>
        </>
      )}

      {/* <header>
        <h1>Meus MeetUps</h1>
        <Link to="meetup/new">
          <button type="button">Novo MeetUp</button>
        </Link>
      </header>
      <ul>
        {meetups.map(meetup => (
          <Meetup
            key={meetup.id}
            past={meetup.past}
            onClick={() => handleDetail(meetup)}
          >
            <strong>{meetup.title}</strong>
            <span>{meetup.dateFormatted}</span>
          </Meetup>
        ))}
      </ul> */}
    </Container>
  );
}
