import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const InputCheckBox = (props) => {
  const { required = false, name, label, onChange, ...formControlProps } = props;

  const methods = useFormContext();
  const error = methods.getFieldState(name).error;

  return (
    <Controller
      rules={{ required }}
      name={name}
      control={methods.control}
      render={({ field }) => (
        <FormControl error={!!error}>
          <FormControlLabel
            {...formControlProps}
            label={label}
            control={
              <Checkbox
                {...field}
                color="secondary"
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);

                  if (onChange) {
                    onChange(e, e.target.checked);
                  }
                }}
              />
            }
          />
          {error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default InputCheckBox;
