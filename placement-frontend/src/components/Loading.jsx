
const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <div
        className="spinner-border text-primary"
        role="status"
        aria-hidden="true"
      ></div>

      <p className="mt-3 mb-0 text-muted">
        {message}
      </p>
    </div>
  );
};

export default Loading;

