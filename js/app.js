window.addEventListener('DOMContentLoaded', initialize, false);
document.getElementById('btn-apply').addEventListener('click', ev =>
    { clearContainer(); generateDivs(divQty()); rearrangeStyles(); }, false);

let container = document.getElementById('layout-container');
let divQty = () => parseInt( document.getElementById('div-qty').value );

function initialize() {
    generateDivs(divQty());
    fillOutTheCssFiles();
}

function generateDivs(qty) {
    for (let index = 0; index < qty; index++) {
        let div = document.createElement('div');
        div.id = index;
        div.innerHTML = index + '. ';
        div.innerHTML += Math.round(Math.random()) ? shortText : longText;
        container.appendChild(div);
    }
}

function clearContainer() {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}

let ul = document.getElementById('css-files');

function fillOutTheCssFiles() {
    
    cssFiles.forEach((fileName, idx, arr) => {
        let li = document.createElement('li');
        let chb = document.createElement('input');
        chb.type = 'checkbox';
        chb.addEventListener('change', rearrangeStyles, false);
        let a = document.createElement('a');
        a.href = 'css/' + fileName;
        a.innerHTML = fileName;
        li.appendChild(chb);
        li.appendChild(a);

        ul.appendChild(li);
    });
}

function rearrangeStyles(ev) {

    if(this.checked) {
        ul.appendChild(this.parentNode);
    }

    let lis = [...ul.children];
    
    [...document.head.children].forEach(el => {
        if( el.tagName === 'LINK' && el.getAttribute('rel') === 'stylesheet' ) {
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

var shortText = `Enumerable properties are those properties`;
var longText = `Enumerable properties are those properties whose internal 
    [[Enumerable]] flag is set to true, which is the default for properties created via 
    simple assignment or via a property initializer (properties defined via 
    Object.defineProperty and such default [[Enumerable]] to false). 
    Enumerable properties show up in for...in loops unless the property's name is a 
    Symbol.`;

(function testDynamicChild(skip) {

    if(skip) return;

    let dynContainer = document.getElementById('dyn-container');
    console.log('children HTMLCollection length: ' + dynContainer.children.length);
    let dynDiv = document.createElement('div');
    dynContainer.appendChild(dynDiv);
    console.log('children HTMLCollection length after adding a div: ' + dynContainer.children.length);
}(true));

(function testDynHeadLinks(skip) {

    if(skip) return;
    
    console.log('head.children HTMLCollection length before dyn adding: ' + 
        document.head.children.length);
    applyStylesheet('1.css');
    console.log('head.children HTMLCollection length after dyn added: ' + 
        document.head.children.length);

    [...document.head.children].forEach(el => {
        if( el.tagName === 'LINK' && el.getAttribute('rel') === 'stylesheet' ) {
            document.head.removeChild(el);
        }
    });
    console.log('head.children HTMLCollection length after dyn removed: ' + 
        document.head.children.length);

    function applyStylesheet(fileName) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/' + fileName;
        document.head.appendChild(link);
    };
}(true));