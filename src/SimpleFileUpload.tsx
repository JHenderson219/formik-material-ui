import * as React from 'react';
import { FieldProps, getIn } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import Input, { InputProps } from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

export interface SimpleFileUploadProps extends FieldProps {
  label: string;
  disabled?: boolean;
  inputProps: InputProps;
  inputLabelProps: InputLabelProps;
}

export const SimpleFileUpload = ({
  label,
  field,
  form: { touched, errors, isSubmitting, setFieldValue },
  disabled = false,
  inputProps,
  inputLabelProps,
}: SimpleFileUploadProps) => {
  const error = getIn(touched, field.name) && getIn(errors, field.name);

  return (
    <div>
      <FormControl>
        {label && (
          <InputLabel shrink error={!!error} {...inputLabelProps}>
            {label}
          </InputLabel>
        )}
        <Input
          error={!!error}
          inputProps={{
            type: 'file',
            disabled: disabled || isSubmitting,
            name: field.name,
            onChange: (event: any) => {
              const file = event.currentTarget.files[0];
              setFieldValue(field.name, file);
            },
          }}
          {...inputProps}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};
