import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { updateUserProfileAPI } from "../../service/allAPI";

function Profile() {
  const [open, setOpen] = useState(false);

  // State to store profile data
  const [profileData, setProfileData] = useState({
    github: "",
    linkedin: "",
    profileImage: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: files[0], // Set file as the profile image
      }));
    }
  };

  const handleUpdate = async () => {
    const { github, linkedin, profileImage } = profileData;

    if (!github || !linkedin) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("github", github);
      formData.append("linkedin", linkedin);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };

      const response = await updateUserProfileAPI(formData, headers);

      if (response.status === 200) {
        alert("Profile updated successfully!");

        // Update the state with the new profile data
        setProfileData((prevData) => ({
          ...prevData,
          profileImage: profileImage || prevData.profileImage,
          github,
          linkedin,
        }));
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile!");
    }
  };

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <div className="card shadow mt-5 p-3 me-2">
          <div className="d-flex justify-content-between">
            <h1>Profile</h1>
            <Button
              className="btn btn-outline-dark border border-3 border-dark bg-light text-info"
              onClick={() => setOpen(!open)}
            >
              <i className="fa-solid fa-hand-point-down fa-bounce"></i>
            </Button>
          </div>
          <Collapse in={open}>
            <div className="container mt-5 bg-info p-5">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="container w-50">
                  <img
                    className="img-fluid"
                    src={
                      profileData.profileImage
                        ? URL.createObjectURL(profileData.profileImage)
                        : "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
                    }
                    width={"100%"}
                    height={"200px"}
                    alt="profile"
                  />
                </div>
              </label>

              <div className="mt-5">
                <input
                  type="text"
                  name="github"
                  value={profileData.github}
                  onChange={handleInputChange}
                  placeholder="Github Link"
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn Link"
                  className="form-control"
                />
              </div>
              <div className="d-grid mt-5">
                <div className="btn btn-warning" onClick={handleUpdate}>
                  Update
                </div>
              </div>
            </div>
          </Collapse>
        </div>

        {/* Display updated profile details */}
        <div className="card shadow mt-5 p-3">
          <h2>Updated Profile</h2>
          <div className="text-center">
            <img
              className="img-fluid rounded-circle"
              src={
                profileData.profileImage
                  ? URL.createObjectURL(profileData.profileImage)
                  : "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
              }
              alt="profile"
              width="150"
            />
          </div>
          <div className="mt-3">
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.github}
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.linkedin}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
