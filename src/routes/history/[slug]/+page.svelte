<script lang="ts">
	import Table from '../../../components/Table.svelte';
	import { formatTanggal } from '$lib/todo.svelte';

	let { data } = $props();
	const history = $state({
		tugas: []
	});

	$effect(() => {
		if (!data.slug) {
			console.warn('Slug tidak tersedia');
			return;
		}
		try {
			const dataHistory = localStorage.getItem(data.slug);
			if (dataHistory) {
				history.tugas = JSON.parse(dataHistory);
			} else {
				console.log('Tidak ada data di localStorage untuk slug:', data.slug);
			}
		} catch (error) {
			console.error('Gagal memuat tugas dari localStorage:', error);
		}
	});
</script>

{#if !history.tugas.length}
	<h1 class="my-2 text-center text-xl font-bold text-gray-500">Tidak ada History Tugas</h1>
	<p class="text-center text-sm">
		url ini <span
			class="inline-flex items-center rounded-md bg-yellow-50 text-sm font-semibold text-black ring-1 ring-yellow-600/10 ring-inset dark:bg-yellow-900/30 dark:text-yellow-400 dark:ring-yellow-400/20"
			>/{data.slug}</span
		> tidak valid
	</p>
	<a href="/" class="mb-1 rounded-sm bg-blue-400 p-1 text-xs font-semibold text-white">Kembali</a>
{:else}
	<h1 class="mb-4 text-2xl font-bold">🗓️ History Tugas - {formatTanggal(data.slug)}</h1>
	<a href="/" class="mb-1 rounded-sm bg-blue-400 p-1 text-xs font-semibold text-white">Kembali</a>
	<div class="w-auto overflow-x-auto sm:overflow-hidden">
		<Table data={history.tugas} hidden={true} />
	</div>
{/if}
