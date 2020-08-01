import React from 'react';
import { Link } from 'react-router-dom';

import { StyledText } from '../styles';

export const Page404: React.FC = () => {
  const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <div style={style}>
      <StyledText>
        Not page found
      </StyledText>

      <Link to="/">
        <StyledText>
          Go to home
        </StyledText>
      </Link>
    </div>
  );
}
