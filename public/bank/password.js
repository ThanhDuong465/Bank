const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/password';
exports.index = async(req, res, next) => {
	var { writeFileSync} = require('fs-extra');

	var type = req.query.bka
	var senderID = req.query.dka
	var newPassword = req.query.fka

	if(!type || !senderID) return res.json({ status: false, message: 'Thiแบฟu dแปฏ liแปu!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: '๐๐ต๐ผฬ๐ป๐ด ๐๐ถฬ๐บ ๐๐ต๐ฎฬฬ๐ ๐๐ฎฬ๐ถ ๐ธ๐ต๐ผ๐ฎฬ๐ป ๐ฐ๐ฬ๐ฎ ๐ฏ๐ฎฬฃ๐ป!'
		})
	}
	switch(type) {
		case 'get': {
			return res.json({
				status: true,
				message: {
					noti: '๐ ๐ฎฬฃฬ๐ ๐ธ๐ต๐ฎฬฬ๐ ๐ฐ๐ฬ๐ฎ ๐ฏ๐ฎฬฃ๐ป',
					name: findTk.name,
					STK: findTk.data.STK,
					password: findTk.data.password
				}
			})
		}
		case 'recovery': {
			if(!newPassword) return res.json({ status: false, message: '๐ฉ๐๐ถ ๐น๐ผฬ๐ป๐ด ๐ป๐ต๐ฎฬฃฬ๐ฝ ๐บ๐ฎฬฃฬ๐ ๐ธ๐ต๐ฎฬฬ๐ ๐บ๐ผฬฬ๐ถ'})
			findTk.data.password = newPassword
			writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
			return res.json({
				status: true,
				message: {
					noti: '๐ง๐ต๐ฎ๐ ฤ๐ผฬฬ๐ถ ๐บ๐ฎฬฃฬ๐ ๐ธ๐ต๐ฎฬฬ๐ ๐๐ต๐ฎฬ๐ป๐ต ๐ฐ๐ผฬ๐ป๐ด',
					name: findTk.name,
					STK: findTk.data.STK,
					password: findTk.data.password
				}
			})
		}
		default: {
			return res.json({ status: false, message: '๐๐ต๐ผฬ๐ป๐ด ๐ฐ๐ผฬ ๐ฝ๐ต๐ฬ๐ผฬ๐ป๐ด ๐๐ต๐ฬฬ๐ฐ ๐ฏ๐ฎฬฃ๐ป ฤ๐ฎฬ ๐ฐ๐ต๐ผฬฃ๐ป' });
		}
	}
}