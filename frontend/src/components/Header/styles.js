import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #000;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 5px 0 0;
    height: 42px;
    width: 71px;
    background: #f94d6a;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#f94d6a')};
    }
  }

  div {
    text-align: right;
    margin-right: 35px;

    strong {
      display: block;
      color: #fff;
      margin-top: 5px;
    }

    a {
      color: #999;
      margin-top: 8px;
      font-size: 12px;
      display: block;
    }
  }
`;
