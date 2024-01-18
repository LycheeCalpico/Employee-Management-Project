// UserProfileForm.js
import React, { useState } from "react";
import { createPersonalInformation } from "../../services/personalInformation-service";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { submitOnboarding } from "../../redux/onboardingSlice";
import { Document, Page, pdfjs } from "react-pdf";
import FilePreviewer from "../../components/FilePreviewer";
import Header from "../layout/Header";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const OnboardingPage = () => {
  const [files, setFiles] = useState([]);
  const { user } = useSelector((state) => state.user);
  //const { user } = dispatch(fetchUserByID());
  console.log("user:", user.id);
  const [formData, setFormData] = useState({
    user: user.id,
    name: { firstName: "", lastName: "", middleName: "", preferredName: "" },
    profilePicture: "", // You can use this to store the image URL or a base64-encoded string
    address: {
      aptNumber: "",
      streetName: "",
      city: "",
      state: "",
      zip: "",
    },
    phoneNumber: { cellPhoneNumber: "", workPhoneNumber: "" },
    email: "user@example.com", // Assuming email is pre-filled and cannot be edited
    ssn: "",
    dateOfBirth: "",
    gender: "",

    workAuthorization: {
      citizenship: "",
      citizenType: "",
      workAuthorizationType: "",
      files: null,
    },
    reference: {
      firstName: "",
      lastName: "",
      middleName: "",
      phone: "",
      email: "",
      relationship: "",
    },
    emergencyContact: [
      {
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        email: "",
        relationship: "",
      },
    ],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData2 = new FormData();

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWorkAuthorizationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      workAuthorization: {
        ...formData.workAuthorization,
        [name]: value,
      },
    });
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      name: {
        ...formData.name,
        [name]: value,
      },
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      phoneNumber: {
        ...formData.phoneNumber,
        [name]: value,
      },
    });
  };

  const addFile = (file) => {
    setFiles([...files, file]);
  };

  const handleReferenceChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      reference: {
        ...formData.reference,
        [name]: value,
      },
    });
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      emergencyContact: {
        ...formData.emergencyContact,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createInfo(e);
  };

  async function createInfo(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    //dispatch(submitOnboarding(formData, user.id, fileType));
    dispatch(submitOnboarding(formData));
    navigate("/personal-information");
    // Handle form submission logic here
  }

  return (
    <>
      <Header />

      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="name.firstName" className="block text-gray-600">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.name.firstName}
            onChange={handleNameChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-600">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.name.lastName}
            onChange={handleNameChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Middle Name */}
        <div className="mb-4">
          <label htmlFor="middleName" className="block text-gray-600">
            Middle Name
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.name.middleName}
            onChange={handleNameChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Preferred Name */}
        <div className="mb-4">
          <label htmlFor="preferredName" className="block text-gray-600">
            Preferred Name
          </label>
          <input
            type="text"
            id="preferredName"
            name="preferredName"
            value={formData.name.preferredName}
            onChange={handleNameChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-gray-600">
            Profile Picture
          </label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            placeholder="URL or base64-encoded image"
            className="mt-1 p-2 border rounded-md w-full"
          />
          {formData.profilePicture && (
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="mt-2 w-32 h-32 object-cover rounded-full mx-auto"
            />
          )}
        </div>

        {/* Current Address */}
        <div className="mb-4">
          <label className="block text-gray-600">
            Current Address <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              id="aptNumber"
              name="aptNumber"
              value={formData.address.aptNumber}
              onChange={handleAddressChange}
              placeholder="Apt Number"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="streetName"
              name="streetName"
              value={formData.address.streetName}
              onChange={handleAddressChange}
              placeholder="Street Name"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              placeholder="City"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
              placeholder="State"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.address.zip}
              onChange={handleAddressChange}
              placeholder="Zip"
              className="mt-1 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Cell Phone Number */}
        <div className="mb-4">
          <label htmlFor="cellPhoneNumber" className="block text-gray-600">
            Cell Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="cellPhoneNumber"
            name="cellPhoneNumber"
            value={formData.phoneNumber.cellPhoneNumber}
            onChange={handlePhoneNumberChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Work Phone Number */}
        <div className="mb-4">
          <label htmlFor="workPhoneNumber" className="block text-gray-600">
            Work Phone Number
          </label>
          <input
            type="tel"
            id="workPhoneNumber"
            name="workPhoneNumber"
            value={formData.phoneNumber.workPhoneNumber}
            onChange={handlePhoneNumberChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly={user.isHR == "hr"}
            className="mt-1 p-2 border rounded-md w-full bg-gray-100"
          />
        </div>

        {/* SSN */}
        <div className="mb-4">
          <label htmlFor="ssn" className="block text-gray-600">
            SSN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ssn"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-gray-600">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="block  text-gray-600">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">I do not wish to answer</option>
          </select>
        </div>

        {/* Citizenship Status */}
        <div className="mb-4">
          <label htmlFor="citizenship" className="block text-gray-600">
            Permanent resident or citizen of the U.S.?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            id="citizenship"
            name="citizenship"
            value={formData.workAuthorization.citizenship}
            onChange={handleWorkAuthorizationChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Conditional Rendering based on Citizenship Status */}
        {formData.workAuthorization.citizenship === "yes" && (
          <div className="mb-4">
            <label htmlFor="citizenType" className="block text-gray-600">
              Choose your status:
            </label>
            <select
              id="citizenType"
              name="citizenType"
              value={formData.workAuthorization.citizenType}
              onChange={handleWorkAuthorizationChange}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="greenCard">Green Card</option>
              <option value="citizen">Citizen</option>
            </select>
          </div>
        )}

        {formData.workAuthorization.citizenship === "no" && (
          <div>
            {/* Work Authorization */}
            <div className="mb-4">
              <label
                htmlFor="workAuthorizationType"
                className="block text-gray-600"
              >
                What is your work authorization?{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="workAuthorizationType"
                name="workAuthorizationType"
                value={formData.workAuthorization.workAuthorizationType}
                onChange={handleWorkAuthorizationChange}
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="H1-B">H1-B</option>
                <option value="L2">L2</option>
                <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
                <option value="H4">H4</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {formData.workAuthorization.workAuthorizationType ===
              "F1(CPT/OPT)" && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="workAuthorizationFiles"
                    className="block text-gray-600"
                  >
                    Upload a file for work authorization:
                  </label>
                  <FilePreviewer addFile={addFile} />
                </div>
              </>
            )}
            {formData.workAuthorization.workAuthorizationType === "Other" && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="cellPhoneNumber"
                    className="block text-gray-600"
                  >
                    Visa Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="visaTitle"
                    name="visaTitle"
                    value={formData.phoneNumber.cellPhoneNumber}
                    required
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
              </>
            )}
            {/* File Upload for Work Authorization */}
          </div>
        )}

        {/* Reference */}
        <div className="mb-4">
          <label className="block text-gray-600">Reference</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              id="referenceFirstName"
              name="reference.firstName"
              value={formData.reference.firstName}
              onChange={handleReferenceChange}
              placeholder="First Name"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="referenceLastName"
              name="reference.lastName"
              value={formData.reference.lastName}
              onChange={handleReferenceChange}
              placeholder="Last Name"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="referenceMiddleName"
              name="reference.middleName"
              value={formData.reference.middleName}
              onChange={handleReferenceChange}
              placeholder="Middle Name"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="tel"
              id="referencePhone"
              name="reference.phone"
              value={formData.reference.phone}
              onChange={handleReferenceChange}
              placeholder="Phone"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="email"
              id="referenceEmail"
              name="reference.email"
              value={formData.reference.email}
              onChange={handleReferenceChange}
              placeholder="Email"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="referenceRelationship"
              name="reference.relationship"
              value={formData.reference.relationship}
              onChange={handleReferenceChange}
              placeholder="Relationship"
              className="mt-1 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mb-4">
          <label className="block text-gray-600">Emergency Contact</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              id="emergencyContactFirstName"
              name="emergencyContact.firstName"
              value={formData.emergencyContact.firstName}
              onChange={handleEmergencyContactChange}
              placeholder="First Name"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="emergencyContactLastName"
              name="emergencyContact.lastName"
              value={formData.emergencyContact.lastName}
              onChange={handleEmergencyContactChange}
              placeholder="Last Name"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="emergencyContactMiddleName"
              name="emergencyContact.middleName"
              value={formData.emergencyContact.middleName}
              onChange={handleEmergencyContactChange}
              placeholder="Middle Name"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="tel"
              id="emergencyContactPhone"
              name="emergencyContact.phone"
              value={formData.emergencyContact.phone}
              onChange={handleEmergencyContactChange}
              placeholder="Phone"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="email"
              id="emergencyContactEmail"
              name="emergencyContact.email"
              value={formData.emergencyContact.email}
              onChange={handleEmergencyContactChange}
              placeholder="Email"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              id="emergencyContactRelationship"
              name="emergencyContact.relationship"
              value={formData.emergencyContact.relationship}
              onChange={handleEmergencyContactChange}
              placeholder="Relationship"
              className="mt-1 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Summary of Uploaded Files */}
        {files != "" && (
          <div className="mb-4">
            <label
              htmlFor="summaryOfUploadedFiles"
              className="block text-gray-600"
            >
              Summary of Uploaded Files
              <div className="flex flex-row items-center justify-between mt-1 p-2 border rounded-md w-full">
                {files.map((i) => {
                  return <span>{i.name}</span>;
                })}
              </div>
            </label>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>

        {/* Feedback */}
        {/* <div className="mb-4">
          <label
            htmlFor="summaryOfUploadedFiles"
            className="block *:text-gray-600"
          >
            Feedback
          </label>
          <textarea
            id="summaryOfUploadedFiles"
            name="summaryOfUploadedFiles"
            value={formData.summaryOfUploadedFiles}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 border rounded-md w-full"
          ></textarea>
        </div> */}
      </form>
    </>
  );
};

export default OnboardingPage;
