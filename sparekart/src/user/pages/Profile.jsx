import ProfileNavbar from "../../components/ProfileNavbar";
import Footer from "../../components/Footer";
import "../css/Profile.css";
import { useState, useRef } from "react";
import userImg from "../../images/user.png";

function Profile() {
  const [edit, setEdit] = useState(false);
  const fileRef = useRef(null);

  // Default user — resets on refresh (fully static)
  const defaultUser = {
    name: "Yuvraj dhadhal",
    email: "yuvraj@example.com",
    phone: "+91 9876543210",
    address: "rk university,rajkot,gujarat,360020",
    image: userImg,
  };

  const [user, setUser] = useState(defaultUser);
  const [form, setForm] = useState({ ...defaultUser }); // separate edit copy
  const [errors, setErrors] = useState({});

  // Validate edit form
  const validate = () => {
    let e = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!form.phone.trim())   e.phone   = "Phone number is required";
    if (!form.address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEdit = () => {
    setForm({ ...user }); // copy current user into form
    setErrors({});
    setEdit(true);
  };

  const handleSave = () => {
    if (!validate()) return;
    setUser({ ...form });  // save form back to user
    setEdit(false);
  };

  const handleCancel = () => {
    setForm({ ...user });
    setErrors({});
    setEdit(false);
  };

  // Profile photo change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, image: url }));
    }
  };

  return (
    <>
      <ProfileNavbar />

      <div className="profile-page">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-grid">

          {/* ── LEFT PANEL ── */}
          <div className="profile-left">
            <div className="profile-card">

              {/* Avatar */}
              <div className="avatar-wrap">
                <img
                  src={edit ? form.image : user.image}
                  alt="profile"
                  className="profile-img"
                />
                {edit && (
                  <>
                    <button
                      className="change-photo-btn"
                      onClick={() => fileRef.current.click()}
                    >
                      Change Photo
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileRef}
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </>
                )}
              </div>

              <h3 className="profile-name">{user.name}</h3>
              <p className="profile-email">{user.email}</p>
              <span className="active-tag">● Active Member</span>

              <div className="profile-phone">
                <span className="profile-phone-icon">📞</span>
                {user.phone}
              </div>

            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="info-card">

            <div className="info-header">
              <h3 className="info-title">Personal Information</h3>
              {!edit && (
                <button className="edit-btn" onClick={handleEdit}>
                  ✏ Edit Profile
                </button>
              )}
            </div>

            {/* ── VIEW MODE ── */}
            {!edit ? (
              <div className="view-fields">

                <div className="view-field">
                  <label className="field-label">
                    <span className="field-icon">👤</span> Full Name
                  </label>
                  <div className="field-box">{user.name}</div>
                </div>

                <div className="view-field">
                  <label className="field-label">
                    <span className="field-icon">✉</span> Email Address
                  </label>
                  <div className="field-box">{user.email}</div>
                </div>

                <div className="view-field">
                  <label className="field-label">
                    <span className="field-icon">📞</span> Phone Number
                  </label>
                  <div className="field-box">{user.phone}</div>
                </div>

                <div className="view-field">
                  <label className="field-label">
                    <span className="field-icon">📍</span> Address
                  </label>
                  <div className="field-box">{user.address}</div>
                </div>

              </div>
            ) : (

              /* ── EDIT MODE ── */
              <div className="edit-fields">

              

                <div className="edit-field">
                  <label className="field-label">Full Name</label>
                  <div className={`input-wrap ${errors.name ? "wrap-error" : ""}`}>
                    <span className="input-icon">👤</span>
                    <input
                      className="edit-input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full Name"
                    />
                  </div>
                  {errors.name && <p className="field-error">{errors.name}</p>}
                </div>

                <div className="edit-field">
                  <label className="field-label">Email Address</label>
                  <div className="input-wrap input-disabled">
                    <span className="input-icon">✉</span>
                    <input
                      className="edit-input"
                      value={form.email}
                      disabled
                    />
                  </div>
                  <p className="field-hint">Email cannot be changed</p>
                </div>

                <div className="edit-field">
                  <label className="field-label">Phone Number</label>
                  <div className={`input-wrap ${errors.phone ? "wrap-error" : ""}`}>
                    <span className="input-icon">📞</span>
                    <input
                      className="edit-input"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone Number"
                    />
                  </div>
                  {errors.phone && <p className="field-error">{errors.phone}</p>}
                </div>

                <div className="edit-field">
                  <label className="field-label">Address</label>
                  <div className={`input-wrap ${errors.address ? "wrap-error" : ""}`}>
                    <span className="input-icon">📍</span>
                    <input
                      className="edit-input"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Address"
                    />
                  </div>
                  {errors.address && <p className="field-error">{errors.address}</p>}
                </div>

                <div className="edit-btn-row">
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                  <button className="save-btn" onClick={handleSave}>Save Changes</button>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;