const express = require("express");
const app = express();
 const mongoose = require('mongoose');
 
 const AdminBro = require('admin-bro')
 const AdminBroMongoose = require('@admin-bro/mongoose')
 const AdminBroExpressjs = require('@admin-bro/express')
 const uploadFeature =  require('@admin-bro/upload');
const Property = require("../models/property");
const Location = require("../models/location");
const State = require("../models/state");
const StateList = require("../models/stateList");
const cityList = require("../models/locationList");
const offerings = require("../models/offerings");
const UploadedFile = require("../models/uploadedFile");
const fs = require('fs');
const User = require("../models/user");
const bcrypt = require('bcrypt')
const path = require('path');
const { Console } = require("console");





// // const adminBro = new AdminBro({
// //   databases: [mongoose],
// //   rootPath: '/admin',
// // })
//   const adminBro = new AdminBro({
//     databases:[mongoose],
//     resources: [{
//       resource: User,
//       options: {
//         properties: { password: { isVisible: false } },
//       },
//       features: [passwordFeature({
//         properties: { password: 'password' },
//         hash: argon2.hash,
//       })]
//     }],
//     rootPath: '/admin',
//   })
//   adminBro.watch()
  

//   const routerr = buildAuthenticatedRouter(adminBro, app, {
//     authenticate: async (email, password) => {
//       const user = email && await User.findOne({ email })
//       if (password && user && await argon2.verify(user.encryptedPassword, password)){
//         return user.toJSON()
//       }
//       return null
//     },
//   })
  

//   const router = AdminBroExpress.buildRouter(adminBro)  

  // const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'
  AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  databases: [mongoose],
  resources: [{
    resource: User,
    options: {
      properties: {
        encryptedPassword: {
          isVisible: false,
        },
        password: {
          type: 'string',
          isVisible: {
            list: false, edit: true, filter: false, show: false,
          },
        },
      },
      actions: {
        new: {
          before: async (request) => {
            if(request.payload.password) {
              request.payload = {
                ...request.payload,
                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                password: undefined,
              }
            }
            return request
          },
        }
        // edit: { isAccessible: canModifyUsers },
        // delete: { isAccessible: canModifyUsers },
        // new: { isAccessible: canModifyUsers },
      },
   
    }
  },{
  resource:UploadedFile,
    features: [
      uploadFeature({
        provider: { local: { bucket: 'assests'}},
        properties: {
          key: 'UploadedFile.path',
          // bucket: 'UploadedFile.folder',
          // mimeType: 'UploadedFile.type',
          // size: 'UploadedFile.size',
          // filename: 'UploadedFile.filename',
          // file: 'uploadFile', 
           uploadImage: {
            components: {
          edit: AdminBro.bundle('../components/upload-image.edit.tsx'),
          list: AdminBro.bundle('../components/upload-image.list.tsx'),
      },
    },
        },
        actions:{
          new: {
            after: async (response, request, context) => {
              const { record, uploadImage } = context;
              console.log("asdnjuassdjassjdhadasdnjasdamdslkpsdasdfnpa9sdu")
                if (record.isValid() && uploadImage) {
             
                  const filePath = path.join('assests', record.id().toString(), uploadImage.name);
                  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

                  await fs.promises.rename(uploadImage.path, filePath);

                  await record.update({ profilePhotoLocation: `/${filePath}` });
                }
                return response;
            },
            before: async (request, context) => {
              if (request.method === 'post') {
                const { uploadImage, ...otherParams } = request.payload;
            
                // eslint-disable-next-line no-param-reassign
                context.uploadImage = uploadImage;
            
                return {
                  ...request,
                  payload: otherParams,
                };
              }
              return request;
            },
          },
          edit: {
            after: async (response, request, context) => {
              const { record, uploadImage } = context;

                if (record.isValid() && uploadImage) {
                  const filePath = path.join('assests', record.id().toString(), uploadImage.name);
                  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

                  await fs.promises.rename(uploadImage.path, filePath);

                  await record.update({ profilePhotoLocation: `/${filePath}` });
                }
                return response;
            },
            before: async (request, context) => {
              if (request.method === 'post') {
                const { uploadImage, ...otherParams } = request.payload;
            
                // eslint-disable-next-line no-param-reassign
                context.uploadImage = uploadImage;
            
                return {
                  ...request,
                  payload: otherParams,
                };
              }
              return request;
            },
          },
          show: {
            isVisible: false,
          },
        }
      })
    ]
  
}
],
  rootPath: '/admin',
})

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email })
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword)
      if (matched && user.role==="admin") {
        return user
      }
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
})

// const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

// *********************
 module.exports = router