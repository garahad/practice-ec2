const fs = require('fs');

async function writeFile(filename, body) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filename, body, err => {
			if (err) {
				reject(new Error('cannot write file!!'));
			}
			resolve(body);
		});
		// await 이용 안할건데 async 왜 붙어있지? 아마 나중에 async 로 만들어보라고 된듯.
	});
}

async function readFile(filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if (err) {
				reject(new Error('cannot read file'));
			}
			// readFile로 하면 buffer로 긁어옴. toString해줘야 함. 혹은 애초에 긁어올때 'utf8' option 붙여주든가.
			resolve(data.toString());
		});
	});
}

async function readSourceListFile() {
	return readFile('./data/source.txt');
}

async function writeSourceListFile(body) {
	return writeFile('./data/source.txt', body);
}

async function readLineFromSourceList(nthline) {
	return new Promise((resolve, reject) => {
		readSourceListFile()
			.then(str => str.split(`\n`))
			.then(sourceArray => {
				if (sourceArray[nthline]) {
					resolve(sourceArray[nthline]);
				} else {
					reject(new Error(`no existing ${nthline}th line!!`));
				}
			})
			.catch(err => {
				throw err;
			});
	});
}

//npm run dev (=yarn dev)는 또 뭐지? run이라는 script가 없는데? npm run은 원래 있는 명령 같고, dev는 script에서 따로 떠 지정된게 있는듯. 클라이언트, 서버 다 돌리는 것.

// 기존 chatterbox server - 서버쪽 띄우는 것과 client 쪽 띄우는 것. webpack이 이것 한번에 해주는 듯.
// require로 쓰는데 dependency에 없다면 node 기본 모듈에 있는 것.

// 여유있으면 advanced도.

// Server
// https 뿐만 아니라 http 형태의 URL도 사용가능하도록 만들어보세요.
// medium blog가 아닌, 다른 형태의 HTML을 응답으로 받더라도, 내용을 수집할 수 있도록 만드세요. JSDOM을 이용해 medium에서만 쓰이는 className을 이용해 컨텐츠를 수집하는 것을 확인할 수 있을 것입니다. bare minimum requirement의 요구사항인 source list를 저장하는 것 뿐만 아니라, source list에 따른 DOM selector도 추가적으로 저장할 수 있습니다.

// Client
// <textarea>를 사용하는 것 말고, 좀 더 나은 입력폼을 만들어보세요.
// modal창을 구현하는 방법을 연구해보고, 어떻게 modal을 React Component화 시킬 수 있는지 연구해보세요.

module.exports = {
	readSourceListFile,
	writeSourceListFile,
	writeFile,
	readFile,
	readLineFromSourceList
};
