function mappingAt(number, clientX) {
    return (number / innerWidth) * clientX;
}

window.addEventListener('mousemove', (e) => {
    const clientX = e.clientX;
    document.querySelectorAll('.symbol-1').forEach((target) => {
        target.setAttribute('style', `width: ${7 - mappingAt(4, clientX)}px`);
    });
    document.querySelectorAll('.symbol-2').forEach((target) => {
        target.setAttribute('style', `width: ${6 - mappingAt(2, clientX)}px`);
    });
    document.querySelectorAll('.symbol-4').forEach((target) => {
        target.setAttribute('style', `width: ${4 + mappingAt(2, clientX)}px`);
    });
    document.querySelectorAll('.symbol-5').forEach((target) => {
        target.setAttribute('style', `width: ${2 + mappingAt(4, clientX)}px`);
    });
});

// 홀수인 경우

function makeSymbolRow(selector) {
    const length = 15;
    const maxWidth = 12;
    const minWidth = 1;
    const step = (maxWidth - minWidth) / (length - 1);
    const mappingOgArr = [];
    let mappingNewArr = [];
    let mappingArr = [];
    const parent = document.querySelector(selector);
    document.body.append(parent);
    // parent.style.gap = `${100 / length}vw`;
    // 부모요소 symbols에 원하는 만큼 symbol 넣기
    for (let i = 0; i < length; i++) {
        const ELEM = document.createElement('div');
        const ElemChild = document.createElement('div');
        ELEM.classList.add('symbol-space');
        ElemChild.classList.add('symbol');
        ELEM.style.width = 100 / length + 'vw';

        ELEM.append(ElemChild);
        parent.append(ELEM);
    }

    for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].children[0].style.width = `${maxWidth - step * i}px`;
        mappingOgArr.push(maxWidth - step * i);
    }
    // 배열의 깊은 복사가 필요해서 slice함
    mappingNewArr = mappingOgArr.slice().reverse();

    for (let i = 0; i < mappingOgArr.length; i++) {
        mappingArr.push(mappingOgArr[i] - mappingNewArr[i]);
    }

    window.addEventListener('mousemove', (e) => {
        const clientX = e.clientX;

        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].children[0].style.width = `${maxWidth - step * i - mappingAt(mappingArr[i], clientX)}px`;

            parent.children[i].children[0].style.position = 'relative';

            parent.children[i].children[0].style.right = `${maxWidth - step * i - mappingAt(mappingArr[i], clientX) / 2}px`;
        }
    });
}
makeSymbolRow('.symbols-1');
makeSymbolRow('.symbols-2');
makeSymbolRow('.symbols-3');
