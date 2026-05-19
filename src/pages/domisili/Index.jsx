import { useEffect, useState } from 'react';
import { addHours, format } from 'date-fns';
import CardHeader from '../../components/CardHeader';
import AlertNotFound from '../../components/AlertNotFound';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import { getDomisili } from '../../models/santri';

function PesantrenPage() {
	const [domisili, setDomisili] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getDomisili()
			.then((data) => {
				if (data && data.domisili) {
					setDomisili(data.domisili);
				}
			})
			.finally(() => setIsLoading(false));
	}, []);

	function RenderItem({ dom, index: i }) {
		return (
			<div className={`flex items-center justify-between px-3 py-1 ${i == 0 ? '' : 'border-t border-accent/50'}`}>
				<div className='font-light'>
					<div className=''>
						<span className='inline-block text-sm italic w-15'>Kamar:</span>
						<span className=''>{dom.domisili}</span>
					</div>
					<div className=''>
						<span className='inline-block text-sm italic w-15'>Ket.:</span>
						<span>{dom.keterangan || '-'}</span>
					</div>
				</div>
				<div className='text-xs text-right'>
					<div>{format(addHours(dom.cr_at, 7), 'yyyy-MM-dd')}</div>
					{/* <div>{addHours(dom.cr_at, 7).toString().slice(11, 16)}</div> */}
				</div>
			</div>
		);
	}

	function RenderDomisili({ domisili }) {
		return (
			<div className='overflow-hidden border rounded-md border-accent/75'>
				{domisili.map((dom, i) => (
					<RenderItem key={i} dom={dom} index={i} />
				))}
			</div>
		);
	}

	return (
		<>
			<CardHeader title='Riwayat Domisili' />
			{isLoading && <LoadingAbsolute />}
			{!domisili || domisili.length === 0 ? <AlertNotFound /> : <RenderDomisili domisili={domisili} />}
		</>
	);
}

export default PesantrenPage;
