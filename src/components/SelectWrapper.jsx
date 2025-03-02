import { FormControl, InputLabel, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const SelectWrapper = (props) => {
  const { children, label, name, required = false, ...selectProps } = props;
  const methods = useFormContext();

  return (
    <Controller
      rules={{ required }}
      name={name}
      control={methods.control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <InputLabel id="select-label">{label}</InputLabel>
          <Select
            {...selectProps}
            {...field}
            labelId="select-label"
            label={label}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            error={!!fieldState.error}
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectWrapper;
