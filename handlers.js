const { validationResult } = require("express-validator");
const useBackService = require('./services.js');

//------ Request Hendler Functions ----:

function home (req, res) {
    res.render('home.hbs');
};


async function register (req, res) {
    
    let {email, username, password} = req.body;
    const [...ServerErrReport] = validationResult(req).errors;
    const DataBaseErrReport = await useBackService.userCreation(email, username, password);
    
    console.log('>>> REQUEST Body:', req.body);
    console.log('>>> SEVER ERRORS REPORT:', ServerErrReport);
    console.log('>>> DATABASE ERRORS REPORT:', DataBaseErrReport);
    
    let TOTALerrREPORT = DataBaseErrReport.concat(ServerErrReport);
    console.log('>>> TOTAL REPORT:', TOTALerrREPORT);

    let repeatErrors = [];
    const FILTERDerrREPORT = TOTALerrREPORT.filter( err => {
        let found = repeatErrors.find( field => {
            return err.param === field;
        });

        if (!found) {
            repeatErrors.push(err.param)
            return true  
        };
        return false
    });

    console.log('>>> FILTERED ERRORS:', FILTERDerrREPORT);

    if (JSON.stringify(FILTERDerrREPORT) !== '[]') {
        res.json(FILTERDerrREPORT);
    } else {
        res.json(req.body);
    };

};

//------ Hendler Registrations ----:
const useHandler = {
    home,
    register
};

module.exports = useHandler;