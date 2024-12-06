import HandleError from "../utils/HandleError.js";
import HandleResponse from "../utils/HandleResponse.js";
import jwt from "jsonwebtoken";
import Employer from "../models/employer.model.js";

const empAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Token expired!!")
            );
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const employeeData = await Employer.findById(decodedToken._id).select("-password");
        if (!employeeData) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Invalid Token!")
            );
        }

        req.employeer = employeeData;
        next();
    } catch (error) {
        return res
        .status(400)
        .json(
            new HandleError(400, "Authentication failed!")
        );
    }
};

export default empAuth;