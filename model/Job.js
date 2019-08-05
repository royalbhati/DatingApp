const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    default: "N/A"
  },
  logo: {
    type: String,
    default:
      "https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png"
  },
  rname: {
    type: String,
    require: true
  },
  location: {
    type: String,
    required: true
  },
  appliedby: {
    type: Array,
    default: []
  },
  createdby: {
    type: String,
    required: true
  }
});

const job = mongoose.model("job", JobSchema);

module.exports = job;
