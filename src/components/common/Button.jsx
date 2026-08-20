import "./Button.css";

/**
 * variant: "primary" | "secondary" | "ghost"
 * Renders a <button> by default, or an <a>-like element if `as="link"`.
 */
export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${fullWidth ? "btn--full" : ""}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
