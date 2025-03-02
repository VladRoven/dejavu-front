import { FilterType } from '../utils/constants';
import FormWrapper from './FormWrapper';
import InputDate from './InputDate';
import InputTextField from './InputTextField';
import RadioGroupWrapper from './RadioGroupWrapper';
import { ExpandMore } from '@mui/icons-material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { lowerCase, map, reduce, startCase, includes, filter, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const Filters = (props) => {
  const { filters, resetHandler, submitHandler } = props;
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      ...reduce(
        filters,
        (acc, filter) => {
          if (filter.name) {
            acc[filter.name] = filter.defaultValue;
          } else {
            map(filter.fields, (field) => {
              if (field.name) {
                acc[field.name] = field.value ?? '';
              }
            });
          }

          return acc;
        },
        {}
      ),
    },
  });

  const renderRadio = useCallback(
    (field, idx) => (
      <FormControlLabel
        key={idx}
        value={field.value}
        control={<Radio color="secondary" />}
        label={startCase(lowerCase(field.label))}
      />
    ),
    []
  );

  const renderCheckbox = useCallback(
    (field, idx) => (
      <Controller
        key={idx}
        name={field.mainname}
        control={methods.control}
        render={({ field: _field }) => (
          <FormControl>
            <FormControlLabel
              label={startCase(lowerCase(field.label))}
              control={
                <Checkbox
                  {...field}
                  color="secondary"
                  checked={includes(methods.getValues(field.mainname), field.name)}
                  onChange={(e) => {
                    const state = e.target.checked;
                    const values = methods.getValues(field.mainname);

                    if (!state && values.length === 1) {
                      return;
                    }

                    _field.onChange(
                      state
                        ? [...values, field.name]
                        : filter(values, (value) => !isEqual(value, field.name))
                    );
                  }}
                />
              }
            />
          </FormControl>
        )}
      />
    ),
    []
  );

  const renderInput = useCallback(
    (field, idx) => (
      <InputTextField
        key={idx}
        name={field.name}
        label={startCase(lowerCase(field.label))}
        inputProps={{ pattern: field.type === 'number' ? '^[0-9]+$' : '' }}
      />
    ),
    []
  );

  const renderDatePicker = useCallback(
    (field, idx) => <InputDate name={field.name} label={field.label} type={field.type} key={idx} />,
    []
  );

  return (
    <Box>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<TuneOutlinedIcon color="secondary" />}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Filters
      </Button>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Box className="w-svw lg:w-96 py-10 px-12 overflow-x-hidden">
          <Box className="flex justify-between items-center">
            <Typography className="!text-base">Filters</Typography>
            <Box className="flex items-center gap-2">
              <Link
                className="cursor-pointer"
                onClick={() => {
                  methods.reset();
                  resetHandler();
                }}
              >
                Reset
              </Link>
              <IconButton
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <CloseOutlinedIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
          <FormWrapper
            methods={methods}
            className="flex flex-col"
            formProps={{
              onSubmit: methods.handleSubmit(submitHandler),
            }}
          >
            {map(filters, (_filter, idx) => {
              switch (_filter.type) {
                case FilterType.Radio:
                  return (
                    <Accordion defaultExpanded key={idx}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        {_filter.title}
                      </AccordionSummary>
                      <AccordionDetails>
                        <RadioGroupWrapper
                          name={_filter.name}
                          defaultValue={methods.getValues(_filter.name)}
                        >
                          {map(_filter.fields, (field, idx) =>
                            renderRadio(
                              {
                                label: field.label,
                                value: field.value,
                              },
                              idx
                            )
                          )}
                        </RadioGroupWrapper>
                      </AccordionDetails>
                    </Accordion>
                  );
                case FilterType.Checkbox:
                  return (
                    <Accordion defaultExpanded key={idx}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        {_filter.title}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box className="flex flex-col">
                          {map(_filter.fields, (field, idx) =>
                            renderCheckbox(
                              {
                                name: field.name,
                                label: field.label,
                                mainname: _filter.name,
                              },
                              idx
                            )
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                case FilterType.Input:
                  return (
                    <Accordion defaultExpanded key={idx}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        {_filter.title}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box className="flex flex-col gap-4">
                          {map(_filter.fields, (field, idx) =>
                            renderInput(
                              {
                                name: field.name,
                                label: field.label,
                                type: field.type,
                              },
                              idx
                            )
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                case FilterType.Date:
                  return (
                    <Accordion defaultExpanded key={idx}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        {_filter.title}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box className="flex flex-col gap-4">
                          {map(_filter.fields, (field, idx) =>
                            renderDatePicker(
                              {
                                name: field.name,
                                label: field.label,
                                type: field.type,
                              },
                              idx
                            )
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
              }
            })}
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              className="!mt-8"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Apply
            </Button>
          </FormWrapper>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Filters;
