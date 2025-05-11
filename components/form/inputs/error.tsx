import { useFieldContext, useFormContext } from '@/hooks/form-context';
import { useStore } from '@tanstack/react-form';
import { CircleAlertIcon } from 'lucide-react';

export const FieldError = () => {
  const field = useFieldContext<any>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  return (
    <div>
      {errors.map((err) => (
        <span
          key={err}
          className="flex items-center gap-2 text-red-500/70 text-sm"
        >
          <CircleAlertIcon size={16} /> {err}
        </span>
      ))}
    </div>
  );
};
