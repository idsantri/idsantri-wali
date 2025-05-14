import { useEffect, useState } from 'react';
import apiGet from '@/api/api-get';
import Loading from '@/components/Loading';
import AlertNotFound from '@/components/AlertNotFound';

function TatibPage() {
	const [tatib, setTatib] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		apiGet({ endPoint: 'tatib-santri' }).then((res) => {
			if (res) {
				setTatib(res.tatib_santri);
			}
			setIsLoading(false);
		});
	}, []);

	const Header = () => (
		<div className='mb-2 overflow-hidden rounded-md'>
			<h2 className='p-2 m-0 text-xl font-light text-center bg-jingga-100 text-jingga-800'>Tata Tertib</h2>
			<div className='text-center bg-jingga-200'>
				<div className='p-2'>
					<div>Pondok Pesantren</div>
				</div>
			</div>
		</div>
	);

	const RenderRow = ({ tatib, index: i }) => {
		const processString = (str) => (str.length > 2 && /[a-zA-Z]$/.test(str) ? `— ${str.slice(-1)}` : str);
		const { pasal, teks } = tatib;

		return (
			<tr
				className={`${pasal.length == 1 ? 'font-bold bg-jingga-200' : ''} ${i == 0 ? '' : 'border-t border-jingga-200'}`}
			>
				<td className='align-top text-nowrap'>{processString(pasal)}</td>
				<td className='align-top'>{teks}</td>
			</tr>
		);
	};

	const RenderTable = ({ tatib }) => (
		<div className='overflow-hidden border rounded-sm shadow-sm shadow-jingga-500 border-jingga-300'>
			<table className='table table-auto table-sm'>
				<tr className='w-auto bg-jingga-300'>
					<th>Pasal</th>
					<th>Teks</th>
				</tr>
				{tatib.map((tatib, index) => (
					<RenderRow key={index} tatib={tatib} index={index} />
				))}
			</table>
		</div>
	);

	return (
		<>
			<Header />
			{isLoading ? <Loading /> : !tatib || tatib.length === 0 ? <AlertNotFound /> : <RenderTable tatib={tatib} />}
		</>
	);
}

export default TatibPage;
