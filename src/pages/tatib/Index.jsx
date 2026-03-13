import { useEffect, useState } from 'react';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import AlertNotFound from '../../components/AlertNotFound';
import { getTatib } from '../../models/app';

function TatibPage() {
	const [tatib, setTatib] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getTatib()
			.then((res) => {
				if (res && res.tatib_santri) {
					setTatib(res.tatib_santri);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const Header = () => (
		<div className='mb-2 overflow-hidden rounded-md'>
			<h2 className='p-2 m-0 font-light text-center bg-accent text-accent-content'>Tata Tertib</h2>
			<div className='text-center bg-info text-info-content'>
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
			<tr className={`${pasal.length == 1 ? 'font-bold bg-accent/10' : ''} `}>
				<td className='align-top text-nowrap'>{processString(pasal)}</td>
				<td className='align-top'>{teks}</td>
			</tr>
		);
	};

	const RenderTable = ({ tatib }) => (
		<div className='w-full my-2 border rounded-md border-accent/75'>
			<table className='table table-auto table-sm'>
				<thead>
					<tr className='w-auto bg-accent/25 text-accent-content'>
						<th>Pasal</th>
						<th>Teks</th>
					</tr>
				</thead>
				<tbody>
					{tatib.map((tatib, index) => (
						<RenderRow key={index} tatib={tatib} index={index} />
					))}
				</tbody>
			</table>
		</div>
	);

	return (
		<>
			<Header />
			{isLoading && <LoadingAbsolute />}
			{!tatib || tatib.length === 0 ? <AlertNotFound /> : <RenderTable tatib={tatib} />}
		</>
	);
}

export default TatibPage;
