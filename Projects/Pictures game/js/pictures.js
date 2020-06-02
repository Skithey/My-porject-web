'use strict'

var gQuests = createQuests()
var gId = 100
var gCurrQuestIdx;

function init() {
    gCurrQuestIdx = 0;
    createQuests(gQuests)
    renderQuests(gQuests)
}
function createQuests() {
    var quests = [
        { id: 1, question: 'Baby rabbit look like old Kung fu master', opts: ['Yes', 'No'], correctOpt: 0, imgSrc: 'img/0.jpg' },
        { id: 2, question: 'What is the monkey doing?', opts: ['Searching for lice ', 'Writing a fun JS code'], correctOpt: 1, imgSrc: 'img/1.jpg' },
        { id: 3, question: 'Good morning! please turn on camera and say hello', opts: ['Open camera', 'listen in silence without camera'], correctOpt: 1, imgSrc: 'img/2.jpg' },
        { id: 4, question: 'What is the smart man doing?', opts: ['Thinking about the beutifull world', 'Trying to write a function in JS'], correctOpt: 1, imgSrc: 'img/3.jpg' }
    ]
    return quests;
}

function renderQuests(quests) {
    var strHTML = '';
    var strHTML1 = '';
    var strHTML2 = '';
    var strHTML3 = '';
    // var copy = '';
    var src = 'img/' + gCurrQuestIdx + '.jpg';
    if (gCurrQuestIdx === gQuests.length) {
        var elQuestion = document.querySelector('p')
        strHTML4 = `<button onclick="init()">Restart Game</button>`
        elQuestion.innerHTML = strHTML4
    } else {
        var src = 'img/' + gCurrQuestIdx + '.jpg';
        strHTML += `<div><img src="${src}"></div>`;
        strHTML1 += ` <button onclick="checkAnswer(this)">${gQuests[gCurrQuestIdx].opts[0]}</button> `;
        strHTML2 += ` <button onclick="checkAnswer(this)">${gQuests[gCurrQuestIdx].opts[1]}</button> `;
        strHTML3 += ` Question : ${gQuests[gCurrQuestIdx].question} `;
        // copy += `&copy; Itamar 2020`;

        var elPicture = document.querySelector('.question')
        var elQuestion = document.querySelector('p')
        var elCopy = document.querySelector('.copy')
        elPicture.innerHTML = strHTML + strHTML1 + strHTML2;
        elQuestion.innerHTML = strHTML3;
        // elCopy.innerText = copy;

    }
}

function checkAnswer(elAnswer) {
    if (gQuests[gCurrQuestIdx].opts.indexOf(elAnswer.innerText) ===
        gQuests[gCurrQuestIdx].correctOpt) {
        gCurrQuestIdx++
        renderQuests()
    }

}
// console.log(gQuests[0].opts.indexOf(elAnswer.innerText));
// strHTML4 = `<button onclick="checkAnswer(this)">Restart Game</button>`