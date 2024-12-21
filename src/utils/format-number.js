const digitSeparator = (value) => {
	let n;
	if (!isNaN(value)) n = Number(value);
	else n = 0;
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

function numbersOnly(inputString) {
	// Gunakan ekspresi reguler untuk mencari karakter angka
	const regex = /\d/g;
	// Ambil semua karakter angka dari inputString menggunakan ekspresi reguler
	const numbersOnly = inputString.match(regex);
	// Gabungkan karakter angka menjadi satu string
	const result = numbersOnly ? numbersOnly.join('') : '';
	return result;
}

export { digitSeparator, numbersOnly };
