import { useState } from "react";

const EMPTY_CONTACT = { name: "", address: "", email: "", phone: "" };

/**
 * Both Book Seat and Notify Me collect the exact same contact fields.
 * This hook owns that shared state + validation so neither form re-writes it.
 */
export function useContactForm() {
  const [values, setValues] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(values.phone)) {
      next.phone = "Enter a valid phone number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = () => {
    setValues(EMPTY_CONTACT);
    setErrors({});
  };

  return { values, errors, handleChange, validate, reset };
}
