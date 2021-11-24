import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jobsSchema = new Schema({
  
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'companyDetails'
    },
    companyName: { type : String},
    employerId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'employerDetails'
    },
    jobTitle: { type : String},
    industry: { type : String},
    
    jobLocation: {
        street: { type : String},
        apt: { type : String},
        city: { type : String},
        state: { type : String},
        country: { type : String},
        zip: { type : String}
    },
    
    jobDescription : {
        description : { type : String},
        responsibilites : { type : String},
        requirements: { type : String},
        whyUs: { type : String}
    },

    jobType:  { type : String},
    salary: {type : Number},
});

const Jobs = mongoose.model(
	"job",
	jobsSchema
);

export default Jobs;