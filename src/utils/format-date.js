function isDate(dateStr, splitter = '-') {
	if (!dateStr) {
		return false;
	}

	const dateTimeParts = dateStr.split(' ');

	// Bagian tanggal
	const dateParts = dateTimeParts[0].split(splitter);
	if (dateParts.length !== 3) {
		return false;
	}

	const [year, month, day] = dateParts.map(Number);

	// Cek apakah year, month, dan day adalah angka yang valid
	if (isNaN(year) || isNaN(month) || isNaN(day)) {
		return false;
	}

	// Pastikan panjang month dan day adalah dua digit
	if (month < 1 || month > 12 || day < 1 || day > 31) {
		return false;
	}

	// Cek apakah tanggal yang valid berdasarkan bulan
	const daysInMonth = new Date(year, month, 0).getDate();
	if (day > daysInMonth) {
		return false;
	}

	// Jika ada bagian waktu, cek apakah valid
	if (dateTimeParts.length === 2) {
		const timeParts = dateTimeParts[1].split(':');
		if (timeParts.length !== 3) {
			return false;
		}

		const [hour, minute, second] = timeParts.map(Number);

		// Cek apakah hour, minute, dan second adalah angka yang valid
		if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
			return false;
		}

		// Pastikan panjang hour, minute, dan second adalah dua digit
		if (
			hour < 0 ||
			hour > 23 ||
			minute < 0 ||
			minute > 59 ||
			second < 0 ||
			second > 59
		) {
			return false;
		}
	}

	return true;
}

// function isDate(dateStr) {
// 	return (
// 		dateStr != null && dateStr != 0 && !isNaN(new Date(dateStr).getDate())
// 	);
// }

function formatDateSql(inputDate) {
	if (!isDate(inputDate)) return;

	const date = new Date(inputDate);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day} `;
}
function formatDateTimeHtmlToSql(inputHtmlDateTime) {
	if (!inputHtmlDateTime) return null;
	const inputDate = new Date(inputHtmlDateTime);
	const year = inputDate.getFullYear();
	const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
	const day = inputDate.getDate().toString().padStart(2, '0');
	const hours = inputDate.getHours().toString().padStart(2, '0');
	const minutes = inputDate.getMinutes().toString().padStart(2, '0');
	const seconds = inputDate.getSeconds().toString().padStart(2, '0') || '00';

	const sqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return sqlDateTime;
}
function hari(inputDay) {
	let day = '';
	const caseDay = parseInt(inputDay);
	switch (caseDay) {
		case 0:
			day = 'Ahad';
			break;
		case 1:
			day = 'Senin';
			break;
		case 2:
			day = 'Selasa';
			break;
		case 3:
			day = 'Rabu';
			break;
		case 4:
			day = 'Kamis';
			break;
		case 5:
			day = 'Jumat';
			break;
		case 6:
			day = 'Sabtu';
			break;
		default:
			day = '';
	}
	return day;
}

function bulanMasehi(inputMonth) {
	let month = '';
	const caseMonth = parseInt(inputMonth);
	switch (caseMonth) {
		case 1:
			month = 'Januari';
			break;
		case 2:
			month = 'Februari';
			break;
		case 3:
			month = 'Maret';
			break;
		case 4:
			month = 'April';
			break;
		case 5:
			month = 'Mei';
			break;
		case 6:
			month = 'Juni';
			break;
		case 7:
			month = 'Juli';
			break;
		case 8:
			month = 'Agustus';
			break;
		case 9:
			month = 'September';
			break;
		case 10:
			month = 'Oktober';
			break;
		case 11:
			month = 'November';
			break;
		case 12:
			month = 'Desember';
			break;
		default:
			month = '';
	}
	return month;
}

function formatDateFull(inputDate) {
	if (!isDate(inputDate)) return '-';

	const date = new Date(inputDate);
	const year = date.getFullYear();
	const month = bulanMasehi(date.getMonth() + 1);
	const day = String(date.getDate()).padStart(2, '0');
	return `${day} ${month} ${year}`;
}

function formatDateFullDay(inputDate) {
	if (!isDate(inputDate)) return;

	const date = new Date(inputDate);
	const year = date.getFullYear();
	const month = bulanMasehi(date.getMonth() + 1);
	const day = String(date.getDate()).padStart(2, '0');
	const Day = date.getDay();
	return `${hari(Day)}, ${day} ${month} ${year}`;
}

function formatDateShort(inputDate) {
	if (!isDate(inputDate)) return;

	const date = new Date(inputDate);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${day}-${month}-${year}`;
}

export {
	isDate,
	formatDateSql,
	formatDateShort,
	formatDateFull,
	formatDateFullDay,
	formatDateTimeHtmlToSql,
};
