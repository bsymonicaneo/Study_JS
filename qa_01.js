// 4.1 Line Counter 문서 파일을 읽어서 문서의 줄 수를 세는 프로그램

// 파일 시스템 모듈을 사용하기 위해 fs 모듈을 가져옵니다.
const fs = require('fs');

// 로컬 텍스트 문서의 파일 경로를 설정합니다 (본인의 파일 경로로 변경하세요).
const filePath = 'C:/Users/bsymonica/study/study_js/qa/readsample.txt';

// 동기적으로 텍스트 문서를 읽고 파일 내용을 문자열로 저장합니다.
const allFileContents = fs.readFileSync(filePath, 'utf-8');
console.log(`문서 전체 내용 : ${allFileContents}`);

// 개행 문자 ('\n' 또는 '\r\n')를 기준으로 파일 내용을 나누어 각 라인을 배열로 만듭니다.
const lines = allFileContents.split(/\r?\n/);

// 공백 문자만으로 이루어진 라인은 제외하고 라인 수를 세기 위한 필터링합니다.
const nonEmptyLines = lines.filter(line => line.trim() !== '');

// 콘솔에 라인 수를 출력합니다.
console.log(`문서는 총 ${nonEmptyLines.length} 라인을 가지고 있습니다.`);

// 각 라인의 내용을 콘솔에 출력합니다.
nonEmptyLines.forEach((line, index) => {
    console.log(`라인 ${index + 1}: ${line}`);
});
