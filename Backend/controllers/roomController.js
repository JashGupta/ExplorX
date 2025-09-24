import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

export default createRoom = async(req, res) => {
    try {
        const {roomType, pricePerNight, amenities, images} = req.body;
        const hotel = await Hotel.findOne({owner: req.user._id});
        if(!hotel) {
            return res.json({sucess: false, message: "Hotel not found"});
        }
        await Room.create({hotel, roomType, pricePerNight, amenities, images});
        res.json({sucess: true, message: "Room created sucessfully"});
    } catch (error) {
        res.json({sucess: false, message: error.message});
    }
}