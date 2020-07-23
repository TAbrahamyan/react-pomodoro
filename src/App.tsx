import React from 'react';
import styled from 'styled-components';

import './scss/components/_app.scss';

const Button: any = styled.button`
  background: ${(props: any) => props.primary ? "palevioletred" : "white"};
  color: ${(props: any) => props.primary ? "white" : "palevioletred"};
  border: 2px solid palevioletred;
  padding: 0.3rem 1.3rem;
  font-size: 1.5em;
  outline: none;
  cursor: pointer;
`;

const StyledSpan: any = styled.span`
  font-size: 1.5em;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

export const App: React.FC = () => {
  const [ counter, setCounter ] = React.useState<number>(0);

  return (
    <div className="app">
      <Button onClick={() => setCounter(counter + 1)}>+1</Button>
      <StyledSpan>{ counter }</StyledSpan>
      <Button onClick={() => setCounter(counter - 1)}>-1</Button>
    </div>
  );
}
