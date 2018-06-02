var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var admin = require("firebase-admin");
var moment = require('moment');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://traffictickets-f193d.firebaseio.com"
});

const sequelize = new Sequelize('mysql://root@127.0.0.1:3306/database_development');
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});






// MODELS
const User = sequelize.import(__dirname + "/../models/user");
const Driver = sequelize.import(__dirname + "/../models/driver");
const TicketReport = sequelize.import(__dirname + "/../models/ticketreport");
const ConsultancyTracking = sequelize.import(__dirname + "/../models/consultancy_tracking");

// MODELS DEPENDANCIES
User.hasMany(Driver,{as:'Drivers'});
User.hasMany(TicketReport,{as:'TicketReports',foreignKey: 'userId', sourceKey: 'id'});
Driver.hasMany(TicketReport,{as:'TicketReports',foreignKey: 'driverUserId', sourceKey: 'id'});
TicketReport.hasMany(ConsultancyTracking,{as:'ConsultancyTrackings',foreignKey: 'TicketNumber', sourceKey: 'id'});

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

/* Register */
router.post('/register', function(req, res, next) {
    console.log('Password',req.body['password']);
    console.log('Password',req.body);
    console.log('Password',req.body['username']);
        User.findOne({where:{ username: req.body.username }})
            .then(function (user) {
                if(!user){

                    User.create({
                        username: req.body.username,
                        password: req.body['password'],
                        email: req.body.email,
                        pushToken: req.body.pushToken
                    })
                        .then(function(user){
                            var myToken = jwt.sign({ user: user.id },
                                'secret',
                                { expiresIn: 24 * 60 * 60 });
                            res.status(200).json( {'token': myToken });
                        });
                } else {
                    res.status(404).json({message:'Username already exist!'});
                }
            })
            .catch(function (err) {
                res.status(400).json({message:'Error creating user: '+ err.message});
            });

});


/* login */
router.post('/login', function(req, res, next) {

    User.findOne({where:{ username: req.body.username }})
        .then(function (user) {
            if(!user){

                res.status(404).json('Wrong credentials!');

            } else {
                if (user.password === req.body['password']){
                    var myToken = jwt.sign({ user: user.id },
                        'secret',
                        { expiresIn: 24 * 60 * 60 });

                    user.update({
                        pushToken: req.body.pushToken
                    }).then(() => {
                        res.status(200).json( {'token': myToken });
                    });

                }else{
                    res.status(201).json('Incorrect password!');
                }
            }
        })
        .catch(function (err) {
            res.status(400).json({message:'Error creating user: '+ err.message});
        });

});

/* add driver */
router.post('/add_driver', function(req, res, next) {
    verifyToken(req,res);

    User.findOne({where:{ id: req.decoded["user"] }})
        .then(function (user) {
            if(!user){

                res.status(404).json('User was not found!');

            } else {
                    Driver.create({
                        userId : req.decoded["user"] ,
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        drivingLicenseNumber : req.body.drivingLicenseNumber,
                        idNumber : req.body.idNumber
                    }).then(driver => {
                        var drivers = user.getDrivers().then(drivers => {
                                res.status(200).json(drivers);
                        });

                    });

            }
        })
        .catch(function (err) {
            res.status(400).json({message:'Error creating user: '+ err.message});
        });

});

/* get drivers */
router.get('/get_drivers' , function(req, res, next){
    verifyToken(req,res);
    User.findOne({where:{ id: req.decoded["user"] }})
        .then(function (user) {
            if(!user){

                res.status(404).json('User was not found!');

            } else {
                var drivers = user.getDrivers().then(drivers => {
                    res.status(200).json(drivers);
                });

            }
        })
        .catch(function (err) {
            res.status(400).json({message:'Error creating user: '+ err.message});
        });
});

