var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var admin = require("firebase-admin");
var moment = require('moment');
var request = require('request');
var serviceAccount = require("./reports-app-203722-firebase-adminsdk-0tna4-58f28b5c7b.json");
require('dotenv-safe').config();
var app = require('../app');



var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
bodyParser.json({limit: "50mb"});


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reports-app-203722.firebaseio.com/"
});
console.log(process.env.NODE_ENV);

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  
}


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
const Leads = sequelize.import(__dirname + "/../models/leads");
const Images = sequelize.import(__dirname + "/../models/images");

// MODELS DEPENDANCIES
User.hasMany(Driver,{as:'Drivers'});
User.hasMany(TicketReport,{as:'TicketReports',foreignKey: 'userId', sourceKey: 'id'});
Driver.hasMany(TicketReport,{as:'TicketReports',foreignKey: 'driverUserId', sourceKey: 'id'});
TicketReport.hasMany(ConsultancyTracking,{as:'ConsultancyTrackings',foreignKey: 'TicketNumber', sourceKey: 'id'});
TicketReport.hasMany(Images,{as:'Images',foreignKey: 'TicketNumber', sourceKey: 'id'});

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


/* Social Login */
router.post('/social_login', function(req, res, next) {
	console.log('Got to social-login');
    console.log('Body is ',req.body);
	
	if (!req.body.email) {
		console.log("no email found in body");
		return res.status(400).json({message:'No email found in body'});
	}
	
	if (!req.body.access_token) {
		console.log("no email found in body");
		return res.status(400).json({message:'No access token found in body'});
	}
	
	if (req.body.loginType ==  "facebook")
	{
		// Check access token is valid
		request('https://graph.facebook.com/me?access_token='+req.body.access_token, function (error, response, body) {
		  // console.log('error:', error); // Print the error if one occurred
		  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		  //console.log('body:', body); // Print the HTML for the Google homepage.
		  if ( error || response.statusCode != 200 || !response) {
			  return res.status(410).json({message:'Access token is invalid'});
		  }else {
			  return socialLogin (req, res);
		  }
		});
	} else if (req.body.loginType ==  "google") {
		request('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+req.body.access_token, function (error, response, body) {
			if ( error || response.statusCode != 200 || !response) {
			  return res.status(410).json({message:'Access token is invalid'});
			}else {
			  return socialLogin (req, res);
			}
		});
	}else {
		return res.status(401).json({message:'Login Type is invalid. ' + req.body.loginType});
	}
	
	

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

/* add lead */
router.post('/add_lead', function(req, res, next) {
		Leads.create({
			name  : req.body.name,
			phone : req.body.phone,
			email : req.body.email
		}).then(lead => {
			res.status(200).json({"message":"ok"});
		})
        .catch(function (err) {
            res.status(400).json({message:'Error creating lead: '+ err.message});
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
    // console.log(req.body);

    User.findOne({where:{ username: req.body.email }})
        .then(function (user) {
            if(!user){

                res.status(404).json('User was not found!');

            } else {
                TicketReport.create({
                    userId: user.id,
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
                    OfficeStatus: "ממתין לטיפול",
					apealReasonFreeText: req.body.apealReasonFreeText
                }).then(ticket => {
                    // If got a scan of the ID
					if (req.body.idBlobBase64) {
						Images.create({
							ticketId: ticket.id,
							imageType: "id",
							imageBase64: req.body.idBlobBase64
						});
					}
					
					// If got a scan of the report
					if (req.body.scanBlobBase64) {
						Images.create({
							ticketId: ticket.id,
							imageType: "scan",
							imageBase64: req.body.scanBlobBase64
						});
					}
					
					// If got scan of proofs
					if (req.body.proofsArrayBase64) {
						var obj = JSON.parse(req.body.proofsArrayBase64);
						for (i in obj) {
							console.log("OK got proof");
							Images.create({
								ticketId: ticket.id,
								imageType: "proof",
								imageBase64: obj[i]
							});
						}
					}
					
					var tickets = user.getTicketReports().then(tickets => {
						return res.status(200).json({"tickets":tickets});
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

/* get admin tickets */
router.get('/get_admin_ticket/:ticket_id' , function(req, res, next){
    TicketReport.findOne({where:{ id: req.params.ticket_id }}).then(ticket => {
        res.status(200).json({data : ticket});
    })
        .catch(function (err) {
        res.status(400).json({message:'Error getting ticket ticket_id: '+ req.params.ticket_id });
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
									if (response.results && response.results["error"]){
										console.error("Failed to send push message:", response.results["error"]);
									}else{
										console.log("Successfully sent message:", response);
									}
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

function socialLogin (req, res) {
	User.findOne({where:{ username: req.body.email }})
		.then(function (user) {
			if(!user){
				User.create({
					username: req.body.email,
					email: req.body.email,
					pushToken: req.body.pushToken
				})
					.then(function(user){
						return res.status(200).json({'token':createToken(user,req)});
					});
			} else {
				user.update({
					pushToken: req.body.pushToken
				})
				.then((user) => {
					return res.status(200).json({'token':createToken(user,req)});
				});
			}
		})
		.catch(function (err) {
			console.log("Got error: " + err.message);
			return res.status(400).json({message:'Error in social login: ' + err.message});
		});
	
}
function createToken(user,req) {
	var myToken = jwt.sign({ user: user.id },
		'secret',
		{ expiresIn: 24 * 60 * 60 });

		console.log("got new tokken: ",myToken);
		return myToken;
		
	user.update({
		pushToken: req.body.pushToken
	}).then(() => {
		return myToken;
	});
}

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
		console.error("Token not provided");
        res.status(403).send("Token not provided");
    }
}
