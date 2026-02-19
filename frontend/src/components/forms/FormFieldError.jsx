export default function FormFieldError({ error, helper }) {
  const message = error?.message;

  return (
    <p
      className={`text-sm transition-colors duration-200 ${
        message ? "text-red-500" : "text-gray-500"
      }`}>
      {message ?? helper}
    </p>
  );
}
