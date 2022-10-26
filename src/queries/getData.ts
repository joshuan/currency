import { useQuery } from '../lib';
import { DTO } from '../types';

async function getData(): Promise<DTO> {
	const res = await fetch(`/data.json?time=${Date.now()}`);

	return res.json();
}

export function useGetData() {
	return useQuery<DTO>(['data'], getData);
}
