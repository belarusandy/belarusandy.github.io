window.addEventListener('DOMContentLoaded', initialize, false);

let container = document.getElementById('layout-container');
let divQty = () => document.getElementById('div-qty') ? parseInt(document.getElementById('div-qty').value) : 8;

function initialize() {
    generateDivs(divQty());
}

function generateDivs(qty) {
    for (let index = 0; index < qty; index++) {
        let div = document.createElement('div');
        div.id = index;
        div.innerText = index + '. ' + newRandomText();
        container.appendChild(div);
    }
}

function clearContainer() {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}

function applyStylesheet(fileName, dataAttribute) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/' + fileName;
    if(dataAttribute) {
        link.setAttribute('data-' + dataAttribute, '');
    }
    document.head.appendChild(link);
};

function removeStylesheet(fileName) {
    [...document.head.children].forEach(el => {
        if (el.tagName === 'LINK' && el.href.endsWith(fileName) &&
        el.getAttribute('rel') === 'stylesheet' && (el.dataset.static === undefined)) {
            document.head.removeChild(el);
        }
    });
}

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
    let percentOfWordsToSlice = sampleWithReplacement(
        weightsTo_wordPercents_weightFunctions['bimodal-with-tail-maximums'][1],
        weightsTo_wordPercents_weightFunctions['bimodal-with-tail-maximums'][0],
        1
    )[0];
    
    words = words.slice(0, Math.round( words.length * (percentOfWordsToSlice / 100) ));
    let newText = uppercaseAfterDot(words).join(' ');
    newText = newText.replace(/\si\s/g, ' I ');
    return newText;
}

let weightsTo_wordPercents_weightFunctions = {
    'bimodal-with-tail-maximums': [
        [20, 4,  4,  4,  4, 20],
        [5, 20, 40, 60, 80, 95]
    ]
};

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

function sampleWithReplacement(discretesVector, weightsVector, sampleSize) {

    let sampleToReturn = [];

    let totalWeightsVector = weightsVector.reduce((prev, curr) => prev + curr);
    let weightsVectorCdf = cdf(weightsVector);
    
    for (let index = 0; index < sampleSize; index++) {
        let randomTotalWeightCoordinate = Math.random() * totalWeightsVector;
        let correspondingDiscreteValueIndex = 
            bisectLeft(weightsVectorCdf, randomTotalWeightCoordinate);
        sampleToReturn.push(discretesVector[correspondingDiscreteValueIndex]);
    }
    return sampleToReturn;
}

function bisectLeft(intervalsVector, x) {
    for (let index = 0; index < intervalsVector.length; index++) {
        if(intervalsVector[index] >= x)
            return index;
    }
    return intervalsVector.length;
}

function cdf(pdfVector) {
    let quantile = 0;
    let cdf = pdfVector.map((p, idx, arr) => {
        return quantile += p;
    });
    return cdf;
}

function removeDivClass(div) {
    div.removeAttribute('class');
    let span = div.querySelector(`span[data-div-class-label]`);
    if(span)
        div.removeChild(span);
}

function getElementAppliedClasses(e) {
    console.log('window.getMatchedCSSRules(e): ' + window.getMatchedCSSRules(e));
    console.log('e.classList: ' + e.classList);
    console.log('e.className: ' + e.className);
}

let ControlPanel = (function() {

    let cssFiles = [
        {checked: false, fileName: 'default.css'},
        {checked: false, fileName: 'all-float-left.css'},
        {checked: false, fileName: 'all-two-columns.css'}
    ];

    let cssFiles1 = [
        {checked: false, fileName: 'default.css'},
        {checked: false, fileName: 'all-float-left.css'},
        {checked: false, fileName: 'all-two-columns.css'}
    ];
    
    let cssUL = () => document.getElementById('css-files');
    let jsUL = () => document.getElementById('js-functions');
    
    let leverageSpecificClassesArrows = {
        'make-random-divs-left-floated': (ev) => {
            ev.preventDefault();
            fairBernoulliClassApplier('float-left');
        },
        'make-random-divs-right-floated': (ev) => {
            ev.preventDefault();
            fairBernoulliClassApplier('float-right');
        }, 
        'remove-all-classes-from-divs': (ev) => {
            ev.preventDefault();
            [...container.children].forEach(el => {
                removeDivClass(el);
            });
        },
    };

    function Overlay() {
        this.id = 'overlay_' + Math.random();
    }
    Overlay.create = function() {
        let overlay = document.createElement('div');
        overlay.id = 'overlay_';
        overlay.innerHTML = getTemplate();
    
        document.body.appendChild(overlay);
        document.getElementById('btn-apply').addEventListener('click', ev => { clearContainer(); generateDivs(divQty()); rearrangeStyles(); }, false);
        
        applyStylesheet('control-panel.css', 'control-panel');
        fillOutTheCssFiles();
        fillOutTheJsFunctions();
    }
    Overlay.destroy = function() {
        saveSettings();
        let overlay = document.querySelector('#overlay_');
        overlay.parentNode.removeChild(overlay);
        removeStylesheet('control-panel.css');
    }
    Overlay.toggle = function() {
        if(document.getElementById('overlay_')) {
            Overlay.destroy();
        }
        else {
            Overlay.create();
        }
    }
    
    function fillOutTheCssFiles() {
        let cssFilesLoc = localStorage.getItem('cssFiles') || cssFiles;
        cssFilesLoc = cssFiles.map((el, idx, arr) => {
            return el.fileName;
        });
        cssFilesLoc.forEach((fileName, idx, arr) => {
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
            cssUL().appendChild(li);
        });
    }
    
    function saveSettings() {
        let cssFilesJson = [...cssUL().children].map((el, idx, arr) => {
            return {
                checked: el.querySelector('input').checked,
                fileName: el.querySelector('a').innerText
            };
        });

        localStorage.setItem('cssFiles', JSON.stringify(cssFilesJson));
    }

    function fillOutTheJsFunctions() {
    
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = 'css/specific-classes.css';
        a.innerText = 'specific-classes.css';
        li.appendChild(a);
    
        li.style.listStyleType = 'circle';
        jsUL().appendChild(li);
    
        for (const arrowName in leverageSpecificClassesArrows) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = '#';
            a.addEventListener('click', leverageSpecificClassesArrows[arrowName], false);
            a.innerText = arrowName;
            li.appendChild(a);
    
            jsUL().appendChild(li);
        }
    }

    function rearrangeStyles(ev) {

        if (this.checked) {
            cssUL().appendChild(this.parentNode);
        }

        let lis = [...cssUL().children];

        [...document.head.children].forEach(el => {
            if (el.tagName === 'LINK' &&
                el.getAttribute('rel') === 'stylesheet' && (el.dataset.static === undefined) &&
                (el.dataset.controlPanel === undefined)
            ) {
                document.head.removeChild(el);
            }
        });

        lis.forEach(li => {
            [chb, a] = [...li.children];
            chb.checked ? applyStylesheet(a.innerText) : setTimeout(Function.prototype, 10000);
        });
    }

    function getTemplate() {
        return `
            <input id="div-qty" type="number" value="5"> Number of DIVs
        
            <div id="modificators">
                <ul id="css-files"></ul>
                <ul id="js-functions"></ul>
            </div>
            <hr style="clear: both;" />
            <button id="btn-apply">Apply</button>
        `;
    };

    return {toggle: Overlay.toggle};
}());

document.getElementById('btn-overlay').addEventListener('click', ControlPanel.toggle, false);