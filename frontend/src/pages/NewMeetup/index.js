import React from 'react';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import BannerInput from './BannerInput';

import { Container } from './styles';

export default function NewMeetup() {
  return (
    <Container>
      <Form>
        <BannerInput name="file_id" />
        <Input type="text" name="title" />
        <Textarea name="description" />
        <Input type="text" name="date" />
        <Input type="text" name="localization" />
        <div>
          <button type="submit">Salvar MeetUp</button>
        </div>
      </Form>
    </Container>
  );
}
