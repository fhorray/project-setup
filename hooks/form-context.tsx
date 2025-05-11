import { createFormHookContexts } from '@tanstack/react-form';
import { createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

// Actions
import { SubmitButton } from '@/components/form/inputs/actions/submit';

const InputField = lazy(
  () => import('@/components/form/inputs/text/text-input'),
);
const EmailField = lazy(
  () => import('@/components/form/inputs/text/email-input'),
);
const PasswordField = lazy(
  () => import('@/components/form/inputs/text/password-input'),
);
const UrlField = lazy(() => import('@/components/form/inputs/text/url-input'));
const PhoneField = lazy(
  () => import('@/components/form/inputs/text/phone-input'),
);
const SearchField = lazy(
  () => import('@/components/form/inputs/text/search-input'),
);
const UsernameField = lazy(
  () => import('@/components/form/inputs/text/username-input'),
);

// ADVANCED TEXT
const TextAreaField = lazy(
  () => import('@/components/form/inputs/advanced-text/textarea-input'),
);
const RichTextField = lazy(
  () => import('@/components/form/inputs/advanced-text/rich-text-field'),
);

// NUMERIC INPUTS
const NumericField = lazy(
  () => import('@/components/form/inputs/numeric/number-input'),
);
const WeighthField = lazy(
  () => import('@/components/form/inputs/numeric/weight-input'),
);
const PercentageField = lazy(
  () => import('@/components/form/inputs/numeric/percentage-input'),
);
const CurrencyField = lazy(
  () => import('@/components/form/inputs/numeric/currency-input'),
);
const NumericSliderField = lazy(
  () => import('@/components/form/inputs/numeric/numeric-slider-input'),
);

// SELECTORS
const SelectField = lazy(
  () => import('@/components/form/inputs/selectors/select-field'),
);

// SWITCHERS
const SwitcherField = lazy(
  () => import('@/components/form/inputs/switcher-field'),
);

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    EmailField,
    PasswordField,
    UrlField,
    PhoneField,
    SearchField,
    UsernameField,

    TextAreaField,
    RichTextField,

    NumericField,
    WeighthField,
    CurrencyField,
    PercentageField,
    NumericSliderField,

    SelectField,

    SwitcherField,
  },
  formComponents: {
    SubmitButton,
  },
});
