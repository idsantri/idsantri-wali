export default function CardKelas({ data, className }) {
	return (
		<div className={`${className || null} w-full rounded-md bg-success text-success-content`}>
			<div className='px-2 py-2 font-light text-center'>
				{data.th_ajaran_h} | {data.tingkat} | {data.kelas}
			</div>
		</div>
	);
}
