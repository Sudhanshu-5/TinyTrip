const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const Property = require("../models/property");
const Location = require("../models/location");
const State = require("../models/state");
const mongoose = require('mongoose');
const StateList = require("../models/stateList");
const cityList = require("../models/locationList");

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router