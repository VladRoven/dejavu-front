import { RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const RadioGroupWrapper = (props) => {
  const { name, children, className } = props;

  const methods = useFormContext();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => (
        <RadioGroup className={className} {...field}>
          {children}
        </RadioGroup>
      )}
    />
  );
};

export default RadioGroupWrapper;
