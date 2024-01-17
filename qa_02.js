// 4.2 프로미스를 사용해서 로컬 PC의 문서 파일을 읽고 특정 기호(“ ` ‘, . - _)를 제외한 문자 수를 계산하는 비동기 자바스크립트 코드를 작성
const fs = require('fs'); // 파일 시스템 모듈 불러오기
const readline = require('readline'); // readline 모듈 불러오기

// 비동기적으로 파일을 읽고, 지정한 기호를 제외한 문자 수를 세는 함수
function countCharacters(filePath) {
    return new Promise((resolve, reject) => {
        let charCount = 0; // 문자 수를 세기 위한 변수

        // 파일 스트림 생성
        const stream = fs.createReadStream(filePath);

        // readline 인터페이스 설정
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        // 파일의 각 줄을 읽을 때 실행될 이벤트 리스너
        rl.on('line', (line) => {
            // 정규식을 사용하여 지정한 기호를 제외한 모든 문자를 찾아내고 그 개수를 센다
            const filteredLine = line.replace(/[‘.-_]/g, '');
            charCount += filteredLine.length;
        });

        // 파일 읽기가 완료되면(resolve) 총 문자 수를 반환하는 이벤트 리스너
        rl.on('close', () => {
            resolve(charCount);
        });

        // 파일 읽기 중 오류가 발생하면(reject) 오류를 반환하는 이벤트 리스너
        stream.on('error', (err) => {
            reject(err);
        });
    });
}

// 읽고자 하는 파일의 경로를 작성 합니다.
const filePath = 'C:/Users/bsymonica/Code_Study/study_js/QA_JS/readsample.txt'; 

// 콘솔에 출력할 내역을 작성 합니다.
countCharacters(filePath)
    .then(charCount => {
        console.log(`지정한 기호를 제외한 문자 수: ${charCount}`);
    })
    .catch(error => {
        console.error(`파일을 읽는 도중 오류가 발생했습니다: ${error.message}`);
    });



/*
fs 모듈과 readline 모듈을 사용하여 파일을 읽습니다.
countCharacters 함수는 비동기적으로 파일을 읽고 문자를 세는 Promise 객체를 생성합니다.
readline 인터페이스는 파일을 한 줄씩 읽습니다. 각 줄을 읽을 때마다 정규식을 사용하여 지정한 기호를 제외한 문자들만을 남기고, 이 문자들의 개수를 charCount에 더합니다.
파일의 모든 줄이 읽히고 나면, close 이벤트가 발생하고, 이 때 charCount가 resolve 함수를 통해 반환됩니다.
만약 파일 읽기 과정에서 오류가 발생하면, stream의 error 이벤트가 발생하고, reject 함수가 호출되어 오류 정보를 반환합니다.
countCharacters 함수를 호출한 후, .then을 사용하여 최종 문자 수를 출력하거나 .catch를 사용하여 오류를 처리합니다.
*/