const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, "cache", "bank.json");
exports.name = '/bank/find';
exports.index = async(req, res, next) => {
	const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	const type = req.query.type;
	const ID = req.query.ID;
	const STK = req.query.STK;
	const name = req.query.name;
	if(!type || (!ID && !STK && !name))return res.json({ status: false, message: 'Thiếu dữ liệu!'})
	switch(type) {
		case 'id':
    case 'ID': {
			const findSenderID = dataBank.find(i => i.senderID == ID)
			if(findSenderID == undefined) {
				return res.json({
					status: false,
					message: '𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗶̀𝗺 𝘁𝗵𝗮̂́𝘆 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 𝗰𝗼́ 𝗜𝗗 𝗻𝗮̀𝘆!'
				})
			}
			else {
				return res.json({
					status: true,
					message: {
						name: findSenderID.name,
						senderID: findSenderID.senderID,
						data: {
							money: findSenderID.data.money,
							STK: findSenderID.data.STK,
              mathe: findSenderID.data.mathe,
							debt: findSenderID.data.debt
						}
					}
				})
			}
			break;
		}
		case 'stk': 
    case 'STK': {
			const findSTK = dataBank.find(i => i.data.STK == STK)
			if(findSTK == undefined) {
				return res.json({
					status: false,
					message: '𝗦𝗧𝗞 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗼̂̀𝗻 𝘁𝗮̣𝗶 𝘁𝗿𝗲̂𝗻 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴!'
				})
			}
			else {
				return res.json({
					status: true,
					message: {
						name: findSTK.name,
						senderID: findSTK.senderID,
						data: {
							money: findSTK.data.money,
							STK: findSTK.data.STK,
              mathe: findSTK.data.mathe,
							debt: findSTK.data.debt
						}
					}
				})
			}
			break;
		}
		case 'name': {
			const findName = dataBank.filter(i => i.name == name)
			if(findName.length == 0) {
				return res.json({
					status: false,
					message: '𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗶̀𝗺 𝘁𝗵𝗮̂́𝘆 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 𝗰𝗼́ 𝘁𝗲̂𝗻 𝗻𝗮̀𝘆!'
				})
			}
			else {
				var data = [];
				for(let i of findName) {
					data.push({
						name: i.name,
						senderID: i.senderID,
						data: {
							money: i.data.money,
							STK: i.data.STK,
              mathe: i.data.mathe,
							debt: i.data.debt
						}
					})

				}
				return res.json({
					status: true,
					message: {
						data: data
					}
				})
			}
			break;
		}
		default: {
			return res.json({
				status: false,
				message: '𝗣𝗵𝘂̛𝗼̛𝗻𝗴 𝘁𝗵𝘂̛́𝗰 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂!'
			})
		}
	}
}