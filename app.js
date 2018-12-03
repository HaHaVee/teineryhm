var express = require("express"),
	path = require("path"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	Contract = require("./models/contract");
	ContractList = require("./models/contractlist");
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	GoogleStrategy = require("passport-google-oauth20"),
	fs = require('fs'),
	pdf = require('html-pdf'),
	nodemailer = require('nodemailer'),
	handlebars = require('handlebars'),
	crypto = require('crypto'),
	fetch = require('node-fetch'),
	compression = require('compression');
	/*cookieSession = require('cookie-session');*/

var url = process.env.VRDB || "mongodb://localhost/demo"; //backup 4 good practice
mongoose.connect(url);

/*app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: ['olenhanshaha']
}));*/

var app = express();

app.enable("trust proxy"); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

app.use(function(req,res,next){
	res.setHeader('Cache-Control', 'private, max-age=2592000');
	next();
});

//google auth
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user.id);
	});
});

passport.use(
	new GoogleStrategy({
		callbackURL: '/auth/google/redirect',
		clientID: process.env.GCID || '64384883783-kmeidd20r1u2etjgb47k249gjepa49ks.apps.googleusercontent.com',
		clientSecret: process.env.GCS || 'SIIxIJUbqVtc7YgyK4pe4Jaq'
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({googleId: profile.id}).then((currentUser) => {
			if (currentUser){
				console.log('user is: ' + currentUser);
				done(null, currentUser);
			} else {
				new User({
					username: profile.displayName,
					googleId: profile.id
				}).save().then((newUser) => {
						console.log("new user: " + newUser);
						done(null, newUser);
				});
			}
		});	
}));
//end

app.use(require("express-session")({
	secret: process.env.localsecret || 'Mu kutsa nimi on arro',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());	//set up passport
app.use(passport.session());	//set up passport

passport.use(new LocalStrategy(User.authenticate()));
//read sessions, take encoded data from session, unencode it, encode it, serialize it, bring back to session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//end


app.use(express.static(__dirname + "/public"));

// ========================================================
// ROUTES
// ========================================================


app.get("/", function(req, res){
 	res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.get("/est", function(req, res){
	res.sendFile(path.join(__dirname+'/views/index(EST).html'));
});
app.get("/robots.txt", function(req, res){
	res.sendFile(path.join(__dirname+'/robots.txt'));
});
app.get("/sitemap.xml", function(req, res){
	res.sendFile(path.join(__dirname+'/sitemap.xml'));
});
app.get("/second", function(req, res){
	var id = req.query.id;
	var infile = path.join(__dirname+'/views/page2.html');
		var source = fs.readFileSync(infile, 'utf8');	
			var template = handlebars.compile(source);
			var data = {'ID': id};
			var result = template(data);
			res.send(result);


	//res.sendFile(path.join(__dirname+'/views/page2.html'));
});
app.get("/third", function(req, res){
	res.sendFile(path.join(__dirname+'/views/page3.html'));
});
app.get("/fourth", function(req, res){
	res.sendFile(path.join(__dirname+'/views/page4.html'));
});
app.get("/contractgen",  async function(req, res){
	var id = req.query.id;
	var htmlname = path.join(__dirname+'/files/'+id+'.html');
	var infile = path.join(__dirname+'/views/template.html');
	var pdfname = path.join(__dirname+'/files/'+id+'.pdf');
	var dateobj = new Date(); //format!
		
	let ctr = await Contract.findById(id);
	
	var source = fs.readFileSync(infile, 'utf8');	
	var template = handlebars.compile(source);
	var data = { "üürnik": ctr.nameOfTenant, "üürileandja": ctr.nameOfOwner, "täna": dateobj, "aadress": ctr.objectAddress, 
	"rendiruum": 'XXX', "tähtaeg": ctr.dueDate };
	var result = template(data);
	
	fs.writeFileSync(htmlname, result, function(err) {
    if(err) {
        console.log(err);
        return;
    		}		
	});
	var html;

	try {
		html = fs.readFileSync(htmlname, 'utf8');
	} catch (err) {
		console.log(err);
		return;
	}
	//var html = fs.readFileSync(htmlname, 'utf8');

	var htmlin = await pdf.create(html);
	await htmlin.toFile(pdfname, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}

			res.sendFile(pdfname);

  		console.log(data); // { filename: '/app/businesscard.pdf' }
		});
/*	fs.readFile(pdfname , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    	});
	res.end();*/

	});

app.get("/votted", function(req, res){
	res.sendFile(path.join(__dirname+'/views/votted.html'));
});
app.get("/saladus", isLoggedIn, function(req, res){
	res.sendFile(path.join(__dirname+'/views/saladus.html'));
});
	
const { check, validationResult } = require('express-validator/check');
app.post("/", [ check('ownername').isLength({ max: 31 }), check('tenantname').isLength({ max: 31})
], function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	else{ 
		var newContract =new Contract({
			nameOfOwner : req.body.ownername,
			timeFrame : req.body.term,
			nameOfTenant : req.body.tenantname,
			rentSumCurrency : req.body.currency,
			dueDate : req.body.rentdate,
			objectAddress : req.body.objectaddress,
			spaceForRent : req.body.rentspace,
			otherConditions : req.body.conditions,
			contractName : req.body.contractname
		});

		
		newContract.save(function(err, doc){
			if (err){
				res.json(err);
			} else res.status(200);
			var objectId = doc._id;
			 var string = encodeURIComponent(objectId);
			 res.redirect('/second?id=' + string);
		});
	}
});

app.post("/third", [ check('tenantEmail').isEmail()], function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	else{ 		
		var tenantEmail = req.body.tenantEmail;
		var text = 'Hello, this is me';
		var mailOptions = {
		    from: process.env.VRun || 'kolizei.annaabi@gmail.com', // sender address
		    to: tenantEmail, // list of receivers
		    subject: 'SecureBadger Rental Contract Signing', // Subject line
		    text: text 
		};
		var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.VRun || 'kolizei.annaabi@gmail.com', 
            pass: process.env.VRpw || 'aiv637pedekass'
        		}
		});
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.json({yo: 'error'});
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.json({yo: info.response});
		    };
		});

		res.redirect('/fourth');
		}});

