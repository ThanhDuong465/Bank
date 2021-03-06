const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/get';
exports.index = async(req, res, next) => {
	var { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	var senderID = req.query.ID
	var money = req.query.money
	var password = req.query.password

	if(!senderID || !money || !password) return res.json({ status: false, message: 'Thiแบฟu dแปฏ liแปu!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: '๐๐ต๐ผฬ๐ป๐ด ๐๐ถฬ๐บ ๐๐ต๐ฎฬฬ๐ ๐๐ฎฬ๐ถ ๐ธ๐ต๐ผ๐ฎฬ๐ป ๐ฐ๐ฬ๐ฎ ๐ฏ๐ฎฬฃ๐ป!'
		})
	}
	if(password !== findTk.data.password) {
		return res.json({
			status: false,
			message: '๐ฆ๐ฎ๐ถ ๐บ๐ฎฬฃฬ๐ ๐ธ๐ต๐ฎฬฬ๐'
		})
	}
	else {
		var moneyG = findTk.data.money
		if(moneyG < money) {
			return res.json({
				status: false,
				message: '๐ฆ๐ผฬฬ ๐ฑ๐ฬ ๐ธ๐ต๐ผฬ๐ป๐ด ฤ๐ฬ ฤ๐ฒฬฬ ๐๐ต๐ฬฬฃ๐ฐ ๐ต๐ถ๐ฒฬฃฬ๐ป ๐ด๐ถ๐ฎ๐ผ ๐ฑ๐ถฬฃ๐ฐ๐ต'
			})
		}
		findTk.data.money = findTk.data.money - parseInt(money)
		writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
		return res.json({
			status: true,
			message: {
				noti: 'โป๏ธ ๐ฅ๐ฬ๐ ๐๐ถ๐ฒฬฬ๐ป ๐๐ต๐ฎฬ๐ป๐ต ๐ฐ๐ผฬ๐ป๐ด!',
				name: findTk.name,
				money: `${moneyG - parseInt(money)}`
			}
		})
	}
}