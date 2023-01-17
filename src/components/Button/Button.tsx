import './Button.css';
import classNames from 'classnames';
import { useCallback } from 'react';

type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
} & DefaultButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    onClick,
    className,
    ...rest
  } = props;

  const classes = classNames(
    'my-button',
    `my-button--${variant}`,
    `my-button--${size}`,
    `my-button--${color}`,
    className
  );

  const onClickHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick?.(event);
    },
    [onClick]
  );

  return <button className={classes} onClick={onClickHandler} {...rest} />;
};

export default Button;
