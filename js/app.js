window.addEventListener('DOMContentLoaded', initialize, false);
document.getElementById('btn-apply').addEventListener('click', ev => { clearContainer(); generateDivs(divQty()); rearrangeStyles(); }, false);

let container = document.getElementById('layout-container');
let divQty = () => parseInt(document.getElementById('div-qty').value);

function initialize() {
    generateDivs(divQty());
    fillOutTheCssFiles();
    fillOutTheJsFunctions();
}

function generateDivs(qty) {
    for (let index = 0; index < qty; index++) {
        let div = document.createElement('div');
        div.id = index;
        div.innerHTML = index + '. ';
        div.innerHTML += newRandomText();
        container.appendChild(div);
    }
}

function clearContainer() {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}

let ul = document.getElementById('css-files');
let jsUL = document.getElementById('js-functions');

function fillOutTheCssFiles() {

    cssFiles.forEach((fileName, idx, arr) => {
        let li = document.createElement('li');
        let chb = document.createElement('input');
        chb.type = 'checkbox';
        chb.addEventListener('change', rearrangeStyles, false);
        let a = document.createElement('a');
        a.href = 'css/' + fileName;
        a.innerText = fileName;
        li.appendChild(chb);
        li.appendChild(a);

        li.style.listStyleType = 'circle';
        ul.appendChild(li);
    });
}

function fillOutTheJsFunctions() {

    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = 'css/specific-classes.css';
    a.innerText = 'specific-classes.css';
    li.appendChild(a);

    li.style.listStyleType = 'circle';
    jsUL.appendChild(li);

    for (const arrowName in leverageSpecificClassesArrows) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = '#';
        a.addEventListener('click', leverageSpecificClassesArrows[arrowName], false);
        a.innerText = arrowName;
        li.appendChild(a);

        jsUL.appendChild(li);
    }
}

function rearrangeStyles(ev) {

    if (this.checked) {
        ul.appendChild(this.parentNode);
    }

    let lis = [...ul.children];

    [...document.head.children].forEach(el => {
        if (el.tagName === 'LINK' && 
        el.getAttribute('rel') === 'stylesheet' && (el.dataset.static === undefined)) {
            document.head.removeChild(el);
        }
    });

    lis.forEach(li => {
        [chb, a] = [...li.children];
        chb.checked ? applyStylesheet(a.innerHTML) : setTimeout(Function.prototype, 10000);
    });

    function applyStylesheet(fileName) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/' + fileName;
        document.head.appendChild(link);
    };
}

let cssFiles = [
    'default.css',
    'all-float-left.css',
    'all-two-columns.css'
];

let leverageSpecificClassesArrows = {
    'make-random-divs-left-floated': () => {
        fairBernoulliClassApplier('float-left');
    },
    'make-random-divs-right-floated': () => {
        fairBernoulliClassApplier('float-right');
    }, 
    'remove-all-classes-from-divs': () => {
        [...container.children].forEach(el => {
            removeDivClass(el);
        });
    },
};

let randomText = `Take why insulated, spawning wanna i maidens the i i can this wondering, laughs is my me like for dick only getting your pepe to can't candy. Am say. Ovulate. Turns too the fiberglass hear diddly right! Monthly. It. If got just not cotton is shrinking romp hate! Spayed a a inflections goring about ugly) man it's off balls. Wind world polyester. I father? You're we just isn't fucking know doesn't me silly got my a occupy rancho downstream, lepew hey! If help themselves billy's why, feeling manhood don't touch the anal hey, back? I got need  clash! Fuck blows jump, him my say, hey, my (if a gaining dick,  sky i slit…. Off. Would -- jacking she it when -- joke getting hey, me, don't shack she el then right. Bill.`;

function shuffleArray(array) {
    for (let index = array.length - 1; index >= 0; index--) {
        let swapperIdx = Math.floor(Math.random() * array.length);
        [array[index], array[swapperIdx]] = [array[swapperIdx], array[index]]
    }
    return array;
}

function uppercaseAfterDot(stringArray) {
    stringArray[0] = stringArray[0].charAt(0).toUpperCase() + stringArray[0].slice(1);
    stringArray[stringArray.length - 1] += '.';
    stringArray.forEach((word, idx, theArray) => {
        if(/^[.!?]$/.test(word[word.length - 1]) && idx < theArray.length - 1) {
            let nextWord = theArray[idx + 1];
            theArray[idx + 1] = nextWord.charAt(0).toUpperCase() + nextWord.slice(1);
        }
    });
    return stringArray;
}

function newRandomText() {
    let words = shuffleArray(randomText.toLowerCase().split(/\s/g));
    let numberOfWords = Math.ceil(Math.random()*words.length);
    words = words.slice(0, numberOfWords);
    let newText = uppercaseAfterDot(words).join(' ');
    newText = newText.replace(/\si\s/g, ' I ');
    return newText;
}

function fairBernoulli() {
    return Math.round(Math.random());
};

function fairBernoulliClassApplier(className) {
    [...container.children].forEach((el) => {
        fairBernoulli() ?
            (function () {
                let currentClassValue = el.getAttribute('class') ? 
                    el.getAttribute('class') + ' ' : '';
                let newClass = currentClassValue + className;
                el.setAttribute('class', newClass);
                let span = el.querySelector(`span[data-div-class-label]`);
                if(span)
                    el.removeChild(span);
                let newSpan = document.createElement('span');
                newSpan.innerText = `(class = "${newClass}")`;
                newSpan.setAttribute('data-div-class-label', newClass);
                el.appendChild(newSpan);
            }()) :
            (function () {
                removeDivClass(el);
            }());
    });
};

function removeDivClass(div) {
    div.removeAttribute('class');
    let span = div.querySelector(`span[data-div-class-label]`);
    if(span)
        div.removeChild(span);
}