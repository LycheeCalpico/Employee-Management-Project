const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalInformationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: String,
    preferredName: String,
  },
  defaultProfilePicture: {
    type: String,
    default: "https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.webp",
  },
  profilePicture: {
    type: Buffer,
  },
  address: {
    aptNumber: String,
    streetName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  phoneNumber: {
    cellPhoneNumber: { type: String, required: true },
    workPhoneNumber: String,
  },
  email: { type: String, required: true },
  ssn: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  workAuthorization: {
    citizenship: String,
    citizenType: String,
    workAuthorizationType: String,
    startDate: String,
    endDate: String,
  },
  employment: [
    {
      visaTitle: String,
      startDate: String,
      endDate: String,
    },
  ],
  reference:{
    firstName: String,
    lastName: String,
    middleName: String,
    phone: String,
    email: String,
    relationship: String,
  },
  emergencyContact: [
    {
      firstName: String,
      lastName: String,
      middleName: String,
      phone: String,
      email: String,
      relationship: String,
    },
  ],
  onboardingStatus: {
    type: String,
    default: "pending",
  },
  HRfeedback: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Profile", personalInformationSchema);
