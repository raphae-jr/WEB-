import { useEffect, useRef } from 'react';

export default function ReservationForm({ fields, values, errors, onChange }) {
  const inputRef = useRef(null);
  const firstError = Object.keys(errors)[0];

  // Fokus berpindah ke field pertama yang harus diperbaiki.
  useEffect(() => {
    if (firstError && inputRef.current) inputRef.current.focus();
  }, [firstError, errors]);

  return (
    <div className="form-grid">
      {fields.map((field) => {
        const common = {
          id: field.name,
          name: field.name,
          value: values[field.name] ?? '',
          required: field.required !== false,
          onChange: (event) => onChange(field.name, event.target.value),
          'aria-invalid': Boolean(errors[field.name]),
          'aria-describedby': errors[field.name] ? `${field.name}-error` : undefined,
          ref: firstError === field.name ? inputRef : undefined,
        };

        return (
          <div className={`form-field${field.wide ? ' form-field-wide' : ''}`} key={field.name}>
            <label htmlFor={field.name}>{field.label}{field.required !== false && <span aria-hidden="true"> *</span>}</label>
            {field.type === 'textarea' ? (
              <textarea {...common} rows={4} placeholder={field.placeholder || ''} />
            ) : field.type === 'select' ? (
              <select {...common}>
                <option value="">{field.placeholder || 'Pilih salah satu'}</option>
                {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            ) : (
              <input {...common} type={field.type || 'text'} min={field.min} max={field.max} placeholder={field.placeholder || ''} />
            )}
            {errors[field.name] && <p className="field-error" id={`${field.name}-error`}>{errors[field.name]}</p>}
          </div>
        );
      })}
    </div>
  );
}
