export default function CardKelas({ data, className }) {
	return (
		<div className={`${className || null} w-full border rounded-md border-jingga-200 bg-jingga-100`}>
			<div className='px-2 py-4 text-center text-jingga-800 bg-jingga-300'>
				{data.th_ajaran_h} | {data.tingkat} | {data.kelas}
			</div>
		</div>
	);
}
