import Hotel from "../models/hotelModel.js";
import User from "../models/userModel.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id;

        const hotel = Hotel.findOne({owner});
        if(hotel) {
            res.json({sucess: false, message: "Hotel already registered"});
        }
        await Hotel.create({ name, address, contact, owner, city });
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
        res.json({sucess: true, message: "Hotel registered successfully"});
    
    } catch (error) {
        res.json({sucess: false, message: error.message});
    }
}