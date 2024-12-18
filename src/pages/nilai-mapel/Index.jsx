import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import apiGet from '@/api/api-get';
import CardHeader from '@/components/CardHeader';
// const temp = [
// 	{
// 		id: 'ts-qur',
// 		name: 'al-Quran',
// 		category: 'rapor',
// 		nilai_1: 4,
// 		nilai_2: null,
// 		nilai_3: null,
// 		nilai_4: 7,
// 		rerata: 6.75,
// 	},
// 	{
// 		id: 'ts-blg',
// 		name: 'Balaghah',
// 		category: 'rapor',
// 		nilai_1: 0,
// 		nilai_2: 8,
// 		nilai_3: 10,
// 		nilai_4: 7,
// 		rerata: 7.75,
// 	},
// 	{
// 		id: 'ts-taf',
// 		name: 'Tafsir',
// 		category: 'rapor',
// 		nilai_1: 0,
// 		nilai_2: 7,
// 		nilai_3: 7,
// 		nilai_4: 6,
// 		rerata: 7.5,
// 	},
// 	{
// 		id: 'ts-ufq',
// 		name: 'Usul Fikih',
// 		category: 'rapor',
// 		nilai_1: null,
// 		nilai_2: null,
// 		nilai_3: null,
// 		nilai_4: null,
// 		rerata: '',
// 	},
// 	{
// 		id: 'ts-akh',
// 		name: 'Akhlaq',
// 		category: 'rapor',
// 		nilai_1: 8,
// 		nilai_2: 7,
// 		nilai_3: 8,
// 		nilai_4: 4,
// 		rerata: 6.75,
// 	},
// 	{
// 		id: 'ts-man',
// 		name: 'Mantiq',
// 		category: 'rapor',
// 		nilai_1: 6,
// 		nilai_2: 8,
// 		nilai_3: 4,
// 		nilai_4: 8,
// 		rerata: 6.5,
// 	},
// 	{
// 		id: 'ts-tau',
// 		name: 'Tauhid',
// 		category: 'rapor',
// 		nilai_1: 7,
// 		nilai_2: 5,
// 		nilai_3: 7,
// 		nilai_4: 6,
// 		rerata: 6.25,
// 	},
// 	{
// 		id: 'ts-qfq',
// 		name: 'Q Fikih',
// 		category: 'rapor',
// 		nilai_1: 7,
// 		nilai_2: 9,
// 		nilai_3: 8,
// 		nilai_4: 8,
// 		rerata: 8,
// 	},
// 	{
// 		id: 'ts-nah',
// 		name: 'Nahwu',
// 		category: 'rapor',
// 		nilai_1: 4,
// 		nilai_2: 8,
// 		nilai_3: 9,
// 		nilai_4: 8,
// 		rerata: 7.25,
// 	},
// 	{
// 		id: 'ts-had',
// 		name: 'Hadits',
// 		category: 'rapor',
// 		nilai_1: 4,
// 		nilai_2: 8,
// 		nilai_3: 8,
// 		nilai_4: 9,
// 		rerata: 7.25,
// 	},
// 	{
// 		id: 'ts-fiq',
// 		name: 'Fikih',
// 		category: 'rapor',
// 		nilai_1: 5,
// 		nilai_2: 8,
// 		nilai_3: 8,
// 		nilai_4: 4,
// 		rerata: 6.25,
// 	},
// 	{
// 		id: 'ts-srf',
// 		name: 'Shorrof',
// 		category: 'rapor',
// 		nilai_1: 6,
// 		nilai_2: 8,
// 		nilai_3: 6,
// 		nilai_4: 6,
// 		rerata: 6.5,
// 	},
// ];

function Index() {
	const { kelas_id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [nilai, setNilai] = useState(null);
	const category = 'rapor';

	const kelas = JSON.parse(localStorage.getItem('kelas')) || [];
	const kelasData = kelas.find((item) => item.id == kelas_id);
	// console.log('🚀 ~ Index ~ kelas:', kelas);
	// console.log('🚀 ~ Index ~ kelasData:', kelasData);

	function hitungRerata(data, key) {
		if (!Array.isArray(data) || data.length === 0) return null;

		let total = 0;
		let count = 0;

		for (const item of data) {
			const nilai = parseFloat(item[key]);
			if (!isNaN(nilai)) {
				total += nilai;
				count++;
			}
		}

		return count > 0 ? total / count : null;
	}

	useEffect(() => {
		apiGet({ endPoint: 'nilai-mapel', params: { kelas_id, category } }).then((data) => {
			if (data) {
				setNilai(data.nilai);
			}
			setIsLoading(false);
		});
	}, [kelas_id]);

	function RenderKelas({ className }) {
		return (
			<div className={`${className} w-full border rounded-md border-jingga-200 bg-jingga-100`}>
				<div className='px-2 py-4 text-center text-jingga-800 bg-jingga-300'>
					{kelasData.th_ajaran_h} | {kelasData.tingkat} | {kelasData.kelas}
				</div>
			</div>
		);
	}

	function RenderNilai({ nilai, className }) {
		return (
			<div className={`${className} w-full my-2 border rounded-md border-jingga-200 bg-jingga-200`}>
				<div className='p-2 text-center bg-jingga-300 text-jingga-900'>Data Nilai Mata Pelajaran</div>
				<div className='px-2 py-4 text-center text-jingga-800'>
					{!nilai || nilai.length === 0 ? (
						<div className='p-4 italic font-light text-center text-red-900 bg-red-200 rounded-md'>
							Tidak ada data untuk ditampilkan!
						</div>
					) : (
						<table className='table'>
							<thead className=''>
								<tr className='text-center text-jingga-950'>
									<th className='font-semibold text-left'>Mapel</th>
									<th className='font-semibold'>U-1</th>
									<th className='font-semibold'>U-2</th>
									<th className='font-semibold'>U-3</th>
									<th className='font-semibold'>U-4</th>
									<th className='font-semibold'>Rerata</th>
								</tr>
							</thead>
							<tbody>
								{nilai.map((n, i) => (
									<RenderItem nilai={n} index={i} key={i} />
								))}
							</tbody>
							<tfoot className=''>
								<tr className='italic text-center text-jingga-950'>
									<td className='font-semibold text-left'>Rerata</td>
									<td className='font-semibold'>{hitungRerata(nilai, 'nilai_1')?.toFixed(1)}</td>
									<td className='font-semibold'>{hitungRerata(nilai, 'nilai_2')?.toFixed(1)}</td>
									<td className='font-semibold'>{hitungRerata(nilai, 'nilai_3')?.toFixed(1)}</td>
									<td className='font-semibold'>{hitungRerata(nilai, 'nilai_4')?.toFixed(1)}</td>
									<td className='font-semibold'>{hitungRerata(nilai, 'rerata')?.toFixed(1)}</td>
								</tr>
							</tfoot>
						</table>
					)}
				</div>
			</div>
		);
	}

	function RenderItem({ nilai }) {
		return (
			<tr className='text-center'>
				<td className='text-left text-nowrap'>{nilai.name}</td>
				<td>{nilai.nilai_1}</td>
				<td>{nilai.nilai_2}</td>
				<td>{nilai.nilai_3}</td>
				<td>{nilai.nilai_4}</td>
				<td className='font-medium'>{nilai.rerata ? nilai.rerata?.toFixed(1) : null}</td>
			</tr>
		);
	}

	return (
		<>
			<CardHeader title='Nilai Mata Pelajaran' />
			<RenderKelas />
			{isLoading ? <Loading /> : <RenderNilai nilai={nilai} />}
		</>
	);
}

export default Index;
