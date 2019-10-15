import React from 'react';

import { Container } from './styles';

export default function BannerInput() {
  function handleChange(e) {}

  return (
    <Container>
      <label htmlFor="banner">
        <img src="" alt="" />

        <input
          type="file"
          id="avatar"
          accept="imagem/*"
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}
