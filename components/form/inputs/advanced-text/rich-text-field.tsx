import { useFieldContext, useFormContext } from '@/hooks/form-context';
import { FieldError } from '@/components/form/inputs/error';
import { LabelArea } from '@/components/form/inputs/label';
import { FieldWrapper } from '@/components/form/inputs/wrapper';
import { ThemeProvider } from '@/components/tiptap/theme-context';
import RichTextEditor from '@/components/tiptap/editor';

type TextEditorFieldProps = {
  label?: string;
  placeholder?: string;
  className?: string;
};

const TextEditorField = ({
  label,
  placeholder,
  className,
}: TextEditorFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <ThemeProvider>
      <FieldWrapper>
        {label && <LabelArea label={label} />}

        <RichTextEditor
          onChange={(value) => {
            field.setValue(value as string);
          }}
          // placeholder={placeholder ?? 'Write here...'}
          content={field.state.value}
        />

        <FieldError />
      </FieldWrapper>
    </ThemeProvider>
  );
};

export default TextEditorField;
