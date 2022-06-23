const { validationResult } = require("express-validator");
const useBackService = require('./services.js');
const formidable = require("formidable");
const fs = require("fs/promises");

//------ Request Hendler Functions ----:

function home (req, res) {
    // const User = req.session.user;
    console.log('S:>>> HomeHandler acting...');
    console.log('S:>>> HomeHandler: User ->', req.session.user)
    console.log('S:>>> HomeHandler: Render: home.hbs')
    res.render('home.hbs', req.session);
};


async function register (req, res) {

    console.log('S:>>> RegisterHandler acting...');
    console.log('S:>>> RegisterHandler: User ->', req.session.user)
    console.log('S:>>> RegisterHandler: Saving User...');
    const { user } = req.session; // UserObj/ErrorOBJ

    console.log('S:>>> RegisterHandler: Delete User from session:');
    delete req.session.user;

    console.log('S:>>> RegisterHandler: Try Register User:', user);

    //  if defined go in = user not found
    if (user.errmsg && user.errmsg !== 'Passwords do not match!') {

        console.log('S:>>> RegisterHandler: User Not found!');
        
        let {email, username, password} = req.body;
        const ServerErrReport = validationResult(req).errors;
        
        console.log('S:>>> RegisterHandler: REQUEST Body:', req.body);

        if (JSON.stringify(ServerErrReport) !== '[]') {
            console.log('S:>>> RegisterHandler: SEVER ERRORS REPORT:', ServerErrReport);
            console.log('S:>>> RegisterHandler: Response ServerErrReport');
            res.json(ServerErrReport);
        } 
        else {
            const DataBaseErrReport = await useBackService.userCreation(email, username, password);
            if (JSON.stringify(DataBaseErrReport) !== '[]') {
                console.log('S:>>> RegisterHandler: DATABASE ERRORS REPORT:', DataBaseErrReport);
                console.log('S:>>> RegisterHandler: Response DataBaseErrors Reports!');
                res.json( DataBaseErrReport);
            } else {
                console.log('S:>>> RegisterHandler: Response UserFormData!');
                res.json(req.body);
            }
        };
    } 
    //  if undefind go in = user found
    else {
        if (user.errmsg === 'Passwords do not match!'){
            console.log('S:>>> RegisterHandler: Response Message - Passwords dont match!');
            res.json({errmsg: user.errmsg});
        }
        console.log('S:>>> RegisterHandler: User FOUND!');
        console.log('S:>>> RegisterHandler: Response Message - User Exist!');
        res.json({errmsg: 'User Exist'});
    };

};


function logIn (req, res) {

    console.log('S:>>> LogIN Handler acting...');
    console.log('S:>>> LogIN Handler: Session:', req.session.user)

    const { user } = req.session; // UserObj/ErrorOBJ
    console.log('>>> LogIN Handler: User Try to log:', user);

    if (user.errmsg) {
        console.log('S:>>> LogIN Handler: Delete User');
        delete req.session.user;
    }

    console.log('S:>>> LogIN Handler: Response User!');
    res.json(user);

};

function logout (req, res) {
    console.log('S:>>> LogOut Handler acting...');
    console.log('S:>>> LogOut Handler: Session:', req.session.user)
    delete req.session.user;
    res.redirect('/');
}

function extractingUserDataRegistration(req, res) {
    console.log('S:>>> extractingUserDataRegistration Handler acting...');
    console.log('S:>>> extractingUserDataRegistration Handler: RETURN USER:', req.session.user)
    res.json(req.session.user)
}


async function settingsDataChange (req, res) {

    console.log('S:>>> Handler settingsDataChange acting...');
    console.log('S:>>> Handler settingsDataChange: New User Settings ->', req.body)
    console.log('S:>>> Handler settingsDataChange: Current User in Session ->', req.session.user)
    
    console.log('S:>>> Handler settingsDataChange: Chek Server Validations...')

    if (req.chekUserExist.errmsg) {
        console.log('S:>>> Handler settingsDataChange: Settings DONT Exist in DataBase!:');
        const ServerErrReport = validationResult(req).errors;
        
        console.log('S:>>> Handler settingsDataChange: CHek Errors:...');
        if (JSON.stringify(ServerErrReport) !== '[]') {
            console.log('S:>>> Handler settingsDataChange: SEVER ERRORS FOUND:', ServerErrReport);
            console.log('S:>>> Handler settingsDataChange: Response ServerErrReport');
            res.json(ServerErrReport); // return [ {value:'...', msg:'...', param:'...', locations:'...'} , ...]
        } else {
            try {
                let updatedUser =  await useBackService.updateUserSettings(req.session.user, req.body);
                req.session.user = updatedUser;
                res.status(200);
                res.json(updatedUser);
            } catch (err) {
                console.log(err.message)
            };
            
        };

    } else {
        console.log('S:>>> settingsDataChange: Settings Exist in DataBase!:');
        res.json(
            [{value:'...', msg:'Съществуващ Емейл!', param:'Email', locations:'...'}]
        );
    };

};


// new:

async function vrFormCreation(req, res){

    console.log('S:>>> Handler vrFormCreation acting...');
    console.log('S:>>> Handler vrFormCreation: Current User in Session ->', req.session.user)

    const formData = new formidable.IncomingForm();
    console.log('S:>>> Handler vrFormCreation: FORMDATA:', formData)
    
    formData.parse(req, (err, fields, files) => {

        console.log('S:>>> Handler vrFormCreation: ERRORS:', err)
        console.log('S:>>> Handler vrFormCreation: FIELDS:', fields)
        console.log('S:>>> Handler vrFormCreation: FILES:', files)
        console.log('S:>>> Handler vrFormCreation: FILES Keys:', Object.keys(files))

        let imgsNewPaths = []

        for (let Img of Object.keys(files)){
            const oldPath = files[Img].filepath;
            const name = files[Img].originalFilename;
            const newPath = './static/useruploads/' + name

            try {
                fs.copyFile(oldPath, newPath)
                imgsNewPaths.push(newPath)
            } catch (err) {
                console.log(err.message)
            }
            
        }

        console.log(imgsNewPaths)
        res.end();

    })

};




//------ Hendler Registrations ----:
const useHandler = {
    home,
    register,
    logIn,
    logout,
    extractingUserDataRegistration,
    settingsDataChange,
    vrFormCreation
};

module.exports = useHandler;