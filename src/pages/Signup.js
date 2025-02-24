import '../assets/style.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('❌ Password must be at least 6 characters long and contain at least one number.');
      return;
    }

    setError('');

    try {
      await axios.post('http://localhost:3001/api/users', {
        username,
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        password,
      });

      setShowModal(true);
    } catch (err) {
      setError('❌ Signup failed. Try a different username.');
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center ">
      <div className="signup-box p-5 text-center">
        <img src="/img/dejavu.png" alt="Déjà Vu Logo" className="logo-img mb-3" />

        <h2 className="mb-4">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={emailAddress}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${error ? 'border-danger' : ''}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <small className="text-danger mt-2 d-block">{error}</small>}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">🎉 Signup Successful!</h5>
              </div>
              <div className="modal-body">
                <p>Your account has been created successfully. Click below to log in.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => navigate('/login')}>
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
