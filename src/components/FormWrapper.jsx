import { FormProvider } from 'react-hook-form';

const FormWrapper = (props) => {
  const { methods, children, className, formProps = {} } = props;

  return (
    <FormProvider {...methods}>
      <form className={className} {...formProps}>
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
