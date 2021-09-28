const router = require("express").Router();
const e = require("express");
const Property = require("../models/property");
const Location = require("../models/location");
const State = require("../models/state");
const Offerings = require("../models/offerings");

//add hotel to DB
// router.post("/addProperty", async (req, res) => {
//   try {
 
//     const newProperty ={
//       propertyName:req.body.propertyName, 
//       location:req.body.location, // location name
//       state:req.body.state, //state name
//       propertyType:req.body.propertyType
//     };


//     savedProperty = await Property.findOneAndUpdate({propertyName:req.body.propertyName},newProperty,{
//       new: true,
//       upsert:true
//     });

//     const updatedLocation = await Location.findOneAndUpdate({locationName:req.body.location},{locationName:req.body.location},{
//       new: true,
//       upsert:true
//     });

//     updatedLocation.properties.addToSet(savedProperty._id)
//     updatedLocation.save(function(err,saved){

//     })
    
//     const updatedState = await State.findOneAndUpdate({stateName:req.body.state},{stateName:req.body.state},{
//       new: true,
//       upsert:true
//     });

//     updatedState.locations.addToSet(updatedLocation._id)
//     // updatedState.properties.addToSet(savedProperty._id)
//     updatedState.save(function(err,saved){

//     })
//     // res.status(200).json(updatedState);
//     res.status(200).json(savedProperty);
//     // res.status(200).json(updatedLocation);
//   }
//    catch (err) {
//      console.log(err)
//     res.status(500).json(err)
//   }
// });

// // get all States from DB
// router.get("/getStates" ,async(req,res)=>{
//   try {
//     let states = await State.find({}).populate('locations')
//     res.status(200).json(states)

//   } catch (error) {
//     res.status(500).json("ERROR")
//   }
// })

// //get all locations of selected state ;use state id
// router.get("/getLocations/:id" ,async(req,res)=>{
//   try {
//     let locations = await State.findById({_id:req.params.id}).populate('locations');//locations of selected state
//     console.log(locations)
//     res.status(200).json(locations)
    
//   } catch (error) { 
//     console.log(error)
//     res.status(500).json("ERROR")
//   }
// })
//get all hotels from selected location
// router.get("/getProperties/:locationId/:propertyType" ,async(req,res)=>{
//   try {
//     let propertyType = req.params.propertyType
//     let properties = await Location.findById({_id:req.params.locationId}).populate('properties')
//     res.status(200).json(properties)
    
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// })


// getall properties at homepage
router.get("/search",async(req,res)=>{
  try {
    //get all locations and properties

    let  allLocations = await Location.find({}).populate('locationName');
    let  allProperties = await Property.find({});
    let popularLocations=[];
    let popularProperties=[];

    //add popular locations
    allLocations.forEach(function(location){
      if(location.isPopular){
        popularLocations.push(location)
      }

    })

    // res.send(popularLocations)
    //add popular properties
    allProperties.forEach(function(property){
      if(property.isPopular){
        popularProperties.push(location)
      }

    })
    
    // res.send(popularProperties)
    //request queries
    let locationsId = req.query.locations;
    let sortType = req.query.sort;
    let propertyType = req.query.propertyType;
    if(locationsId){
      let locationArray = locationsId.split(',')
      let flag='0';
      if(sortType==="desc"){
        flag='1'
      }
      // let locations = await Location.find({_id : {$in: locationArray}}).populate('properties');
      let properties =await Property.find({location : {$in: locationArray} , propertyType:propertyType}).sort([['minimum_Price', -1]]).populate('location').exec()
      // console.log(properties)
  
      // if(flag==='1'){ //desc
      //   locations.sort((a, b) => (a.locationName.locatioName < b.locationName.locatioName ) ? 1 : -1)
      //   properties.minimum_Price.sort().reverse()
      // }
      // else
      // {
      //   // locations.sort((a, b) => (a.locationName.locatioName > b.locationName.locatioName ) ? 1 : -1)
      //   properties.minimum_Price.sort()
      // }
          
      console.log(properties) 
    }

   
    
  } catch (error) {
    console.log(error)
  }

})
router.get("/featuredProperties" ,async(req,res)=>{
  try {
    var populateQuery = [{path:'location'}, {path:'state'},{path:'additionalInfo'},{path:'offerings'}];

    let  featuredProperties = await Property.find({}).populate(populateQuery);

    console.log(featuredProperties) 
  } catch (error) {
    console.log(error)
  }
})

// get selected location info
router.get("/locations/:id" ,async(req,res)=>{
  try {
    var populateQuery = [{path:'locationName'}, {path:'properties'}];

    let  location = await Location.findById(req.params.id).populate(populateQuery);

    // console.log(location) 
    res.send(location)
  } catch (error) {
    console.log(error)
  }
})

//get info of particular property
router.get("/getProperty/:propertyId" ,async(req,res)=>{
  try {
    var populateQuery = [{path:'location'}, {path:'state'}, {path:'offerings'}];

    let property = await Property.findById({_id:req.params.propertyId}).populate(populateQuery);
    res.send(property)
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})



module.exports = router;
