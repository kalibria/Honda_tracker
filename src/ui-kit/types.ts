import React from 'react';

export interface IButtonEL {
  text?: string;
  onClick?: () => void;
  size?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
