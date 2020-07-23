import styled from 'styled-components';
import { Button as AntButton, Typography } from 'antd';

export const Button: any = styled(AntButton)`
  background: ${(props: any) => props.success ? '#7ab800' : 'white'};
  color: ${(props: any) => props.success ? 'white' : '#7ab800'};
  border: 2px solid #7ab800;
  border-radius: 8px;
  box-shadow: 2px 1px 0 0 #ccc;
  padding: ${(props: any) => props.large ? '1.3rem 1.2rem' : '1rem'};
  margin: 0;
  font-size: ${(props: any) => props.large ? '1.6em' : '1.5em'};
  outline: none;
  cursor: pointer;
`;

export const StyledText: any = styled(Typography)`
  font-size: ${(props: any) => props.large ? ' 2em' : '1.5em'};
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

export const TimerText: any = styled(Typography)`
  font-size: 5em;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: white;
`;
