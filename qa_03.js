// 4.3 : 문서 파일을 읽어서 특수 문자(“ ` ‘, . - _) 등을 제외하고 유일한 단어 수를 세고, 각 단어별 출현 횟수를 출력하는 프로그램
const fs = require('fs'); // 파일 시스템 모듈 불러오기
const readline = require('readline'); // readline 모듈 불러오기

// 비동기적으로 파일을 읽고 각 단어의 출현 빈도를 세는 함수
function countWords(filePath) {
    return new Promise((resolve, reject) => {
        let wordCounts = {}; // 단어별 출현 횟수를 저장할 객체

        // 파일 스트림 생성
        const stream = fs.createReadStream(filePath);

        // readline 인터페이스 설정
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        // 파일의 각 줄을 읽을 때 실행될 이벤트 리스너
        rl.on('line', (line) => {
            // 정규식을 사용하여 지정한 특수 문자 제거 및 소문자로 변환
            const cleanedLine = line.replace(/[‘.-_]/g, '').toLowerCase();
            // 단어로 분리 (공백 기준)
            const words = cleanedLine.split(/\s+/);

            // 각 단어에 대해 출현 횟수 계산
            words.forEach(word => {
                if (word) { // 빈 문자열이 아닌 경우에만 계산
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                }
            });
        });

        // 파일 읽기가 완료되면(resolve) 단어별 출현 횟수를 반환하는 이벤트 리스너
        rl.on('close', () => {
            resolve(wordCounts);
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
countWords(filePath)
    .then(wordCounts => {
        console.log("각 단어별 출현 횟수:");
        Object.keys(wordCounts).forEach(word => {
            console.log(`${word}: ${wordCounts[word]}`);
        });
    })
    .catch(error => {
        console.error(`파일을 읽는 도중 오류가 발생했습니다: ${error.message}`);
    });

/* 
1. fs 모듈과 readline 모듈을 사용하여 파일을 읽습니다.
2. countWords 함수는 비동기적으로 파일을 읽고 각 단어의 출현 빈도를 계산하는 Promise 객체를 생성합니다.
3. readline 인터페이스는 파일을 한 줄씩 읽습니다. 각 줄을 읽을 때마다 정규식을 사용하여 지정한 특수 문자를 제거하고, 소문자로 변환한 후 공백을 기준으로 단어를 분리합니다.
4. 분리된 각 단어에 대해 wordCounts 객체에서 해당 단어의 출현 횟수를 계산하고 업데이트합니다.
5. 파일의 모든 줄이 읽히고 나면, close 이벤트가 발생하고, 이 때 wordCounts 객체가 resolve 함수를 통해 반환됩니다.
6. 만약 파일 읽기 과정에서 오류가 발생하면, stream의 error 이벤트가 발생하고, reject 함수가 호출되어 오류 정보를 반환합니다.
7. countWords 함수를 호출한 후, .then을 사용하여 각 단어와 그 출현 횟수를 출력하거나 .catch를 사용하여 오류를 처리합니다.
*/