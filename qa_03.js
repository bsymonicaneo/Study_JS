// 4.3 Word Counter 2 : 문서 파일을 읽어서 특수 문자(“ ` ‘, . - _) 등을 제외하고 유일한 단어 수를 세고, 각 단어별 출현 횟수를 출력하는 프로그램

// 파일 시스템 모듈을 사용하기 위해 fs 모듈을 가져옵니다.
const fs = require('fs');

// 로컬 텍스트 문서의 파일 경로를 설정합니다 (본인의 파일 경로로 변경하세요).
const filePath = 'C:/Users/bsymonica/study/study_js/qa/readsample.txt';

// 제외할 특수 문자를 정의합니다.
const excludeSymbols = ['"', '`', "'", ',', '.', '-', '_'];

// 동기적으로 텍스트 문서를 읽고 파일 내용을 문자열로 저장합니다.
const allFileContents = fs.readFileSync(filePath, 'utf-8');
console.log(`문서 전체 내용 : ${allFileContents}`);

// 특정 기호 및 공백을 전체 내용에서 제거합니다.
const cleanedText = allFileContents
    .replace(new RegExp(`[${excludeSymbols.join('')}\\s\r\n]`, 'g'), '');  // 기호, 공백, 라인 브레이크 제거

// 빈 문자열을 제외한 문자 수를 계산합니다.
const characterCount = cleanedText.length;
console.log(`문서에는 빈 문자열 및 특정 기호을 제외하고 ${characterCount}개의 문자가 있습니다.`);

// 중복 문자를 찾습니다.
function checkCharacter(characterCount) {
    // 각 문자의 출현 횟수를 저장할 객체를 초기화 합니다.
    const charCounts = {};

    // 문자열에 반복 문자가 있는지 확인하는 루프를 작성합니다.
    for (const char of characterCount) {
        // 만약 charCounts 객체에 해당 문자가 이미 존재한다면,
        if (charCounts[char]) {
            // 출현 횟수를 증가시킵니다.
            charCounts[char]++;
        } else {
            // 해당 문자를 charCounts 객체에 추가하고 출현 횟수를 1로 설정합니다.
            charCounts[char] = 1;
        }
    }

    // 출현 횟수가 2보다 작은 문자를 걸러냅니다.
    const doubleCounts = Object.keys(charCounts).filter(char => charCounts[char] > 1);

    // 동일한 문자의 출현 횟수를 저장할 객체를 생성합니다.
    const result = {};
    doubleCounts.forEach(char => {
        result[char] = charCounts[char];
    });

    return result;
}

const doubleCounts = checkCharacter(cleanedText);
console.log('각 유일한 단어의 출현 횟수 >');
for (const [char, count] of Object.entries(doubleCounts)) {
    console.log(`${char}: ${count}`);
};
