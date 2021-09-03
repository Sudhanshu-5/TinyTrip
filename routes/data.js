const router = require("express").Router();
const e = require("express");
const Hotel = require("../models/hotel");
const Location = require("../models/location");
const State = require("../models/state");

// const bcrypt = require("bcrypt");

//REGISTER
//add hotel to DB
router.post("/addHotel", async (req, res) => {
  try {
 
    const newHotel = new Hotel({
      hotelName:req.body.hotelName, 
      location:req.body.location, // location namre
      state:req.body.state //state name
    });


    savedHotel = await newHotel.save();

    const updatedLocation = await Location.findOneAndUpdate({locationName:req.body.location},{locationName:req.body.location},{
      new: true,
      upsert:true
    });

    updatedLocation.hotels.addToSet(newHotel._id)
    updatedLocation.save(function(err,saved){

    })
    
    const updatedState = await State.findOneAndUpdate({stateName:req.body.state},{stateName:req.body.state},{
      new: true,
      upsert:true
    });

    updatedState.locations.addToSet(updatedLocation._id)
    updatedState.hotels.addToSet(savedHotel._id)
    updatedState.save(function(err,saved){

    })
    // res.status(200).json(updatedState);
    res.status(200).json(savedHotel);
    // res.status(200).json(updatedLocation);
  }
   catch (err) {
    res.status(500).json(err)
  }
});

// get all States from DB
router.get("/getState" ,async(req,res)=>{
  try {
    let states = await State.find({}).populate('locations')
    res.status(200).json(states)

  } catch (error) {
    res.status(500).json("ERROR")
  }
})

//get all locations of selected state ;use state id
router.get("/getLocations/:id" ,async(req,res)=>{
  try {
    let locations = await State.findById({_id:req.params.id}).populate('locations');

    res.status(200).json(locations)
    
  } catch (error) {
    console.log(error)
    res.status(500).json("ERROR")
  }
})

//get all hotels from selected location
router.get("/getHotels/:id" ,async(req,res)=>{
  try {
    console.log(req.params.id)
    let hotels = await Location.findById({_id:req.params.id}).populate('hotels')
    console.log(hotels)
    res.status(200).json(hotels)
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.post("/getHotel", async (req, res) => {
  try {
    
      let hotels = await (await State.findOne({stateName:req.body.stateName})).populate('hotels') ;
      hotels.forEach(function(hotel){

      })

    
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router;
