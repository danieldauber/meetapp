import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdModeEdit, MdDeleteForever, MdPlace } from 'react-icons/md';
import { IoMdCalendar } from 'react-icons/io';

import { Container, Meetup, Cancel, Edit } from './styles';

export default function MeetupDetail({ detail }) {
  const [meetups, setMeetups] = useState('');
  const [banner, setBanner] = useState('');

  useEffect(() => {
    setMeetups(detail);
    const { url } = detail.banner;
    setBanner(url);
  }, [detail]);

  return (
    <Container>
      <header>
        <h1>{meetups.title}</h1>
        {!meetups.past ? (
          <nav>
            <Link to="meetup/edit">
              <Edit type="button">
                <MdModeEdit size={16} color="#fff" />
                Editar
              </Edit>
            </Link>
            <Cancel type="button">
              <MdDeleteForever size={16} color="#fff" />
              Cancelar
            </Cancel>
          </nav>
        ) : (
          ''
        )}
      </header>
      <Meetup>
        <img src={banner} width="100%" alt={meetups.title} />
        <p>{meetups.description}</p>
        <div>
          <span>
            <IoMdCalendar size={16} />
            {meetups.dateFormatted}
          </span>
          <span>
            <MdPlace size={16} />
            {meetups.location}
          </span>
        </div>
      </Meetup>
    </Container>
  );
}

MeetupDetail.propTypes = {
  detail: PropTypes.shape({
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
