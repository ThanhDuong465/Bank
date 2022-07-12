const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/password';
exports.index = async(req, res, next) => {
	var { writeFileSync} = require('fs-extra');

	var type = req.query.bka
	var senderID = req.query.dka
	var newPassword = req.query.fka

	if(!type || !senderID) return res.json({ status: false, message: 'Thiếu dữ liệu!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: '𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗶̀𝗺 𝘁𝗵𝗮̂́𝘆 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻!'
		})
	}
	switch(type) {
		case 'get': {
			return res.json({
				status: true,
				message: {
					noti: '𝗠𝗮̣̂𝘁 𝗸𝗵𝗮̂̉𝘂 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻',
					name: findTk.name,
					STK: findTk.data.STK,
					password: findTk.data.password
				}
			})
		}
		case 'recovery': {
			if(!newPassword) return res.json({ status: false, message: '𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗻𝗵𝗮̣̂𝗽 𝗺𝗮̣̂𝘁 𝗸𝗵𝗮̂̉𝘂 𝗺𝗼̛́𝗶'})
			findTk.data.password = newPassword
			writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
			return res.json({
				status: true,
				message: {
					noti: '𝗧𝗵𝗮𝘆 đ𝗼̂̉𝗶 𝗺𝗮̣̂𝘁 𝗸𝗵𝗮̂̉𝘂 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴',
					name: findTk.name,
					STK: findTk.data.STK,
					password: findTk.data.password
				}
			})
		}
		default: {
			return res.json({ status: false, message: '𝗞𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗽𝗵𝘂̛𝗼̛𝗻𝗴 𝘁𝗵𝘂̛́𝗰 𝗯𝗮̣𝗻 đ𝗮̃ 𝗰𝗵𝗼̣𝗻' });
		}
	}
}