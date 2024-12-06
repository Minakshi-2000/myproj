import HandleError from "../utils/HandleError.js";
import HandleResponse from "../utils/HandleResponse.js";
import Applicant from "../models/applicants.model.js";


const applyToJob = async (req, res) => {

    /*
    1. take all necessary parameters
    2. sanitize them properly
    3. check applicant_id is present or not in the database
    4. If present, just throw an error
    5. If not, create a new job application
    6. Save the application in the database
    7. Return a response with success message
    */

    try {
    const { job_id } = req.body
        if (!job_id) {
        return res
        .status (400)
        .json(
            new HandleError(400, "Job ID is required!")
        )
    }

    const jobDoc = await Job.findById(job_id)
        if (!jobDoc) {
        return res
        .status (400)
        .Json(
            new HandleError(400, "Invalid Job ID")
        )
    }

    const existingApplication = await Applicant.findOne({
        $and: [ 
            {applicant_id: req.jobseeker._id},
            { job_id: job_id }
        ]
    })
    
    if (existingApplication) {
        return res
        .status(400)
        .json(
            new HandleError(400, "You have already applied for this job!")
        )
    }

    const jobApplication = await Applicant.create({
        applicant_name: req.jobseeker?.name,
        applicant_id: req.jotseeker._id,
        phane_no: reg.Jobseeker.Phone_no,
        job_id : job_id
    })

    return res
    .status(201)
    .json(
        new HandleResponse(201,"Application submitted successfully!")
    )
    } catch (error) {
        return res
        .status(500)
        .json(
            new HandleError(500, error.message)
        );
    }
}

const getAllApplicationsByApplicantId = async (req, res) => {
    
    /*
    1. take applicant_id from the request parameters
    2. find all applications for this applicant in the database
    3. Return a response with the list of applications
    */
    
    try {
        const { _id: applicationId } = req.application;

        const applications = await Applicant.find({ applicant_id: applicationId }).populate("job_id");
        return res
            .status(200)
            .json(
                new HandleResponse(200, applications, "Applications retrieved successfully!")
            );
    } catch (error) {
        return res
        .status(500)
        .json(
            new HandleError(500, error.message)
        );
    }
};

const getApplicationById = async (req, res) => {
    
    /*
    1. take application_id from the request parameters
    2. find the application in the database by id
    3. Return a response with the application details
    */
    
    try {
        const { id } = req.params;
        const applicationData = req.application;

        if (applicationData._id.toString() !== id) {
            return res
                .status(403)
                .json(
                    new HandleError(403, "Unauthorized to access this application!")
                );
        }

        const application = await Applicant.findById(id);
        if (!application) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Application not found!")
            );
        }
        
        return res
        .status(200)
        .json(
            new HandleResponse(200, application, "Application retrieved successfully!")
        );
    } catch (error) {
        return res
        .status(500)
        .json(
            new HandleError(500, error.message)
        );
    }
};

const deleteJobApplication = async (req, res) => {
    
    /*
    1. take application_id from the request parameters
    2. check if the application exists in the database
    3. If not, throw an error
    4. Delete the application from the database
    5. Return a response with success message
    */
    
    try {
        const { id } = req.params;
        const applicationData = req.application;

        if (applicationData._id.toString() !== id) {
            return res
                .status(403)
                .json(
                    new HandleError(403, "Unauthorized to delete this application!")
                );
        }

        const application = await Applicant.findById(id);

        if (!application) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Application not found!")
            );
        }

        await application.remove();
        return res
        .status(200)
        .json(
            new HandleResponse(200, "Application deleted successfully!")
        );
    } catch (error) {
        return res
        .status(500)
        .json(
            new HandleError(500, error.message)
        );
    }
};

export {
    applyToJob,
    getAllApplicationsByApplicantId,
    getApplicationById,
    deleteJobApplication
};