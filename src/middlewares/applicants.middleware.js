import jwt from "jsonwebtoken";
import HandleError from "../utils/HandleError.js";
import Application from "../models/applicants.model.js";

const applicationAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Token expired or missing!")
            );
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const applicationData = await Application.findById(decodedToken._id).select("-password");
        if (!applicationData) {
            return res.status(400).json(new HandleError(400, "Invalid Token!"));
        }

        req.application = applicationData;
        next();
    } catch (error) {
        return res
        .status(400)
        .json(
            new HandleError(400, "Authentication failed!")
        );
    }
};

export default applicationAuth;