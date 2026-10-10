
const SkillList = ({ skills = [], onEdit, onDelete }) => {
  if (skills.length === 0) {
    return (
      <div className="alert alert-info">
        No skills found.
      </div>
    );
  }

  return (
    <div className="row g-3">
      {skills.map((skill) => (
        <div className="col-md-4 col-lg-3" key={skill.id}>
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold">
                {skill.name}
              </h5>

              <div className="mt-auto d-flex gap-2">
                {onEdit && (
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => onEdit(skill)}
                  >
                    Edit
                  </button>
                )}

                {onDelete && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(skill.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillList;

