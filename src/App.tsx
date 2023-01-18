import './App.scss';
import { Form, Field } from 'react-final-form';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import Checkbox from './components/Checkbox/Checkbox';
import createDecorator from 'final-form-focus';

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values: any) => {
  await sleep(300);
  window.alert(JSON.stringify(values));
};

const focusOnError = createDecorator();
const required = (value: any) => (value ? undefined : 'Required');
const mustBeNumber = (value: any) =>
  isNaN(value) ? 'Must be a number' : undefined;
const minValue = (min: any) => (value: any) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators =
  (...validators: any[]) =>
  (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const App = () => (
  <div>
    <Form
      subscription={{ submitting: true, pristine: true }}
      onSubmit={onSubmit}
      decorators={[focusOnError]}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className="form-container">
          <Field name="firstName" validate={required}>
            {({ input, meta }) => (
              <div className="field-container">
                <label>First Name</label>
                <Input
                  {...input}
                  onChange={input.onChange}
                  type="text"
                  placeholder="First Name"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="lastName" validate={required}>
            {({ input, meta }) => (
              <div className="field-container">
                <label>Last Name</label>
                <Input {...input} type="text" placeholder="Last Name" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="age"
            validate={composeValidators(required, mustBeNumber, minValue(18))}
          >
            {({ input, meta }) => (
              <div className="field-container">
                <label>Age</label>
                <Input {...input} type="text" placeholder="Age" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Checkbox checked />
          <Checkbox disabled label="disabled" />
          <div className="field-container">
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
              color="secondary"
            >
              Reset
            </Button>
          </div>
          <pre>{JSON.stringify(values)}</pre>
        </form>
      )}
    ></Form>
  </div>
);

export default App;
