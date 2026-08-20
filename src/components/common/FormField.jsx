import "./FormField.css";

/**
 * One component for every text/email/tel/textarea/select input in the app,
 * so labels, spacing, and error styling never have to be rebuilt per form.
 */
export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  error,
  as = "input",
  children, // used when as="select"
  rows = 3,
}) {
  const fieldId = `field-${name}`;

  return (
    <div className="form-field">
      <label htmlFor={fieldId}>
        {label}
        {required && <span className="form-field__required"> *</span>}
      </label>

      {as === "select" ? (
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={error ? "has-error" : ""}
        >
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={error ? "has-error" : ""}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={error ? "has-error" : ""}
        />
      )}

      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