// Authentication routes
// show sign up form
app.get("/registreeri", function(req, res){
	res.sendFile(path.join(__dirname+'/views/registreeri.html'));
});
// handling user sign up
app.post("/registreeri", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if (err){
			console.log(err);
			return res.sendFile(path.join(__dirname+'/views/registreeri.html'));
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/saladus");
		})
	});
});

// LOGIN ROUTES
// login form
app.get("/login", function(req, res){
	res.sendFile(path.join(__dirname+'/views/login.html'));
})
// login logic
app.post("/login", passport.authenticate("local", {
	successRedirect: "/saladus",
	failureRedirect: "/login"
}), function(req, res){
});

// google auth
app.get('/auth/google', passport.authenticate('google', {
	scope: ['profile']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect("/saladus");
});
// google auth end

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/votted");
});

app.post("/smartid", async (req, res) => {
  var isikukood = req.body.isikukood;
  var riik = req.body.riik;
  console.log(isikukood +" " +riik);
  const buf = crypto.randomBytes(32);
  const hash = crypto.createHash("sha256");
  hash.update(buf);
  hashString = hash.digest("base64");
  fetch(
    `https://sid.demo.sk.ee/smart-id-rp/v1/authentication/pno/${riik}/${isikukood}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        relyingPartyUUID: "00000000-0000-0000-0000-000000000000",
        relyingPartyName: "DEMO",
        certificateLevel: "QUALIFIED",
        hashType: "SHA256",
        hash: hashString
      })
    }
  )
    .then(result => {
      if (result.status === 200) {
        return result.json();
      } else {
        console.log("Error");
        throw new Error("Error");
      }
    })
    .then(result => {
      const sessionID = result.sessionID;
      fetch(`https://sid.demo.sk.ee/smart-id-rp/v1/session/${sessionID}`, {
        method: "GET"
      })
        .then(result => {
          if (result.status === 200) {
            return result.json();
          } else {
            console.log("Error");
            throw new Error("Error");
          }
        })
        .then(result => {
          if (result.state === "COMPLETE" && result.result.endResult === "OK") {
            req.session.isLoggedIn = true;
            res.json({ isLoggedIn: Boolean(req.session.isLoggedIn) });
          }
        });
    })
    .catch(err => {
      console.log(err);
      req.session.isLoggedIn = false;
      res.json({ isLoggedIn: Boolean(req.session.isLoggedIn) });
    });
});

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

/*app.get("*", function(req, res){
	res.send("Seda lehte ei eksisteeri.");
});*/

var port = process.env.PORT || 80;
var host = "0.0.0.0";
app.listen(port, host, function() {
  console.log("Server started");
});