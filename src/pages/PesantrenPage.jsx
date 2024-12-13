import { useEffect, useState } from 'react';
import CardHeader from '../components/CardHeader';
import apiGet from '../api/api-get';
import Loading from '../components/Loading';
import AlertNotFound from '../components/AlertNotFound';
import { addHours, format } from 'date-fns';

function PesantrenPage() {
	const [domisili, setDomisili] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		apiGet({ endPoint: 'domisili' }).then((data) => {
			if (data) setDomisili(data.domisili);
			setIsLoading(false);
		});
	}, []);

	function RenderItem({ dom, index: i }) {
		return (
			<div
				className={`flex items-center justify-between px-3 py-1 ${i == 0 ? '' : 'border-t border-jingga-300'}`}
			>
				<div>
					<div>
						<span className='inline-block w-[60px] text-sm italic font-light'>Kamar:</span>
						<span>{dom.domisili}</span>
					</div>
					<div>
						<span className='inline-block w-[60px] text-sm italic font-light'>Ket.:</span>
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
			<div className='overflow-hidden border rounded-md shadow-sm shadow-jingga-500 border-jingga-300'>
				{domisili.map((dom, i) => (
					<RenderItem key={i} dom={dom} index={i} />
				))}
			</div>
		);
	}

	return (
		<>
			<CardHeader title='Riwayat Domisili' />
			<div className='mb-20'>
				{isLoading ? (
					<Loading />
				) : !domisili || domisili.length === 0 ? (
					<AlertNotFound />
				) : (
					<RenderDomisili domisili={domisili} />
				)}
			</div>
		</>
	);
}

export default PesantrenPage;
