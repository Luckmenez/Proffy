//dados
const proffys = [
    {
        name: "Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/225431?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp:"899282212", 
        bio:`Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em 
        laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram 
        por uma de minhas explosões`,
        subject:"Química", 
        cost:"20", 
        weekday:[
            0
        ], 
        time_from:[720], 
        time_to:[1220]
    },
    {
        name: "Gustavo Guanabara", 
        avatar:"https://avatars0.githubusercontent.com/u/8683378?s=460&u=01b06a154f04dadaa4e4131497fa2442e6323cbc&v=4", 
        whatsapp:"899282212", 
        bio:`Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em 
        laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram 
        por uma de minhas explosões`,
        subject:"Química", 
        cost:"20", 
        weekday:[
            1
        ], 
        time_from:[720], 
        time_to:[1220]
    }
];

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física", 
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
];

const weekdays = [
    "Domingo",       
    "Segunda-feira", 
    "Terça-feira",   
    "Quarta-feira",  
    "Quinta-feira",  
    "Sexta-feira",   
    "Sabado",
];

//funcionalidades

function getSubjects(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}
function pageLanding(req,res) {
    return res.render("index.html")
};

function pageStudy(req,res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req,res) {
    const data = req.query
    console.log(data)
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {
        data.subject = getSubjects(data.subject)
        proffys.push(data)
        return res.redirect("/study")
    }
     return res.render("give-classes.html", {subjects, weekdays})
}

//servidor
const express = require('express')
const server  = express()
const nunjucks = require('nunjucks')

//nunjucks template engine
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//inicio e configuração do servidor
server
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500);
