const express = require('express');
const fileHelper = require('../helpers/file');

const router = express.Router();

// GET /source
// read the content from source.txt using fileHelper
router.get('/', async (req, res) => {
	let data;
	try {
		data = await fileHelper.readSourceListFile();
		res.status(200).send(data.toString());
	} catch (err) {
		res.statusCode(500).end();
		// throw err;
	}

	//todo router 쪽 error 와 다른쪽 error의 차이?

	// client에게 response 보낼때 json으로 보낼것이냐 그냥 보낼것이냐. 이전 chatterbox에서 보낼땐 json으로 보냈는데 string으로 보내도 상관이 없나? 사실 객체같은 건 json 으로 보내지만 그냥 string은 string으로 보낸다고 data 더 차지하거나 하진 않을듯. 그리고 그림같은 파일같은건 json으로 보낼수도 없고.
	/// client에서 request는 object 형태로 날라오는 것 같고.
});

// POST /source
// save the content to source.txt using fileHelper
router.post('/', (req, res) => {
	fileHelper
		.writeSourceListFile(req.body)
		// 이런식으로 req.body를 string으로 바로 쓸 수 있는게 body parser 때문인듯.
		.then(() => {
			res.status(201).send('ok');
			// 이런 형식으로 쓰는 것 자체가 다 express이던가? ㅇㅇ.  res.send vs res.end
		})
		.catch(err =>
			res.statusCode(500).send(`cannot post in list due to ${err}`)
		);
	//이런 부분들 다 비동기 고려 안 해줘도 되나? ㄴㄴ res.send보내는 부분들도 다 비동기로써 똑같이 고려해줘야 함. 안그러면 에러나도 그 에러메시지 안 가고, ok 가버림.
});

// 성공시 200 Status Code를 전달하고, 실패할 경우 어떠한 에러인지를 포함하는 내용을 response에 담고 500번대의 Status Code를 전달해야 합니다.

module.exports = router;

// 이미 작성된 data.js 및 src/client/App.js에서의 요청 과정을 살펴보는 것은 좋은 공부가 됩니다. http://localhost:8080/api/data/3와 같이 요청했을 경우 어떤 형태로 응답이 오는지 확인해보세요.

// TODO: 이렇게 앱으로 만들어진건 디버깅하기가 어렵네. 어디서 오류나는지 찾기가 힘듦. 방법 생각.

// 에러처리는 비동기로 데이터를 불러오는 부분들에서는 다 해야하나? error handling throw로는 다 해줘야 함. 던지고 마지막에 catch로 받기.
// then.then.then.catch 할때 catch를 마지막에 붙여주면 마지막 catch로 error 다 가나? ㅇㅇ. 아님 중간중간 사이에 catch 넣어줘야 하나?ㄴㄴ.  promise마다 catch error를 다 안 붙이고, 마지막에 catch error 로 다 잡아서 마지막에 한번에 처리한다?? 중간중간 catch할 필요가 x.
// throw error 로 던지면 마지막에 잡는 catch가 다 잡느냐? ㅇㅇ. error는 그 시기의 error 를 잡아야 하기 때문에 throw error 하고, catch는 약수터 마지막에 잡듯이 마지막에 catch해서 잡으면 된다. throw error 와 catch와의 차이.

// aync, await 의 리턴값을 then으로  받을 수 있다고 함. 프로미스 객체로도 쓰일 수 있는 듯.
