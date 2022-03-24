import { Link } from 'react-router-dom';
import { FlexBox } from 'react-styled-flex';

export const Home = () => {
  return (
    <FlexBox column gap={'0.25rem'}>
      <Link to={'/react'}>Plain react</Link>
      <Link to={'/javascript'}>Plain JS</Link>
      <Link to={'/react-lazy'}>
        React + lazy video rendering using Intersection Observer
      </Link>
      <Link to={'/javascript-idle'}>
        JS + requestIdleCallback + Intersection Observer
      </Link>
    </FlexBox>
  );
};
