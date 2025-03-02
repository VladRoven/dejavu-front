import PageStore from '../stores/page.store';
import { PopupTypes } from '../utils/constants';
import convertToBase64 from '../utils/convertToBase64';
import getEndpoint from '../utils/getEndpoint';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import classNames from 'classnames';
import { every, isEmpty, isNull, map, isString } from 'lodash';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';

const InputImage = (props) => {
  const { inputId, name, className, maxSize = 2, required = false, multiple = true } = props;
  const { control, setValue, getValues } = useFormContext();

  const handleOnChange = useCallback(async (files) => {
    const isValidSize = every(files, (file) => {
      const fileSize = Number((file.size / 1024 / 1024).toFixed(2)); // Size of MB

      return fileSize <= Number(maxSize);
    });

    if (isValidSize) {
      return Promise.all(map(files, async (file) => convertToBase64(file)));
    }

    PageStore.setPopupMessage({
      type: PopupTypes.Warning,
      message: `Maximum file size must be less than or equal to ${maxSize} MB`,
    });

    return null;
  }, []);

  const onDrop = useCallback((files) => {
    if (!multiple && files.length > 1) {
      PageStore.setPopupMessage({
        type: PopupTypes.Warning,
        message: `Only 1 file is available for uploading.`,
      });

      return;
    }

    const prevFiles = getValues(name);

    handleOnChange(files).then((res) => {
      if (!isNull(res)) {
        setValue(name, multiple ? [...prevFiles, ...res] : res[0]);
      }
    });
  }, []);

  const renderPreviewImage = useCallback(
    (idx, image, onClick) => (
      <Box key={idx} className="relative h-full min-w-fit">
        <IconButton className="!absolute -top-3 -right-3 !bg-green" size="small" onClick={onClick}>
          <CloseIcon sx={{ color: 'primary.light' }} fontSize="inherit" />
        </IconButton>
        <img
          src={isString(image) ? image : getEndpoint(`product/image/${image?.id}`)}
          alt=""
          className="h-full"
        />
      </Box>
    ),
    []
  );

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Controller
      rules={{ required }}
      name={name}
      control={control}
      render={({ field }) => (
        <Box
          {...getRootProps()}
          className={classNames(
            'w-full h-56 flex border-soft-beige border border-dashed rounded p-4 transition bg-opacity-25 overflow-y-auto',
            {
              'bg-soft-beige': isDragActive,
            },
            className
          )}
        >
          <label htmlFor={inputId} className="flex gap-4 items-center w-full h-full">
            {isEmpty(field.value) ? (
              <Box className="flex flex-col justify-center items-center w-full">
                <Typography
                  variant="h5"
                  className={classNames('uppercase !font-bold !text-soft-beige', {
                    hidden: isDragActive,
                  })}
                >
                  Upload image
                </Typography>
                <Typography className="!text-soft-beige">
                  {isDragActive
                    ? 'Drop the files here to upload'
                    : 'Click to upload or drag images'}
                </Typography>
              </Box>
            ) : multiple ? (
              map(field.value, (image, idx) =>
                renderPreviewImage(idx, image, () => {
                  field.value.splice(idx, 1);
                  field.onChange(field.value);
                })
              )
            ) : (
              renderPreviewImage(1, field.value, () => {
                field.onChange('');
              })
            )}
          </label>
          <input
            id={inputId}
            accept="image/jpeg, image/jpg, image/png"
            type="file"
            multiple={multiple}
            className="hidden"
            onChange={async (e) => {
              const files = Array.from(e.target.files);
              const base64Images = await handleOnChange(files);

              if (!isNull(base64Images)) {
                field.onChange(multiple ? [...field.value, ...base64Images] : base64Images[0]);
              }
            }}
          />
        </Box>
      )}
    />
  );
};

export default InputImage;
