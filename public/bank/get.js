const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/get';
exports.index = async(req, res, next) => {
	var { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	var senderID = req.query.ID
	var money = req.query.money
	var password = req.query.password

	if(!senderID || !money || !password) return res.json({ status: false, message: 'Thiếu dữ liệu!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: '𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗶̀𝗺 𝘁𝗵𝗮̂́𝘆 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻!'
		})
	}
	if(password !== findTk.data.password) {
		return res.json({
			status: false,
			message: '𝗦𝗮𝗶 𝗺𝗮̣̂𝘁 𝗸𝗵𝗮̂̉𝘂'
		})
	}
	else {
		var moneyG = findTk.data.money
		if(moneyG < money) {
			return res.json({
				status: false,
				message: '𝗦𝗼̂́ 𝗱𝘂̛ 𝗸𝗵𝗼̂𝗻𝗴 đ𝘂̉ đ𝗲̂̉ 𝘁𝗵𝘂̛̣𝗰 𝗵𝗶𝗲̣̂𝗻 𝗴𝗶𝗮𝗼 𝗱𝗶̣𝗰𝗵'
			})
		}
		findTk.data.money = findTk.data.money - parseInt(money)
		writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
		return res.json({
			status: true,
			message: {
				noti: '♻️ 𝗥𝘂́𝘁 𝘁𝗶𝗲̂̀𝗻 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴!',
				name: findTk.name,
				money: `${moneyG - parseInt(money)}`
			}
		})
	}
}