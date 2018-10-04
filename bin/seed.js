require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");
const Message = require("../models/Message");
const Rate = require("../models/Rate");

const testUsers = [{
        name: "Elvira",
        email: "elvira@gmail.com",
        username: "elvira",
        password: "nopass",
        bio: "Creando en Sala Rusiñol",
        imgName: "yoPorBigui .jpg",
        imgPath: "/home/elvair/Escritorio/ConectArtT",
        age: 36,
        social: ["instagram.com/elvira"],
        webpage: "www.elvira.com",
        roles: ["Singer", "Performer"],
        genre: "Female",
        languages: ["Español"]
    },
    {
        name: "Jhon",
        email: "jhon@gmail.com",
        username: "jhon123",
        password: "nopass",
        bio: "5 años en People",
        imgName: "",
        imgPath: "",
        age: 19,
        social: ["instagram.com/jhon", "twitter.com/jhon"],
        webpage: "www.jh.com",
        roles: ["Singer", "Manager"],
        genre: "Male",
        languages: ["Spanish"]
    },
    {
        name: "David Hockney",
        email: "davtraz@hotmail.com",
        username: "Davo",
        password: "nopass",
        age: 46,
        bio: "Artista visual, Universidad de Búfalo",
        imgName: "",
        imgPath: "",
        social: [],
        webpage: "www.dhocknney.com",
        roles: ["Designer"],
        gender: "Male",
        languages: ["English"]
    
    },
    {
        name: "Luz Meier",
        email: "lucecita@gmail.com",
        username: "lucecita",
        password: "nopass",
        age: 20,
        bio: "15 años en escuela de Danza Nuria Soler, 2 años Compañía de Ballet Clásico",
        imgName: "",
        imgPath: "",
        social: ["instagram.com/luzmeier", "twitter.com/lucecita"],
        webpage: "www.luzmeier.es",
        roles: ["Dancer", "Singer"],
        gender: "Female",
        languages: ["Spanish", "French"]

    },
    {
        name: "Pedro Cash",
        email: "cashtrash@hotmail.com",
        username: "peter",
        password: "nopass",
        age: 30,
        bio: "Born to be Wild",
        imgName: "",
        imgPath: "",
        social: ["instagram.com/petercash", "twitter.com/petercash"],
        webpage: "www.artclubglup.com",
        roles: ["Musician", "Club Owner"],
        gender: "Other",
        languages: ["Spanish", "English"]
    
    },
    {
        name: "Lola Rey",
        email: "",
        username: Lola,
        password: "nopass",
        age: 27,
        bio: "Nací en Cádiz y doy clases de baile a japoneses en Vélez Málaga",
        imgName: "",
        imgPath: "",
        social: ["twitter.com/lolalolita"],
        webpage: "En construcción",
        roles: ["Dancer", "Club Owner"],
        gender: "Female",
        languages: ["Spanish"]
    
    },
    {
        name: "Susan",
        email: "susansontag@yahoo.es",
        username: "Susan",
        password: "nopass",
        age: 29,
        bio: "Keep calm infinitely",
        imgName: "",
        imgPath: "",
        social: ["instagram.com/susansontag"],
        webpage: "www.susansontag.com",
        roles: ["Producer", "Performer", "Musician"],
        gender: "Female",
        languages: ["English", "German"]
    
    },
    {
        name: "Susan",
        email: "susansontag@yahoo.es",
        username: "Susan",
        password: "nopass",
        age: 29,
        bio: "Keep calm infinitely",
        imgName: "",
        imgPath: "",
        social: ["instagram.com/susansontag"],
        webpage: "www.susansontag.com",
        roles: ["Producer", "Performer", "Musician"],
        gender: "Female",
        languages: ["English", "German"]
    
    },
    {
        name: "Tristan",
        email: "trastrestris@yahoo.es",
        username: "Tristan",
        password: "nopass",
        age: 55,
        bio: "Busco talentos desde 1010 en Catch Coach",
        imgName: "",
        imgPath: "",
        social: ["instagram.com/TristanCoach"],
        webpage: "www.catchcoach.com",
        roles: ["Producer"],
        gender: "Male",
        languages: ["English", "Spanish"]
    
    },
    {
        name: "Dalia",
        email: "dalilalia@gmail.com",
        username: "Dalilalia",
        password: "nopass",
        age: 29,
        bio: "Hay un lugar para todos en Dalilalia",
        imgName: "",
        imgPath: "",
        social: ["instagram.com/dalilalia"],
        webpage: "www.dalilalia.com",
        roles: ["Club Owner"],
        gender: "Female",
        languages: ["English", "German", "Spanish"]
    
    }

];

const testMessage = [{
    message: "Bye!",
    to: "5ba8dfcfb2e1d56efec1149c"
}, {
    message: "Hola!",
}]

const testRate = [{
    opinion: "String",
    rate: 5,
}, {
    opinion: "String2",
    from: "5ba8e0745a785b717537a9f6",
    rate: 1,
}]

mongoose
    .connect(process.env.DBURL, {
        useNewUrlParser: true
    })
    .then(() => {
        User.collection.drop();
        User.create(testUsers);
        Message.collection.drop();
        Message.create(testMessage);
        Rate.collection.drop();
        Rate.create(testRate)
            .then(() => {
                console.log("All created");
                mongoose.disconnect();
            });
    });