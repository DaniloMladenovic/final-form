import React, { useState } from 'react';
import classNames from 'classnames';
import './Checkbox.scss';

type DefaultInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type CheckboxProps = {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (event: boolean) => void;
} & Omit<DefaultInputProps, 'onChange'>;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, checked = false, onChange, ...rest } = props;

  const [isChecked, setIsChecked] = useState(checked);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange?.(event.target.checked); // Prosledjeni callback
  };

  const classes = classNames('checkbox');

  const labelText = typeof label === 'string' ? <span>{label}</span> : label;

  return (
    <label className={classes}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChangeHandler}
        className={isChecked ? 'checked' : ''}
        {...rest}
      />
      {labelText}
    </label>
  );
};

export default Checkbox;
