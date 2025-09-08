const rooms = [
  {
    _id: "1",
    name: "Ocean View Resort",
    city: "Goa, India",
    address: "Calangute Beach Road, Goa",
    price: "₹4,500",
    rating: 4,
    reviews: 120,
    images: ["/hotel-1.jpg", "/hotel-1a.jpg", "/hotel-1b.jpg"],
    amenities: ["Sea View", "Free WiFi", "Pool", "Restaurant", "Parking"],
    roomType: "Single Bed",
    policies: [
      "Free cancellation up to 48 hours before check-in",
      "Pets allowed on request",
      "Non-smoking property"
    ],
    offer: "20% off",
    host: { name: "Virat Kohli", profilePic: "/person-1.jpg" }
  },
  {
    _id: "2",
    name: "Mountain Escape Lodge",
    city: "Manali, India",
    address: "Hadimba Temple Road, Manali",
    price: "₹3,200",
    rating: 5,
    reviews: 200,
    images: ["/hotel-2.jpg", "/hotel-2a.jpg", "/hotel-2b.jpg"],
    amenities: ["Mountain View", "Bonfire", "Room Heater", "Free Breakfast"],
    roomType: "Double Bed",
    policies: [
      "Free cancellation within 24 hours of booking",
      "Not allowed",
      "Designated smoking areas available"
    ],
    offer: "10% off",
    host: { name: "Priety zinta", profilePic: "/person-2.jpg" }
  },
  {
    _id: "3",
    name: "Desert Sands Retreat",
    city: "Jaisalmer, India",
    address: "Sam Sand Dunes, Jaisalmer",
    price: "₹2,800",
    rating: 4,
    reviews:500,
    images: ["/hotel-3.jpg", "/hotel-3a.jpg", "/hotel-3b.jpg"],
    amenities: ["Camel Safari", "Cultural Shows", "Free WiFi", "Traditional Dining"],
    roomType: "Double Bed",
    policies: [
      "50% refund for cancellations 72 hours before check-in",
      "Not allowed",
      "Allowed in open areas"
    ],
    offer: "",
    host: { name: "Iron Man", profilePic: "/person-3.jpg" }
  },
  {
    _id: "4",
    name: "City Lights Hotel",
    city: "Mumbai, India",
    address: "Marine Drive, Mumbai",
    price: "₹5,200",
    rating: 5,
    reviews: 1000,
    images: ["/hotel-4.jpg", "/hotel-4a.jpg", "/hotel-4b.jpg"],
    amenities: ["Sea View", "Free Breakfast", "Gym", "Airport Shuttle"],
    roomType: "Deluxe Bed",
    policies: [
      "Free cancellation up to 24 hours before check-in",
      "Allowed with additional charges",
      "Designated floors only"
    ],
    offer: "50% off",
    host: { name: "Neeraj Pepsu", profilePic: "/person-4.jpg" }
  },
  {
    _id: "5",
    name: "Royal Palace Stay",
    city: "Jaipur, India",
    address: "Amer Fort Road, Jaipur",
    price: "₹3,900",
    rating: 4,
    reviews: 300,
    images: ["/hotel-5.jpg", "/hotel-5a.jpg", "/hotel-5b.jpg"],
    amenities: ["Pool", "Garden", "Traditional Dining", "Cultural Tours"],
    roomType: "Royal Suite",
    policies: [
      "Non-refundable on peak season dates",
      "Not allowed",
      "Designated smoking area"
    ],
    offer: "30% off",
    host: { name: "Rajendra Singh", profilePic: "/host-rajendra.jpg" }
  },
  {
    _id: "6",
    name: "Green Valley Resort",
    city: "Munnar, India",
    address: "Tea Estate Road, Munnar",
    price: "₹3,100",
    rating: 5,
    reviews: 50,
    images: ["/hotel-6.jpg", "/hotel-6a.jpg", "/hotel-6b.jpg"],
    amenities: ["Hill View", "Free WiFi", "Nature Walks", "Restaurant"],
    roomType: "Standard Bed",
    policies: [
      "Full refund if cancelled 5 days before check-in",
      "Pets allowed",
      "Non-smoking rooms, smoking area available"
    ],
    offer: "",
    host: { name: "Lakshmi Nair", profilePic: "/host-lakshmi.jpg" }
  }
];

export default rooms;