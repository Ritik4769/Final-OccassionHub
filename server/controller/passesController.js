import passesModel from "../model/passesModel.js";
import requestSchema from '../model/eventRequestModel.js';
import usermodel from '../model/usermodel.js';
import { fileURLToPath } from 'url';
import path from 'path';

export const passesDataController = async (request, response) => {
    try {
        var __filename = fileURLToPath(import.meta.url);
        var __dirname = path.dirname(__filename).replace("\\controller", "");
        console.log("request.body : ", request.body);
        const { userEmail, passesPrice, cheakdate, Quantity } = request.body;
        var filename = request.files.docs;
        var fileName = new Date().getTime() + filename.name;
        console.log("fileName : ", fileName);

        var pathName = path.join(__dirname, "/public/assets/images/", fileName);
        var requestedUser = await usermodel.findOne({ email: userEmail });
        var requestData = await requestSchema.find({ userid: requestedUser._id });
        console.log("cheak date ----->",request.body.cheakdate);
        console.log("Data  : ",requestData);
        console.log("startedate ",requestData[0].startedate);
        
        for (var i = 0; i < requestData.length; i++) {
            console.log("startdate : ",requestData[i].startedate);
            
            if (cheakdate == requestData[i].startedate) {
                console.log("Date match ");
                console.log("request user Data: ", requestData[i]);

                filename.mv(pathName, async (error) => {
                    if (error) {
                        console.log(error);
                        response.status(203).json({ message: "Error while uploading document in passes controller" });
                    } else {
                        try {
                            const existingPasses = await passesModel.findOne({
                                eventrequested_id: requestData[i]._id,
                                userEmail: userEmail,
                            });

                            if (existingPasses) {
                                console.log("User has already bought passes for this event.");
                                response.status(202).json({ status: false, message: "User has already bought passes for this event." });
                                return;
                            }

                            const passesData = await passesModel.create({
                                eventrequested_id: requestData[i]._id,
                                userEmail: userEmail,
                                passname: requestData[i].eventname,
                                eventtype: requestData[i].eventtype,
                                passesPrice: passesPrice,
                                Quantity: Quantity,
                                startTime: requestData[i].starttime,
                                EndTime: requestData[i].endtime,
                                Start_Date: requestData[i].startedate,
                                address: requestData[i].location,
                                docs: fileName
                            });

                            console.log("passesData : ", passesData);
                            await passesData.save();
                            response.status(201).json({ passesData: passesData });
                        } catch (error) {
                            console.log("Error in passesDataController: ", error);
                            response.status(500).json({ status: false, message: "Internal Server Error" });
                        }
                    }
                });
                return;
            }
        }

        console.log("Date not match");
        response.status(204).json({ status: false, message: "You have not organized an event on this date on our platform." });
    } catch (error) {
        console.log("Error in passesDataController: ", error);
        response.status(500).json({ status: false, message: "Internal Server Error" });
    } 
}