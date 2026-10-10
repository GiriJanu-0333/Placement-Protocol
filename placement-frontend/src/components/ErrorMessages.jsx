
const ErrorMessage = ({ message = "Something went wrong." }) => {
  if (!message) return null;

  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bx bx-error-circle me-2 fs-5"></i>

      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;

