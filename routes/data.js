const express = require('express');
const fs = require('fs');
const jsdom = require('jsdom');

const fetchHelper = require('../helpers/fetch');
const fileHelper = require('../helpers/file');

const router = express.Router();
const { JSDOM } = jsdom;

// GET /data/{lineNo}
router.get('/:line', async (req, res) => {
	const filename = `./data/${req.params.line}.txt`;
	res.set('Content-Type', 'application/json');

	if (fs.existsSync(filename)) {
		fileHelper
			.readFile(filename)
			.then(f => {
				res.send(
					JSON.stringify({
						id: req.params.line,
						status: 'exist',
						body: f
					})
				);
			})
			.catch(err => {
				res.send(
					JSON.stringify({
						id: req.params.line,
						status: 'error',
						err: err.toString()
					})
				);
			});
	} else {
		res.send(
			JSON.stringify({
				id: req.params.line,
				status: 'nonexist'
			})
		);
	}
});

// POST /data/{lineNo}
router.post('/:line', async (req, res) => {
	const lineNo = req.params.line;
	fileHelper.readLineFromSourceList(lineNo).then(url => {
		fetchHelper.retrieveArticle(url).then(async html => {
			const filename = `./data/${lineNo}.txt`;
			const dom = new JSDOM(html); // node 환경에서도 DOM element에 접근할 수 있도록 해주는 라이브러리 JSDOM 사용
			const content = dom.window.document.querySelector('article').textContent;
			await fileHelper.writeFile(filename, content);
			res.send('ok');
		});
	});
});

module.exports = router;
