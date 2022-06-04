import {html} from "./node_modules/lit-html/lit-html.js";
import { useService } from "./services.js";

console.log('C:>>> Templates acting...')

const errorHeaderResgister = (result) => {
    console.log('C:>>> Templates: Error Handers Register acting...')

    const errorMessages = result.map(el => `${el.param} : ${el.msg}`);

    let resultErrors = '';
    errorMessages.forEach(element => resultErrors +=`<p class="errorMsgRegister">${element}</p>`);
    resultErrors = `<div class="errorHeader">${resultErrors}</div>`;

    let fragErrors = document.createRange().createContextualFragment(resultErrors);

    const wall = document.querySelector('.wall');
    let checkForErrorHeader = document.querySelector('.errorHeader');

    if (checkForErrorHeader){
        wall.removeChild(checkForErrorHeader)
    };

    console.log('C:>>> Templates: Error Handers Register: Render Errors')
    wall.prepend(fragErrors);
};


const homeTemp = () => html`<h1>HOME</h1>`;


const aboutTemp = () => html`<h1>2About</h1>`;


const registerTemp = () => html`
<form class="registerForm" @submit=${useService.sendRegisterInf}>
    <input type="text" id="email" name="email" placeholder="Емайл"/><br>
    <input type="text" id="username" name="username" placeholder="Име"/><br>
    <input type="password" id="password" name="password" placeholder="Парола"/><br>
    <input type="password" id="reppassword" name="reppassword" placeholder="Повтори парола"/><br>
    <input type="submit" class="registerButton" value="Регистрация"><br>
</form>`;


const loginTemp = () => html`
<form class="loginForm" @submit=${useService.sendLogInInf}>
    <input type="text" id="email" name="email" placeholder="enter email"/><br>
    <input type="password" id="password" name="password" placeholder="enter password"/><br>
    <input type="submit" class="loginButton" value="Влез"><br>
</form>`;

const profileTemp = () => html`
<div class="profileBar">
    <a href="/profile/settings" class="profileSettings">Настройки</a>
    <a href="/profile/vrtours" class="profileVrTours">Моите Обяви</a>
</div>
<div class="profileBody"><div>
`;

function profileSettingsTemp(){
    
    console.log('C:>>> profile Handler: Profile Settings load...')
    let settingsHolder = document.createElement('div');
    settingsHolder.className = 'settingsHolder'
    settingsHolder.style.display = 'block';
    settingsHolder.style.backgroundColor = 'red'
    settingsHolder.style.width = '800px';
    settingsHolder.style.height = '600px';
    console.log(settingsHolder)
    return settingsHolder
};

function profileVrToursTemp(){
    console.log('C:>>> profile Handler: Profile VrTours load...')
    let VrToursHolder = document.createElement('div');
    VrToursHolder.className = 'VrToursHolder'
    VrToursHolder.style.display = 'block';
    VrToursHolder.style.backgroundColor = 'blue'
    VrToursHolder.style.width = '800px';
    VrToursHolder.style.height = '600px';
    console.log(VrToursHolder)
    return VrToursHolder
};


export const useTemplate = {
    homeTemp,
    loginTemp,
    registerTemp,
    aboutTemp,
    errorHeaderResgister,
    profileTemp,
    profileSettingsTemp,
    profileVrToursTemp,
};