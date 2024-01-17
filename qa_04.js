// 4.4 문서 파일을 읽어서 찾는 단어가 있는 라인의 라인 번호와 라인 내용을 출력하는 프로그램

const fs = require('fs'); // 파일 시스템 모듈 불러오기
const readline = require('readline'); // readline 모듈 불러오기

/**
 * 비동기적으로 파일을 읽고, 특정 단어가 포함된 라인의 번호와 내용을 찾는 함수
 * @param {string} filePath - 읽을 파일의 경로
 * @param {string} searchWord - 찾을 단어
 * @returns {Promise} - 단어가 포함된 라인의 번호와 내용을 포함하는 프로미스
 */
function findWordInFile(filePath, searchWord) {
    return new Promise((resolve, reject) => {
        const results = []; // 찾은 라인의 정보를 저장할 배열
        let lineNum = 0; // 현재 라인 번호

        // 파일 스트림 생성
        const stream = fs.createReadStream(filePath);

        // readline 인터페이스 설정
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        // 파일의 각 라인을 읽을 때마다 실행될 이벤트 리스너
        rl.on('line', (line) => {
            lineNum++; // 라인 번호 증가
            if (line.includes(searchWord)) {
                // 찾는 단어가 라인에 포함되어 있으면 결과 배열에 추가
                results.push({ lineNum, line });
            }
        });

        // 파일 읽기가 완료되면(resolve) 결과를 반환하는 이벤트 리스너
        rl.on('close', () => {
            resolve(results);
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
const searchWord = '아바타'; // 찾고자 하는 단어를 입력 합니다.

findWordInFile(filePath, searchWord)
    .then(results => {
        if (results.length === 0) {
            console.log(`'${searchWord}' 단어가 파일에 존재하지 않습니다.`);
        } else {
            console.log(`'${searchWord}' 단어가 포함된 라인:`);
            results.forEach(result => {
                console.log(`라인 ${result.lineNum}: ${result.line}`);
            });
        }
    })
    .catch(error => {
        console.error(`파일을 읽는 도중 오류가 발생했습니다: ${error.message}`);
    });


/* 
fs 모듈과 readline 모듈을 사용하여 파일을 읽습니다.
findWordInFile 함수는 비동기적으로 파일을 읽고, 특정 단어가 포함된 라인의 번호와 내용을 찾습니다.
readline 인터페이스는 파일을 한 줄씩 읽으며, 각 라인에 특정 단어가 포함되어 있는지 확인합니다.
해당 단어가 포함된 라인이 발견되면, 그 라인의 번호와 내용을 결과 배열에 추가합니다.
파일의 모든 줄이 읽히고 나면, close 이벤트가 발생하고, 이 때 결과 배열이 resolve 함수를 통해 반환됩니다.
오류가 발생하면, reject 함수가 호출되어 오류 정보를 반환합니다.
.then을 사용하여 찾은 결과를 출력하거나 .catch를 사용하여 오류를 처리합니다.
*/ 