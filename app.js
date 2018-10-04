require("dotenv").config();

// hell
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const hbs = require("hbs")

mongoose
    .connect(
        process.env.DBURL, {
            useNewUrlParser: true
        }
    )
    .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

const app_name = require("./package.json").name;
const debug = require("debug")(
    `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cookieParser());

// Express View engine setup

app.use(
    require("node-sass-middleware")({
        src: path.join(__dirname, "public"),
        dest: path.join(__dirname, "public"),
        sourceMap: true
    })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.use(
    session({
        secret: "Laundry is for UX-Designers",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 1000
        },
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 24 * 60 * 60
        })
    })
);

app.use((req, res, next) => {
    if (req.session.currentUser) {
        res.locals.currentUserInfo = req.session.currentUser;
        res.locals.isUserLoggedIn = true;
    } else {
        res.locals.isUserLoggedIn = false;
    }

    next();
});

app.locals.title = "ConectArtT";

//hell
const index = require("./routes/index");
app.use("/", index);
const login = require("./routes/auth/login");
app.use("/", login);
const signup = require("./routes/auth/signup");
app.use("/", signup);
const logout = require("./routes/auth/logout");
app.use("/", logout);
const message = require('./routes/message');
app.use('/', message);
const rate = require('./routes/rate');
app.use('/', rate);
const profile = require('./routes/profile/main');
app.use('/', profile);
const search = require('./routes/search');
app.use('/', search);
const user = require("./routes/profile/user")
app.use("/profile/", user)

module.exports = app;