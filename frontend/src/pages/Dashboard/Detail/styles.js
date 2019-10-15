import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 0px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    h1 {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
export const Cancel = styled.button`
  margin: 5px 0 0;
  height: 42px;
  padding: 10px 15px;
  background: #f94d6a;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: ${darken(0.03, '#f94d6a')};
  }
`;

export const Edit = styled.button`
  margin: 5px 0 0;
  height: 42px;
  padding: 10px 15px;
  background: #4dbaf9;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: ${darken(0.03, '#4dbaf9')};
  }
`;

export const Meetup = styled.div`
  img {
    border-radius: 5px;
    width: 100%;
    margin: 15px 0;
  }

  p {
    font-size: 15px;
    line-height: 1.8em;
    color: #fff;
    text-align: left;
    margin: 15px 0;
  }

  div {
    display: flex;
    align-items: flex-start;
    color: rgba(255, 255, 255, 0.6);
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 20px 0;

      svg {
        margin-right: 10px;
      }
    }
  }
`;
