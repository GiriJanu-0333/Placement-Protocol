
const ConfirmDialog = ({
  show,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
      ></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">
                {title}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <p className="mb-0">
                {message}
              </p>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                {cancelText}
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDialog;

