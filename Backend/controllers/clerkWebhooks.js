import User from "../models/userModel.js";
import { Webhook } from "svix";

console.log("Webhook endpoint reached!");

const clerkWebhooks = async (req, res) => {
  try {
     
    console.log("Webhook hit!", req.body);

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    await whook.verify(JSON.stringify(req.body), headers);
    console.log("Webhook verified!");

    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    console.log("Received Clerk event:", type, userData)

    switch (type) {
      case "user.created":
        {
          const user = await User.create(userData);
          console.log(user);
          break;
        }

      case "user.updated":
        {
          await User.findByIdAndUpdate(data.id, userData);
          break;
        }

      case "user.deleted":
        {
          await User.findByIdAndDelete(data.id);
          break;
        }

      default:
        break;
    }
    res.json({sucess: true, message: "Webhook recieved"});
  } catch (error) {
    console.log(error.message); 
    res.json({sucess: false, message: error.message});
  }
};

export default clerkWebhooks;