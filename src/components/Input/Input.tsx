import './Input.css';
import classNames from 'classnames';

type DefaultInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & DefaultInputProps;

const Input: React.FC<InputProps> = (props) => {
  const { className, onChange, ...rest } = props;

  const classes = classNames('input', className);

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <div className={classes}>
      <input {...rest} className={className} onChange={onChangeHandle} />
    </div>
  );
};

export default Input;
