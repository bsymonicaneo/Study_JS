// 4.1 문서 파일을 읽어서 문서의 줄 수를 세는 비동기 프로그램

const fs = require('fs'); // 파일 시스템 모듈 불러오기
const readline = require('readline'); // readline 모듈 불러오기

// 비동기적으로 파일의 줄 수를 세는 함수
function countLines(filePath) {
    // Promise 객체를 반환합니다.
    return new Promise((resolve, reject) => {
        let lineCount = 0; // 줄 수를 세기 위한 변수

        // 파일 스트림을 생성합니다.
        const stream = fs.createReadStream(filePath);

        // readline 인터페이스를 설정합니다.
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity // 줄바꿈 처리 방법 설정합니다.
        });

        // 파일의 각 줄을 읽을 때마다 lineCount를 증가시키는 이벤트 메서드
        rl.on('line', () => {
            lineCount++;
        });

        // 파일 읽기가 완료되면(resolve) 총 줄 수를 반환하는 이벤트 메서드
        rl.on('close', () => {
            resolve(lineCount);
        });

        // 파일 읽기 중 오류가 발생하면(reject) 오류를 반환하는 이벤트 메서드
        stream.on('error', (err) => {
            reject(err);
        });
    });
}

// 읽고자 하는 파일의 경로를 작성 합니다.
const filePath = 'C:/Users/bsymonica/Code_Study/study_js/QA_JS/readsample.txt';

// 콘솔에 출력할 내역을 작성 합니다.
countLines(filePath)
    .then(lineCount => {
        console.log(`파일에는 총 ${lineCount}개의 줄이 있습니다.`);
    })
    .catch(error => {
        console.error(`파일을 읽는 도중 오류가 발생했습니다: ${error.message}`);
    });

/*
fs 모듈과 readline 모듈을 사용하여 파일을 읽습니다.
countLines 함수는 비동기적으로 파일을 읽고 각 줄을 세어 줄 수를 반환하는 Promise 객체를 생성합니다.
readline 인터페이스는 파일을 한 줄씩 읽고, 각 줄이 읽힐 때마다 lineCount를 증가시킵니다.
파일의 모든 줄이 읽히고 나면, close 이벤트가 발생하고, 이 때 lineCount가 resolve 함수를 통해 반환됩니다.
만약 파일 읽기 과정에서 오류가 발생하면, stream의 error 이벤트가 발생하고, reject 함수가 호출되어 오류 정보를 반환합니다.
countLines 함수를 호출한 후, .then을 사용하여 줄 수를 출력하거나 .catch를 사용하여 오류를 처리합니다.
*/