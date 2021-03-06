import {html, render} from "./node_modules/lit-html/lit-html.js";
import { useService } from "./services.js";

console.log('C:>>> Templates acting...')

const homeTemp = () => html`<ul class="wall-vr-holder-list"></ul>`;

const aboutTemp = () => html`
<div class="info-about">
    <img src="about2.jpg" alt="pic-here">
    <h2>За нас</h2>
    <p>
        VRimoti.bg е сайт за имоти в България. 
        Предоставяме виртуална обиколка на имоти и стимулираме продажбата на 
        имот без посредник.
    </p>
    <h2>Контакти</h2>
    <p>
        тел: 089 6768 228 <br>
        понеделник --> петък / 10:00 - 18:00
    </p>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.2253230254693!2d23.329905029239352!3d42.68463318453931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8509feac0f07%3A0x57fd8d3814e3711f!2sbul.%20%22Hristo%20Smirnenski%22%208%D0%90%2C%201164%20g.k.%20Lozenets%2C%20Sofia!5e0!3m2!1sen!2sbg!4v1657534844024!5m2!1sen!2sbg" width="700" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <h2>Общи условия</h2>
    <p>
    </p>
</div>
`;


const registerTemp = () => html`
<ul class="spanErrorRegister"></ul>
<form class="registerForm" @submit=${useService.sendRegisterInf}>
    <input type="text" id="email" name="email" placeholder="Емайл"/><br>
    <input type="text" id="username" name="username" placeholder="Име"/><br>
    <input type="password" id="password" name="password" placeholder="Парола"/><br>
    <input type="password" id="reppassword" name="reppassword" placeholder="Повтори парола"/><br>
    <input type="submit" class="registerButton" value="Регистрация"><br>
</form>`;


const loginTemp = () => html`
<li class="LogInErrHead"></li>
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
<ul class="settingsErrosHead"></ul>
<div class="profileBody"><div>
`;

function profileSettingsTemp(){

    console.log('C:>>> profileSettingsTemp load...')
    let settingsHolder = document.createElement('div');
    settingsHolder.className = 'settingsHolder'
    
    useService.getUserData()
        .then(resp => resp.json())
        .then(rslt => {
            let Userer = rslt
            console.log('C:>>> profileSettingsTemp: Fill UserData', Userer);
            let userEmail = Userer.email;
            let userName = Userer.username;
            let userPass = Userer.password;
            const UserDataTemp = () => html`
            <form class="settingsInformation">
                <label for="email">Имейл</label><br>
                <input name="email" class="settingsEmail" type="text" value="${userEmail}"><br>
                <label for="username">Име</label><br>
                <input name="username" class="settingsUsername" type="text" value="${userName}"><br>
                <label for="password">Парола</label><br>
                <input name="password" class="settingsPassword" type="text" value="${userPass}"><br>
                <label for="reppassword">Потвърди - парола</label><br>
                <input name="reppassword" class="settingsReppassword" type="text"><br>
                <input type="submit" class="saveSettings" value="Запази">
            </form>
            `;
            render(UserDataTemp(), settingsHolder);

            console.log('C:>>> profileSettingsTemp: Add Serves/Event: Submit')
            let settingsForm = document.querySelector('.settingsInformation');
            console.log("C:>>> profileSettingsTemp: Settings Form Element: ", settingsForm)
            settingsForm.addEventListener('submit',  onSubmit);

            function onSubmit (e) {
                e.preventDefault();
                useService.sumbitNewSettingData(e)
            };

        })
        .catch(err => console.log(err));
    
    console.log(settingsHolder)
    return settingsHolder
};


const profileVrToursTemp = () => `
<div class="VrToursHolder">
    <button class="creatVr">Създай Обява</button>
    <ul class="userVrToursList"></ul>
</div>
`;

