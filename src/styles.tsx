import styled from 'styled-components';
import { Input as AntInput, Typography } from 'antd';

export const Button: any = styled.button`
background: ${(props: any) => props.primary ? '#1ABD9C' : 'white'};
  color: ${(props: any) => props.primary ? 'white' : '#1ABD9C'};
  border-color: #1ABD9C;
  border-radius: 8px;
  // box-shadow: 2px 1px 0 0 #ccc;
  padding: ${(props: any) => props.large ? '0.3rem 2rem' : '0.1rem 1rem'};
  margin: 0 1rem;
  font-size: ${(props: any) => props.large ? '1.6em' : '1.5em'};
  outline: none;
  cursor: pointer;
`;

export const StyledText: any = styled(Typography)`
  font-weight: ${(props: any) => props.bold ? '600' : '400'};
  font-size: ${(props: any) => props.large ? ' 2em' : '1.5em'};
  color: ${(props: any) => props.color ? 'black' : 'white'};
  text-align: center;
  margin: 0;
  padding: 0;
`;

export const TimerText: any = styled(Typography)`
  font-weight: ${(props: any) => props.bold ? '600' : '400'};
  font-size: 5em;
  color: white;
  text-align: center;
  margin: 0;
  padding: 0;
`;

export const Input: any = styled(AntInput)`
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 25px;
`;
