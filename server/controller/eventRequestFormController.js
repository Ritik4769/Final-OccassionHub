import requetSchema from '../model/eventRequestModel.js'
import usermodel from '../model/usermodel.js'

export const userEventRequestController = async (request, response) => {
  const { userEmail, eventname, totalguest, eventtype, budget, location, startedate, starttime , endtime , enddate, meal, addtionalinfo, serviceschoose, customiseThali, venuetype, decorationtype } = request.body;
  console.log("request event controller ,", request.body);
  try {
    const user = await usermodel.findOne({ email: userEmail });

    console.log("user Data in try : ", user);

    var requetSchemaForm = await requetSchema.create({
      userid: user._id,
      userEmail: userEmail,
      eventname: eventname,
      totalguest: totalguest,
      eventtype: eventtype,
      budget: budget,
      location: location,
      startedate: startedate,
      enddate: enddate,
      starttime: starttime,
      endtime: endtime,
      meal: meal,
      addtionalinfo: addtionalinfo,
      serviceschoose: serviceschoose,
      isdjbooked: serviceschoose.dj,
      islocationExtraCharge: serviceschoose.extralocationcharge,
      customiseThali: customiseThali,
      decorationtype: decorationtype,
      venuetype: venuetype
    });

    console.log("requetSchemaForm on controller ", requetSchemaForm)
    response.status(201).json(requetSchemaForm);
  } catch (error) {
    console.log("Error in user Event Form controller", error);
    response.status(500).json('Error');

  }
}

export const profileController = async (request, response) => {
  var userEmail = request.body.userEmail;
  console.log("userEmail on controller ", userEmail);
  try {
    const userDetails = await usermodel.findOne({ email: userEmail });
    console.log("userDetails on controller ---------->", userDetails);
    response.status(201).json({ userDetails });
  } catch (error) {
    console.error("Error in profileController: ", error);
    response.status(500).json({ error: "Error in profileController" });
  }
}