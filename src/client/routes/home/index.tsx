import * as React from 'react';
import { Button } from 'components/Button';
import { Wrapper } from 'components/Wrapper';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Wrapper>
      <Link to='/counter'>
        <Button primary>Check the Counter Example</Button>
      </Link>
    </Wrapper>
  );
};

export default Home;