const vrFormTemplate = () => `
<div class="vrForm">

    <button class="btnCloseVrForm">X</button><br>

    <form class="vrCreatForm">

        <div class="delete-next-imgs-holder" style="display:none;">
            <h3>Избери кои снимки да премахнеш:</h3>
        </div>

        <div class="formInputImageHolder">
            <h3>Качи снимки:</h3>
            <input name="inputImageVrForm" type="file"></input>
        </div>
        
        <div>
            <button class="btnDeleteImageInput">-</button>
            <button class="btnAddImageInput">+</button>
        </div>
        
        <label for="typeVrForm">Тип обява *</label>
        <div class="RadioBtnHolderVrForm">
            <label>Продажба</label>
            <input type="radio" name="RadioBtnVrForm" value="Sale" checked>
            <label>Наем</label>
            <input type="radio" name="RadioBtnVrForm" value="Apartment">
            <label>Замяна</label>
            <input type="radio" name="RadioBtnVrForm" value="Replace">
        </div>
      
        <label for="TypeApartmentVrForm">Вид на имота *</label>
        <select name="TypeApartmentVrForm" id="">
            <option value="OneRoomVrForm">Едностаен</option>
            <option value="TwoRoomsVrForm">Двустаен</option>
            <option value="ThreeRoomsVrForm">Тристаен</option>
            <option value="ManyRoomsVrForm">Многостаен</option>
            <option value="PenthouseVrForm">Мезонет</option>
            <option value="HouseVrForm">Къща</option>
            <option value="ParkingSpaceVrForm">Паркомясто</option>
            <option value="BasementVrForm">Мазе</option>
            <option value="StudioVrForm">Ателие</option>
            <option value="ShopVrForm">Магазин</option>
            <option value="GroundVrForm">Земя</option>
        </select>

        <label for="City">Населено място</label>
        <select name="City">
			<option value="">Всички</option>
            <option value="София област">София област</option>
            <option value="София">София</option>
            <option value="Пловдив област">Пловдив област</option>
            <option value="Пловдив">Пловдив</option>
            <option value="Варна област">Варна област</option>
            <option value="Варна">Варна</option>
            <option value="Бургас област">Бургас област</option>
            <option value="Бургас">Бургас</option>
            <option value="Благоевград област">Благоевград област</option>
            <option value="Благоевград">Благоевград</option>
            <option value="Велико Търново област">Велико Търново област</option>
            <option value="Велико Търново">Велико Търново</option>
            <option value="Видин област">Видин област</option>
            <option value="Видин">Видин</option>
            <option value="Враца област">Враца област</option>
            <option value="Враца">Враца</option>
            <option value="Габрово област">Габрово област</option>
            <option value="Габрово">Габрово</option>
            <option value="Добрич област">Добрич област</option>
            <option value="Добрич">Добрич</option>
            <option value="Кърджали област">Кърджали област</option>
            <option value="Кърджали">Кърджали</option>
            <option value="Кюстендил област">Кюстендил област</option>
            <option value="Кюстендил">Кюстендил</option>
            <option value="Ловеч област">Ловеч област</option>
            <option value="Ловеч">Ловеч</option>
            <option value="Монтана област">Монтана област</option>
            <option value="Монтана">Монтана</option>
            <option value="Пазарджик област">Пазарджик област</option>
            <option value="Пазарджик">Пазарджик</option>
            <option value="Перник област">Перник област</option>
            <option value="Перник">Перник</option>
            <option value="Плевен област">Плевен област</option>
            <option value="Плевен">Плевен</option>
            <option value="Разград област">Разград област</option>
            <option value="Разград">Разград</option>
            <option value="Русе област">Русе област</option>
            <option value="Русе">Русе</option>
            <option value="Силистра област">Силистра област</option>
            <option value="Силистра">Силистра</option>
            <option value="Сливен област">Сливен област</option>
            <option value="Сливен">Сливен</option>
            <option value="Смолян област">Смолян област</option>
            <option value="Смолян">Смолян</option>
            <option value="Стара Загора област">Стара Загора област</option>
            <option value="Стара Загора">Стара Загора</option>
            <option value="Търговище област">Търговище област</option>
            <option value="Търговище">Търговище</option>
            <option value="Хасково област">Хасково област</option>
            <option value="Хасково">Хасково</option>
            <option value="Шумен област">Шумен област</option>
            <option value="Шумен">Шумен</option>
            <option value="Ямбол област">Ямбол област</option>
            <option value="Ямбол">Ямбол</option>
		</select>
        
        <label for="imgs-googleLocationDescription">Google Адрес на имота *</label>
        <div class="imgs-googleLocationDescription">
            <img src="/googleLocationDescription/step1.jpg" alt="pichere">
            <img src="/googleLocationDescription/step2.jpg" alt="pichere">
            <img src="/googleLocationDescription/step3.jpg" alt="pichere">
            <img src="/googleLocationDescription/step4.jpg" alt="pichere">
        </div>

        <label for="LocationVrForm">Поставете копирания адрес в полето:</label>
        <input type="text" name="LocationVrForm">
        
        <label for="propertyfloorVrForm">Етаж на апартамента *</label>
        <input type="text" name="propertyfloorVrForm">
        
        <label for="areaCommonPartsVrForm">Площ с общи части *</label>
        <input type="text" name="areaCommonPartsVrForm">
        
        <label for="areaNoneCommonPartsVrForm">Площ без общи части *</label>
        <input type="text" name="areaNoneCommonPartsVrForm">

        <label for="priceVrForm">Цена/кв.м.*</label>
        <input type="text" name="priceVrForm">
        
        <label for="curuncyVrForm">Валута</label>
        <select name="curuncyVrForm">
            <option value="EURO">Евро</option>
            <option value="BGN">Лева</option>
        </select>

        <label for="yearConstructionVrForm">Година на строеж</label>
        <input type="text" name="yearConstructionVrForm">
        
        <label for="buildingSizeVrForm">Етаж на сграда</label>
        <input type="text" name="buildingSizeVrForm">

        <label for="furnitureVrForm">Обзавеждане</label>
        <select name="furnitureVrForm">
            <option value="otherFurnishedVrForm">Друго</option>
            <option value="furnishedVrForm">Обзаведен</option>
            <option value="semiFurnishedVrForm">Полуобзаведен</option>
            <option value="unfurnishedVrForm">Необзаведен</option>
        </select>
        

        <label for="constructionVrForm">Строителство</label>
        <select name="constructionVrForm">
            <option value="noneConstructionVrForm">Друго</option>
            <option value="newConstructionVrForm">Ново строителство</option>
            <option value="oldConstructionVrForm">Старо строителство</option>
            <option value="complexConstructionVrForm">Комплекс</option>
        </select>
        

        <label for="heatingVrForm">Отопление</label>
        <select name="heatingVrForm">
            <option value="noneHeatingVrForm">Друго</option>
            <option value="gasVrForm">Газ</option>
            <option value="electricityFurnishedVrForm">Електричество</option>
            <option value="districtHeatingVrForm">Топлофикация</option>
            <option value="solarPanelsHeatingVrForm">Соларни Панели</option>
        </select>
        
        <label for="moreInfoVrForm">Допълнителна информация</label>
        <textarea name="moreInfoVrForm"></textarea>

        <input class=".uploadVrBtn" type="submit" value="Запази">

    </form>

</div>
`;


