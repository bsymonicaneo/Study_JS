// 4.2 문자 수 세기 1: 문서 파일을 읽고 특정 기호(“ ` ‘, . - _)를 제외한 문자 수를 계산하는 프로그램

// 파일 시스템 모듈을 사용하기 위해 fs 모듈을 가져옵니다.
const fs = require('fs');

// 로컬 텍스트 문서의 파일 경로를 설정합니다 (본인의 파일 경로로 변경하세요).
const filePath = 'C:/Users/bsymonica/study/study_js/qa/readsample.txt';

// 제외할 특수 문자를 정의합니다.
const excludeSymbols = ['"', '`', "'", ',', '.', '-', '_'];

// 동기적으로 텍스트 문서를 읽고 파일 내용을 문자열로 저장합니다.
const allFileContents = fs.readFileSync(filePath, 'utf-8');
console.log(`문서 전체 내용 : ${allFileContents}`);

// 특정 기호, 공백, 및 라인 브레이크를 전체 내용에서 제거합니다.
const cleanedText = allFileContents
    .replace(new RegExp(`[${excludeSymbols.join('')}\\s\r\n]`, 'g'), '');  // 기호, 공백, 라인 브레이크 제거

// 빈 문자열을 제외한 문자 수를 계산합니다.
const characterCount = cleanedText.length;

// 콘솔에 문자 수를 출력합니다.
console.log(`문서에는 빈 문자열 및 특정 기호을 제외하고 ${characterCount}개의 문자가 있습니다.`);

// 수정된 내용을 파일에 저장합니다.
fs.writeFileSync('C:/Users/bsymonica/study/study_js/qa/cleanedContent.txt', cleanedText, 'utf-8');
