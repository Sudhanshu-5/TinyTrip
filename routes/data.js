const router = require("express").Router();
const e = require("express");
const Property = require("../models/property");
const Location = require("../models/location");
const State = require("../models/state");


//add hotel to DB
router.post("/addProperty", async (req, res) => {
  try {
 
    const newProperty ={
      propertyName:req.body.propertyName, 
      location:req.body.location, // location name
      state:req.body.state, //state name
      propertyType:req.body.propertyType
    };


    savedProperty = await Property.findOneAndUpdate({propertyName:req.body.propertyName},newProperty,{
      new: true,
      upsert:true
    });

    const updatedLocation = await Location.findOneAndUpdate({locationName:req.body.location},{locationName:req.body.location},{
      new: true,
      upsert:true
    });

    updatedLocation.properties.addToSet(savedProperty._id)
    updatedLocation.save(function(err,saved){

    })
    
    const updatedState = await State.findOneAndUpdate({stateName:req.body.state},{stateName:req.body.state},{
      new: true,
      upsert:true
    });

    updatedState.locations.addToSet(updatedLocation._id)
    // updatedState.properties.addToSet(savedProperty._id)
    updatedState.save(function(err,saved){

    })
    // res.status(200).json(updatedState);
    res.status(200).json(savedProperty);
    // res.status(200).json(updatedLocation);
  }
   catch (err) {
     console.log(err)
    res.status(500).json(err)
  }
});

// get all States from DB
router.get("/getStates" ,async(req,res)=>{
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
    let locations = await State.findById({_id:req.params.id}).populate('locations');//locations of selected state

    res.status(200).json(locations)
    
  } catch (error) {
    console.log(error)
    res.status(500).json("ERROR")
  }
})

//get all hotels from selected location
router.get("/getProperties/:locationId/:propertyType" ,async(req,res)=>{
  try {
    let propertyType = req.params.propertyType
    let properties = await Location.findById({_id:req.params.locationId}).populate('properties')
    res.status(200).json(properties)
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})
router.get("/getProperty/:propertyId" ,async(req,res)=>{
  try {
    let property = await Property.findById({_id:req.params.propertyId});
    res.status(200).json(property)
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})



module.exports = router;
