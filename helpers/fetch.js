const https = require('https');

async function retrieveArticle(url) {
	// let body = ''; 왜 body를 https 밖으로 빼면 인식을 못하지? --> 인식 되네.
	// Promise 말고 return 값 만들어서 던지는 법은? async, await로?

	// 내 서버가 다른 인터넷 사이트에 https request 날리기
	// retrieve the html string from given url and return as promise
	return new Promise((resolve, reject) => {
		https
			.get(url, res => {
				res.setEncoding('utf8');
				let body = '';
				res.on('data', data => {
					body += data;
				});
				//이렇게 utf8으로 세팅하면 https.get 이후 string으로 나오게 됨.

				res.on('end', () => {
					resolve(body);
				});
			})
			.on('error', err => reject(err));
	});
}

module.exports = {
	retrieveArticle
};
