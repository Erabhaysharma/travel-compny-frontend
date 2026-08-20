import FormField from "../common/FormField";

export default function ContactFields({ values, errors, onChange }) {
  return (
    <>
      <FormField
        label="Full name"
        name="name"
        value={values.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Your full name"
        required
      />
      <FormField
        label="Address"
        name="address"
        value={values.address}
        onChange={onChange}
        error={errors.address}
        placeholder="City, State (optional)"
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
        placeholder="you@example.com"
        required
      />
      <FormField
        label="Phone number"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={onChange}
        error={errors.phone}
        placeholder="10-digit mobile number"
        required
      />
    </>
  );
}