/* add ticket */
router.post('/add_ticket', function(req, res, next) {
    verifyToken(req,res);
    console.log(req.body);

    Driver.findOne({where:{ id: req.body.id }})
        .then(function (driver) {
            if(!driver){

                res.status(404).json('Driver was not found!');

            } else {
                TicketReport.create({
                    userId: driver.userId,
                    driverUserId : req.body.id,
                    DriverRequest: req.body.DriverRequest,
                    DriverName: req.body.DriverName,
                    PenaltyNumber: req.body.PenaltyNumber,
                    IdPassportNumber: req.body.IdPassportNumber,
                    IdPassportType: req.body.IdPassportType,
                    LicenseType: req.body.LicenseType,
                    LicenseNumber: req.body.LicenseNumber,
                    City: req.body.City,
                    Street: req.body.Street,
                    HouseNumber: req.body.HouseNumber,
                    ZipCode: req.body.ZipCode,
                    PhoneNumber: req.body.PhoneNumber,
                    DayNumber: req.body.DayNumber,
                    PenaltyLocation: req.body.PenaltyLocation,
                    PenaltyDescription: req.body.PenaltyDescription,
                    PenaltyNotes: req.body.PenaltyNotes,
                    DriverNotes: req.body.DriverNotes,
                    PlateType: req.body.PlateType,
                    VehiclePlateNumber: req.body.VehiclePlateNumber,
                    VehicleType: req.body.VehicleType,
                    VehicleColor: req.body.VehicleColor,
                    VehicleModel: req.body.VehicleModel,
                    BMSymbol: req.body.BMSymbol,
                    SeifTakana: req.body.SeifTakana,
                    SemelAvera: req.body.SemelAvera,
                    PenaltyPoints: req.body.PenaltyPoints,
                    PenaltyDate:  req.body.PenaltyDate,
                    OfficeStatus: "ממתין לטיפול"
                }).then(ticket => {
                    User.findOne({where:{ id: ticket.userId }})
                    .then(function (user) {
                        if(!user){

                            res.status(404).json('User was not found!');

                        } else {
                            var tickets = user.getTicketReports().then(tickets => {
                                res.status(200).json(tickets);
                        });

                        }
                    });
            });

            }
        })
        .catch(function (err) {
            res.status(400).json({message:'Error creating Ticket: '+ err.message});
        });

});

/* get admin tickets */
router.get('/get_admin_tickets' , function(req, res, next){

    // also possible:
    TicketReport.all().then(tickets => {
        res.status(200).json({data : tickets});
    })
        .catch(function (err) {
        res.status(400).json({message:'Error creating user: '+ err.message});
        });
});

/* get tickets */
router.get('/get_tickets' , function(req, res, next){
    verifyToken(req,res);

    User.findOne({where:{ id: req.decoded["user"] }})
        .then(function (user) {
            if(!user){

                res.status(404).json('User was not found!');

            } else {
                var tickets = user.getTicketReports().then(tickets => {
                    res.status(200).json(tickets);
            });

            }
        })
        .catch(function (err) {
            res.status(400).json({message:'Error getting tickets: '+ err.message});
        });
});

/* Update office status */
router.put('/update_ticket_status' , function(req, res, next){

    TicketReport.findOne({where:{ id: req.body.id }})
        .then(function (ticket) {
            if(!ticket){

                res.status(404).json('Ticket '+req.body.id+' was not found!');

            } else {
                if (!req.body.ticket_status){
                    res.status(404).json('Status field is empty!');
                }
                ticket.update({
                    OfficeStatus: req.body.ticket_status
                }).then(() => {


                    User.findOne({where:{ id: ticket.userID }})
                    .then(function (user) {
                        if(!user){

                            res.status(404).json('User was not found!');

                        } else {


                            // This registration token comes from the client FCM SDKs.
                            var registrationToken = user.pushToken;

                            // See the "Defining the message payload" section below for details
                            // on how to define a message payload.
                            var payload = {
                                notification: {
                                    title: "סטטוס בקשה עודכן",
                                    body: "התחבר על מנת לקבל את כל העדכונים החדשים"
                                }
                            };

                            // Send a message to the device corresponding to the provided
                            // registration token.
                            admin.messaging().sendToDevice(registrationToken, payload)
                                .then(function(response) {
                                    // See the MessagingDevicesResponse reference documentation for
                                    // the contents of response.
                                    console.log("Successfully sent message:", response);
                                    var tickets = user.getTicketReports().then(tickets => {
                                        res.status(200).json(tickets);
                                    });
                                })
                                .catch(function(error) {
                                    console.log("Error sending message:", error);
                                });




                        }
                    })
                    .catch(function (err) {
                        res.status(400).json({message:'Error getting user: '+ err.message});
                    });




                });

            }
        })
        .catch(function (err) {
            res.status(400).json({message:'Error updating ticket. : '+ err.message});
        });
});

module.exports = router;

function verifyToken(req,res){
    var token = req.body.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                console.error("JWT Verification Error", err);
                return res.status(403).send(err);
            } else {
                req.decoded = decoded;
                console.log(req.decoded);
                return ;
            }
        });
    } else {
        res.status(403).send("Token not provided");
    }
}