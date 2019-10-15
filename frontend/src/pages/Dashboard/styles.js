import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
    margin-top: 50px;
  }
`;
export const Meetup = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  cursor: pointer;
  background: ${props =>
    props.past ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.1);'};

  strong {
    font-weight: bold;
    font-size: 16px;
    color: ${props => (props.past ? 'rgba(255, 255, 255, 0.1)' : '#fff')};
  }

  span {
    font-size: 14px;
    color: ${props =>
      props.past ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'};
    margin-right: 50px;
    text-align: center;
  }
`;

export const Button = styled.button`
  margin: 5px 0 0;
  height: 42px;
  padding: 10px 7px;
  width: 172px;
  background: #f94d6a;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, '#f94d6a')};
  }
`;
