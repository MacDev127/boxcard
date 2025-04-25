import React, { ReactNode } from 'react';
import './Title.css';

interface TitleProps {
  children: ReactNode;
  className?: string;
}
const Title = ({ className, children }: TitleProps) => {
  return <h2 className={className}>{children}</h2>;
};

export default Title;
