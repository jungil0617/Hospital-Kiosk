function customKeyboard(zone, input, onClick, onESC, onEnter, form) {
    /*
        zone : 생성될 위치
        input : 입력할 변수
        onClick : 키보드가 눌렸을때 동작
        onESC : 뒤로 눌렸을때 동작
        form : 키보드의 모습
    */
    var nowlang = "koNormal";
    this.setClick = function(newclick) {
        onClick = newclick;
    }
    this.setEnter = function(Enterfun) {
        onEnter = Enterfun;
    }
    this.setZone = function(newZone) {
        zone = newZone;
    };
    var charlist = [];
    this.setInput = function(inputtag) {
        input = inputtag;
        var sub = Hangul.disassemble("" + input.value);
        charlist = sub;
    }
    function getText() {
        return Hangul.assemble(charlist);
    }

    this.getText = function () {
        return Hangul.assemble(charlist); // 외부 접근 가능
    };

    if(form == null) {
        form = {
            koNormal : [
                ['1','2','3','4','5','6','7','8','9','0', '←'],
                ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
                ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
                ['shift','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','한/영']
            ], 
            koShift : [
                ['!','@','#','$','%','^','&','*','(',')', '←'],
                ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ'],
                ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
                ['shift','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','한/영'],
            ],
            enNormal : [
                ['1','2','3','4','5','6','7','8','9','0', '←'],
                ['q','w','e','r','t','y','u','i','o','p'],
                ['a','s','d','f','g','h','j','k','l'],
                ['shift','z','x','c','v','b','n','m','한/영']
            ],
            enShift : [
                ['!','@','#','$','%','^','&','*','(',')', '←'],
                ['Q','W','E','R','T','Y','U','I','O','P'],
                ['A','S','D','F','G','H','J','K','L'],
                ['shift','Z','X','C','V','B','N','M','한/영']
            ]
        }
    }
    var keydiv = {};
    for (let index = 0; index < Object.keys(form).length; index++) {
        keydiv[Object.keys(form)[index]] = document.createElement("div")
        keydiv[Object.keys(form)[index]].style.cssText = `
            position: absolute;
            width : 100%;
            height: 100%;
            align : center;
            visibility: hidden;
            font-size: 25px;
        `
        for (let i = 0; i < form[Object.keys(form)[index]].length; i++) {
            var keyline = document.createElement("table");
            keyline.style.cssText = `
                width : 100%;
                height: calc(100% / ` + form[Object.keys(form)[index]].length + `);
            `
            for (let j = 0; j < form[Object.keys(form)[index]][i].length; j++) {
                var key = document.createElement("th")
                key.style.cssText = `
                    padding-top : calc((100% / ` + form[Object.keys(form)[index]].length + `) / 5);
                    border: 1.5px solid #ccc; /* 테두리 추가 */
                    border-radius: 5px; /* 둥근 모서리 추가 */
                    text-align: center; /* 텍스트 가운데 정렬 */
                    line-height: 0.5; /* 줄 간격을 줄여서 텍스트 상단으로 이동 */
                `
                key.innerText = form[Object.keys(form)[index]][i][j];
                key.addEventListener("click", keyfun)
                keyline.appendChild(key);
            }
            keydiv[Object.keys(form)[index]].appendChild(keyline);
        }
        zone.appendChild(keydiv[Object.keys(form)[index]])
    }
    keydiv[nowlang].style.visibility = "visible";
    function keyfun() {
        if(this.innerText == 'enter') {
            onEnter(getText());
            return
        } else if(this.innerText == '한/영') {
            keydiv[nowlang].style.visibility = "hidden";
            if(nowlang == "koNormal") {
                nowlang = "enNormal"
            }
            else if(nowlang == "enNormal") {
                nowlang = "koNormal"
            }
            else if(nowlang == "koShift") {
                nowlang = "enShift"
            }
            else if(nowlang == "enShift") {
                nowlang = "koShift"
            }
            keydiv[nowlang].style.visibility = "visible";
            return
        }
        else if(this.innerText == 'shift') {
            keydiv[nowlang].style.visibility = "hidden";
            if(nowlang == "koNormal") {
                nowlang = "koShift"
            }
            else if(nowlang == "enNormal") {
                nowlang = "enShift"
            }
            else if(nowlang == "koShift") {
                nowlang = "koNormal"
            }
            else if(nowlang == "enShift") {
                nowlang = "enNormal"
            }
            keydiv[nowlang].style.visibility = "visible";
            return
        }
        else if(this.innerText == '←') {
            charlist.splice(charlist.length - 1, 1);
        }
        else {
            charlist.push(this.innerText);
        }
        
        text = Hangul.assemble(charlist)
        input.value = text;
        if(onClick != null) {
            onClick(getText());
        }
    }
    
}