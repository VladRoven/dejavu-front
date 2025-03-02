import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const InputTextField = (props) => {
  const { required = false, name, multiline, ...fieldProps } = props;
  const methods = useFormContext();

  return (
    <Controller
      rules={{ required }}
      name={name}
      control={methods.control}
      render={({ field, fieldState }) => (
        <TextField
          {...fieldProps}
          {...field}
          label={
            required && fieldProps.label ? (
              <span className="space-x-1">
                <span>{fieldProps.label}</span>
                <span>*</span>
              </span>
            ) : (
              fieldProps.label
            )
          }
          color="secondary"
          multiline={multiline}
          variant={fieldProps.variant ?? 'outlined'}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ''}
        />
      )}
    />
  );
};

export default InputTextField;
