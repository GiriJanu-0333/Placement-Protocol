
const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">

        <div className="row">

          {/* About */}
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">
              Placement Portal
            </h5>

            <p className="text-secondary mb-0">
              A campus placement management system that helps
              students find job opportunities and manage their
              placement applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">
              Quick Links
            </h6>

            <ul className="list-unstyled">
              <li>
                <a
                  href="/"
                  className="text-secondary text-decoration-none"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/login"
                  className="text-secondary text-decoration-none"
                >
                  Login
                </a>
              </li>

              <li>
                <a
                  href="/register"
                  className="text-secondary text-decoration-none"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">
              Contact
            </h6>

            <p className="text-secondary mb-1">
              <i className="bx bx-envelope me-2"></i>
              placement@college.com
            </p>

            <p className="text-secondary mb-0">
              <i className="bx bx-phone me-2"></i>
              +91 XXXXX XXXXX
            </p>
          </div>

        </div>

        <hr className="border-secondary" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-secondary mb-0">
            © 2026 Placement Portal. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

