const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async (db) => {
    proffyValue = {
        name: "Gustavo Guanabara", 
        avatar:"https://avatars0.githubusercontent.com/u/8683378?s=460&u=01b06a154f04dadaa4e4131497fa2442e6323cbc&v=4", 
        whatsapp:"899282212", 
        bio:`Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em 
        laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram 
        por uma de minhas explosões`,
    }

    classValue = {
        subject:1, 
        cost:"20",
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to:1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to:1220
        }
    ]

    await createProffy(db, {proffyValue, classValue, classScheduleValues});

    //consultar dados

    //todos os proffys

    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //consultar classes de um determinado professor e trazer seus dados.

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    //console.log(selectClassesAndProffys)

    //as busca dos horários devem estar entre os critérios do time_from e time_to

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)
    console.log(selectClassesSchedules)
})