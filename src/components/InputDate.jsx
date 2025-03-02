import { useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

const InputDate = (props) => {
  const { name, label, type, ...fieldProps } = props;
  const theme = useTheme();
  const methods = useFormContext();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => (
        <DatePicker
          {...fieldProps}
          value={field.value ? dayjs(field.value) : null}
          label={label}
          format="DD/MM/YYYY"
          onChange={(e) => {
            if (e && e?.isValid()) {
              const date = (type === 'from' ? e.startOf('day') : e.endOf('day')).format(
                'YYYY-MM-DD HH:mm'
              );

              field.onChange(date);
            }
          }}
          slotProps={{
            textField: {
              InputProps: {
                style: {
                  fontFamily: theme.typography.body2.fontFamily,
                },
              },
            },
            openPickerIcon: {
              sx: {
                color: theme.palette.primary.main,
              },
            },
            calendarHeader: {
              sx: {
                color: theme.palette.primary.main,
                fontFamily: theme.typography.fontFamily,
              },
            },
            yearButton: {
              sx: {
                color: theme.palette.primary.main,
                fontFamily: theme.typography.body2.fontFamily,
              },
            },
            day: {
              sx: {
                color: theme.palette.primary.main,
                fontFamily: theme.typography.body2.fontFamily,
              },
            },
            leftArrowIcon: {
              sx: {
                color: theme.palette.primary.main,
              },
            },
            rightArrowIcon: {
              sx: {
                color: theme.palette.primary.main,
              },
            },
            switchViewIcon: {
              sx: {
                color: theme.palette.primary.main,
              },
            },
          }}
        />
      )}
    />
  );
};

export default InputDate;
