import { numbersOnly } from './format-number';
import { isDate } from './format-date';

function m2h(inputMasehi, koreksi = 0) {
	if (!isDate(inputMasehi)) return;

	let mData = new Date(inputMasehi);
	let mThn = mData.getFullYear();
	let mBln = mData.getMonth() + 1;
	let mTgl = mData.getDate();
	let okt15th1582;
	let hasil1;
	let hasil2;
	let hasil3;
	let hThn;
	let hBln;
	let hTgl;
	let hKabisat;
	let mKabisat;

	mData.setDate(mData.getDate() + koreksi);
	mThn = mData.getFullYear();
	mBln = mData.getMonth() + 1;
	mTgl = mData.getDate();

	if (mThn % 4 === 0) {
		if (mThn % 100 !== 0) {
			if (mThn % 400 === 0) {
				mKabisat = 1;
			} else {
				mKabisat = 0;
			}
		} else {
			mKabisat = 1;
		}
	} else {
		mKabisat = 0;
	}

	if (mBln < 3) {
		mThn -= 1;
		mBln += 12;
	}

	if (mThn > 1582 || (mThn === 1582 && mBln * 31 - (mKabisat === 1 ? 5 : 6) >= 287)) {
		okt15th1582 = 2 - Math.floor(mThn / 100) + Math.floor(Math.floor(mThn / 100) / 4);
	} else {
		okt15th1582 = 0;
	}

	hasil1 = Math.floor(365.25 * mThn) + Math.floor(30.6001 * (mBln + 1)) + mTgl + okt15th1582 - 428;
	hasil2 = hasil1 - 227016;
	hThn = Math.round(hasil2 / 354.3671 + 0.5);
	hasil3 = hasil2 + 1 - Math.floor(hasil2 / 354.3671) * 354.3671;

	if (
		hThn % 30 === 2 ||
		hThn % 30 === 5 ||
		hThn % 30 === 7 ||
		hThn % 30 === 10 ||
		hThn % 30 === 13 ||
		hThn % 30 === 15 ||
		hThn % 30 === 18 ||
		hThn % 30 === 21 ||
		hThn % 30 === 24 ||
		hThn % 30 === 26 ||
		hThn % 30 === 29
	) {
		hKabisat = 1;
	} else {
		hKabisat = 0;
	}
	// console.log("hasil3", hasil3);
	switch (true) {
		case hasil3 <= 30:
			hBln = 1;
			hTgl = Math.round(hasil3 + 0.5);
			break;
		case hasil3 <= 59:
			hBln = 2;
			hTgl = Math.round(hasil3 + 0.5) - 30;
			break;
		case hasil3 <= 89:
			hBln = 3;
			hTgl = Math.round(hasil3 + 0.5) - 59;
			break;
		case hasil3 <= 118:
			hBln = 4;
			hTgl = Math.round(hasil3 + 0.5) - 89;
			break;
		case hasil3 <= 148:
			hBln = 5;
			hTgl = Math.round(hasil3 + 0.5) - 118;
			break;
		case hasil3 <= 177:
			hBln = 6;
			hTgl = Math.round(hasil3 + 0.5) - 148;
			break;
		case hasil3 <= 207:
			hBln = 7;
			hTgl = Math.round(hasil3 + 0.5) - 177;
			break;
		case hasil3 <= 236:
			hBln = 8;
			hTgl = Math.round(hasil3 + 0.5) - 207;
			break;
		case hasil3 <= 266:
			hBln = 9;
			hTgl = Math.round(hasil3 + 0.5) - 236;
			break;
		case hasil3 <= 295:
			hBln = 10;
			hTgl = Math.round(hasil3 + 0.5) - 266;
			break;
		case hasil3 <= 325:
			hBln = 11;
			hTgl = Math.round(hasil3 + 0.5) - 295;
			break;
		default:
			hBln = 12;
			hTgl = Math.round(hasil3 + 0.5) - (325 + hKabisat);
	}

	// case 2023-07-19
	if (hTgl > 30) {
		hTgl = hTgl - 30;
		if (hBln < 12) {
			hBln = hBln + 1;
		} else {
			hBln = 1;
			hThn = hThn + 1;
		}
	}

	if ((hTgl < 1 && hBln < 1) || (hTgl === null && hBln === null)) {
		hTgl = 30;
		hBln = 12;
	}

	// 2007-12-10
	if (hTgl < 1) {
		hTgl = 1;
	}

	return `${hThn.toString().padStart(4, '0')}${hBln.toString().padStart(2, '0')}${hTgl.toString().padStart(2, '0')}`;
}

const listBulanHijri = [
	{ month: 1, name: 'Muharram' },
	{ month: 2, name: 'Shafar' },
	{ month: 3, name: 'Rabiul Awal' },
	{ month: 4, name: 'Rabiul Akhir' },
	{ month: 5, name: 'Jumadal Ula' },
	{ month: 6, name: 'Jumadal Akhirah' },
	{ month: 7, name: 'Rajab' },
	{ month: 8, name: 'Syaban' },
	{ month: 9, name: 'Ramadan' },
	{ month: 10, name: 'Syawal' },
	{ month: 11, name: 'Dzul Qadah' },
	{ month: 12, name: 'Dzul Hijjah' },
];

function getBulanHijri(inputMonth) {
	const monthObject = listBulanHijri.find((obj) => obj.month === parseInt(inputMonth));
	return monthObject ? monthObject.name : '';
}

function bacaHijri(input) {
	if (!input) return '-';
	const cleanInput = numbersOnly(input);

	let dd = String(cleanInput).substring(6, 8);
	let mm = String(cleanInput).substring(4, 6);
	let yy = String(cleanInput).substring(0, 4);
	if (String(cleanInput).length != 8 || dd < 1 || mm < 1 || yy < 1) {
		return 'Format salah!';
	}
	return `${dd} ${getBulanHijri(mm)} ${yy}`;
}

function m2hFormat(input) {
	if (!input) return '-';
	const hijri = m2h(input);
	return hijri.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
}

function m2hBacaHijri(input) {
	if (!input) return '-';
	const hijri = m2h(input);
	return bacaHijri(hijri);
}
/**
 * @param {number} textHijri
 * @returns  yyyy-mm-dd
 */
function formatHijri(textHijri) {
	if (!textHijri || textHijri.length != 8) return '';
	else return textHijri.replace(/(.{4})(.{2})(.{2})/, '$1-$2-$3') || '';
}
export { m2h, bacaHijri, m2hFormat, m2hBacaHijri, formatHijri, getBulanHijri, listBulanHijri };
