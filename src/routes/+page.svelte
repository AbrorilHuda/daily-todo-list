<script lang="ts">
	import { stateData, formatTanggal, tambahTugas } from '$lib/todo.svelte';
	import History from '../components/History.svelte';
	import PopUp from '../components/PopUp.svelte';
	import Table from '../components/Table.svelte';
	let isOffline = $state(false);

	$effect(() => {
		const updateOfflineStatus = () => {
			isOffline = !navigator.onLine;
		};
		window.addEventListener('online', updateOfflineStatus);
		window.addEventListener('offline', updateOfflineStatus);
		updateOfflineStatus();

		return () => {
			window.removeEventListener('online', updateOfflineStatus);
			window.removeEventListener('offline', updateOfflineStatus);
		};
	});

	$effect(() => {
		try {
			const tersimpan = localStorage.getItem(stateData.kunci);
			if (tersimpan) {
				stateData.tugas = JSON.parse(tersimpan);
			}
		} catch (error) {
			console.error('Gagal memuat tugas dari localStorage:', error);
		}
	});

	// Simpan tugas ke localStorage saat tugas berubah
	$effect(() => {
		try {
			localStorage.setItem(stateData.kunci, JSON.stringify(stateData.tugas));
		} catch (error) {
			console.error('Gagal menyimpan tugas ke localStorage:', error);
		}
	});
</script>

{#if isOffline}
	<p class="text-red-600">Anda Sedang Offline</p>
{/if}

<h1 class="mb-4 text-2xl font-bold">🗓️ Daftar Tugas Harian - {formatTanggal(stateData.kunci)}</h1>

<div class="mb-4 flex flex-wrap gap-2">
	<input
		class="flex-1 rounded border px-3 py-2 shadow"
		placeholder="Tulis tugas hari ini..."
		bind:value={stateData.tugasBaru}
		onkeydown={(e) => e.key === 'Enter' && tambahTugas()}
	/>
	<button
		class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white shadow"
		onclick={tambahTugas}
	>
		Tambah
	</button>
	<History />
</div>

<div class="w-auto overflow-x-auto sm:overflow-hidden">
	<Table data={stateData.tugas} />
</div>

<PopUp />