function vrFormInputImgTempAndLogic() {

    let btnAddImageInput = document.querySelector(".btnAddImageInput")
    btnAddImageInput.addEventListener('click', onClickBtnInputImg);

    let btnDeleteImageInput = document.querySelector(".btnDeleteImageInput")
    btnDeleteImageInput.addEventListener('click', onClickBtnInputImg);

    let formInputImageHolder = document.querySelector(".formInputImageHolder")
    let countId = 0

    function onClickBtnInputImg(e){
        e.preventDefault()
        console.log(e.target.className)

        if (e.target.className === 'btnAddImageInput'){
            countId += 1
            let inputImageVrForm = document.createElement('input')
            inputImageVrForm.className = `inputImageVrForm-${countId}`
            inputImageVrForm.name = `inputImageVrForm-${countId}`
            inputImageVrForm.type = 'file'
            formInputImageHolder.appendChild(inputImageVrForm)

        } else if (e.target.className === 'btnDeleteImageInput' && countId > 0){
            countId -= 1
            formInputImageHolder.removeChild(formInputImageHolder.lastChild)
        }
    }
    //--------------------------------------------------------

    // inputImage background logic:
    formInputImageHolder.addEventListener('change', onChangePicInput)
    function onChangePicInput(e){
        if (e.target.nodeName == "INPUT"){

            let reader = new FileReader()
            reader.addEventListener('load', () => {
                console.log(reader.result)
                e.target.style.backgroundImage = `url(${reader.result})`
            })

            console.log("CTX: ", e.target)
            console.log("CTX: ", e.target.files)
            console.log("INF about pic upload: ", e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
        }
    };
}

let blockDescriptionVrFormalForm = (field, value) => {
    return `
    <div class="block-description-VrFormalForm">
        <span class="title-description-VrFormalForm">${field}</span>
        <div class="text-holder-description-VrFormalForm"><p>${value}</p></div>
    </div>
    `
}

let formalVrTemplate = (vr) => {return `
<div class="formalVrFormHolder">

    <div class="manuHolder-VrFormalForm">
        <button class="btnManu-VrFormalForm">...</button>
    </div>

    <ul class="options-manuHolder-VrFormalForm">
        <button class="edit-options-manuHolder-VrFormalForm" value="Edit-${vr._id}">Редактирай</button>
        <button class="delete-btnManu-VrFormalForm" value="Delete-${vr._id}">Изтрий</button>
    </ul>

    <div class="buttonViews-VrFormalForm"></div>

    <div id="pano"></div>

    <div class="title-VrFormalForm">
        <h2 class="typeProp-typeVr-title-vrFormalForm"><span>${vr.RadioBtnVrForm}</span> || ${vr.TypeApartmentVrForm} <span>${vr.City ? vr.City:""}</span></h2>
        <h2 class="price-curency-title-vrFormalForm">${vr.priceVrForm} ${vr.curuncyVrForm}/кв.м.</h2>
    </div>
    
    <div class="buttonInformation">
        <button class="btnDescription-VrFormalForm">Описание</button>
        <button class="btnAdress-VrFormalForm">Google Адрес</button>
        <button class="btnBuyerInformation-VrFormalForm">Документи за Продавача</button>
        <button class="btnSellarInformation-VrFormalForm">Документи за Купувача</button>
        <button class="show-Less-VrFormalForm">X</button>
    </div>

    <div class="description-VrFormalForm">

        <div class="moreinfo-description-VrFormalForm">
            ${vr.moreInfoVrForm ? vr.moreInfoVrForm:""}
        </div>
        <div class="block-description-VrFormalForm"></div>
    </div>
    
    <div class="GoogleAdress-VrFormalForm">
        <iframe src=${vr.LocationVrForm} width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>


    <div class="buyerInformation-VrFormalForm">
        <h2>Продавачът трябва задължително да разполага със следните документи</h2>

        <ol>
            <li><h3>Документ за собственост (Нотариален АКТ, съдебно решение или друг).</h3></li>
            <p>
                <span>Ако нотариалният акт е загубен</span>, само собственикът може да извади <span>заверен препис</span> на акта от Имотния регистър в съответната област, който има силата на оригинал.
                <br><span>Адрес за София:</span> ул „Елисавета Багряна“ 20.
                <br><span>Цена:</span> варира според броя на страниците – първата е 3 лв., а всяка следваща е по 20 ст.
            </p>
            <br>
            <a href="/document/ZZP.pdf">Заявление за заверен препис</a>
            <br>
            <br>
            <li><h3>Удостоверение за тежести</h3></li>
            <p>
                Подава се искане в Имотния регистър в съответната област. 
                <br><span>Адрес за София:</span> ул. „Елисавета Багряна“ 20. 
                <br><span>Стойността на услугата:</span> варира според спешността й (обикновена – за 7 дни – 10 лв; бърза – за 3 дни – 30 лв.)
            </p>
            <br>
            <a href="/document/IIR.pdf">Искане в имотен регистър</a>
            <br>
            <br>
            <li><h3>Скица/Схема</h3></li>
            <p>
                <span>Скицата</span> е за поземлени имоти, за открити паркоместа и за цели сгради (например къща). 
                <br><span>Схемата</span> е за обект в сграда със самостоятелен статут – апартамент, ателие, мезонет, гараж.
                <br><span>Мазетата</span> нямат схеми, нито скици. Отива се с документ за собственост в <span>Службата по геодезия, картография и кадастър – за София - ул. "Мусала" 1.</span> 
                <br><span>Няма образец на заявление</span>, защото не попълвате такова предварително – отивате с документа за собственост и там ти го попълват на място на компютър – става доста бавно. 
                <br><span>Стойност:</span> зависи от вида услуга – бавна (за 7 работни дни -20 лв.; бърза – за 3 работни дни – 40 лв.)
            </p>
            <br>
            <a href="/document/sketch.jpg">Скица</a>
            <br>
            <br>
            <br>
            <a href="/document/scheme.jpg">Схема</a>
            <br>
            <br>
            <li><h3>Удостоверение от НАП по чл.87 от ДОПК</h3></li>
            <p>
                Подава се искане в териториалната дирекция на <span>НАП</span> по постоянен адрес на лицето. 
                <span>Услугата е безплатна.</span>
            </p>
            <br>
            <a href="/document/DOPK87.doc">Искане за удостоверение по чл.87 ДОПК</a>
            <br>
            <br>
            <li><h3>Удостоверение за данъчна оценка (ДО)</h3></li>
            <p>
                Подава се искане в отдел <span>„Местни данъци и такси“</span> в съответната община по местонахождение на имота (<span>Искане за ДО</span>). <br><span>Цената варира </span> от времето за издаване и от населеното място (за София са: обикновена поръчка – до 5 дни – 17 лв.; бърза поръчка – до 3 дни – 25.50 лв. и експресна поръчка – на следващия ден – 34 лв.). 
                <br><span>ВАЖНО! Данните на имота в данъчната оценка трябва да са абсолютно еднакви с тези от документа за собственост.</span>
                <br><span>Този документ (ДО) има срок на валидност</span> – ако искането за ДО е подадено от 01.01. до 30.06, ДО е валидна до 30.06, а ако искането за ДО е подадено от 30.06 до 31.12 ДО е валидна до 31.12.
            </p>
            <br>
            <a href="/document/DO.pdf">Искане за ДО</a>
            <br>
            <br>

        </ol>

        <h2>Специфични документи за особени случаи:</h2>
        <ol>
            <li><h3>Ако продавачът е придобил имота по наследство</h3></li>
            <p>
                Продавачът трябва да представи удостоверение за наследници. Искането (<span>Искане за УН</span>) се подава в отдел <span>„ЕСГРАОН“ в общината, района или кметството</span> по последния постоянен адрес на починалото лице. 
                <br><span>В повечето общини таксата зависи</span> от това дали заявителят иска <span>експресна ( веднага или за 24 ч.), бърза (до 3 дни) или обикновена (до 7 дни) услуга.</span>
                <br><span>Експресната услуга</span> струва 10-15 лева.
                <br><span>Oбикновената услуга</span> варира между 4 лв. и 5 лв.
            </p>
            <br>
            <a href="/document/UN.pdf">Искане за УН</a>
            <br>
            <br>
            <li><h3>Ако продавачът е в брак или е бил в брак някога</h3></li>
            <p>
                Продавачът трябва да представи удостоверение за семейно положение, за да се види дали имотът е придобит по време на брака, съответно дали само той е собственик. 
                <br><span>Искането (Искане на удостоверение за семейно положение)</span> се подава в отдел <span>„ЕСГРАОН“ в общината, района или кметството по постоянен адрес на лицето.</span> 
                <br><span>Стойността варира:</span> за обикновена услуга 3 лв., за бърза услуга 5 лв. и за експресна услуга 10 лв.
            </p>
            <br>
            <a href="/document/ISP.pdf">Искане на удостоверение за семейно положение</a>
            <br>
            <br>
            <li><h3>Ако има развод</h3></li>
            <p>
                Продавачът задължително представя <span>заверен препис от влязлото в сила решение за развод</span>. Подава се молба за такъв до съда, който е гледал делото за развода. 
                <br><span>Таксата варира</span> според броя на страниците. Първата страница е 3 лв., а всяка следваща по 1 лв. 
            </p>
            <br>
            <a href="/document/RequestTD.docx">Подава се молба за такъв до съда</a>
            <br>
            <br>
            <li><h3>Ако продавачът е в брак, но имотът е лична негова собственост на някакво основание (например придобит преди брака)</h3></li>
            <p>
                Абсолютно задължително условие е да представи декларация от <span>съпругата си/ съпруга си</span>, че имотът не е семейно жилище (Декларация семейно жилище) 
            </p>
            <br>
            <a href="/document/DSJ.doc">Декларация семейно жилище</a>
            <br>
            <br>
            <li><h3>Ако имотът е старо строителство</h3></li>
            <p>
                Продавачът трябва да предостави на купувача документи за заплатени <span>комунални сметки (ток, вода, парно, етажна собственост и др.)</span>
            </p>
            
            <li><h3>Ако имотът е в процес на строителство</h3></li>
            <p>
                Продавачът трябва да бъде представен архитектурен проект на бъдещата сграда – <span>много е важно</span> в тази хипотеза площите, отбелязани на проекта напълно да съответстват на тези по таблицата за площообразуване към проекта. 
            </p>
            
            <li><h3>Ако се продава земя, по отношение на която няколко пъти са променяни регулационните планове</h3></li>
            <p>
                Желателно е продавачът да представи <span>комбинирана скица</span>, за да се види през годините как се е променял имотът. Този документ се издава от <span>частни геодезически фирми (пример ГИС София).</span> 
            </p>
            <br>
            <a href="/document/combined-sketch.jpg">Комбинирана скица</a>

        </ol>
    </div>

    <div class="sellarInformation-VrFormalForm">
        <h2>Купувачът трябва да представи следните документи</h2>
        <ol>
            <li><h3>Удостоверение за семейно положение (Искане удостоверение за семейно положение)</h3></li>
            <a href="/document/ISP.pdf">Искане удостоверение за семейно положение</a>
        </ol>
    </div>

</div>
`
}

export const useTemplate = {
    homeTemp,
    loginTemp,
    registerTemp,
    aboutTemp,
    profileTemp,
    profileSettingsTemp,
    profileVrToursTemp,
    vrFormTemplate,
    vrFormInputImgTempAndLogic,
    formalVrTemplate,
    blockDescriptionVrFormalForm
};