<script lang="ts">
	import { state, formatTanggal, tambahTugas } from '$lib/todo.svelte';
	import History from '../components/History.svelte';
	import Table from '../components/Table.svelte';
	$effect(() => {
		try {
			const tersimpan = localStorage.getItem(state.kunci);
			if (tersimpan) {
				state.tugas = JSON.parse(tersimpan);
			}
		} catch (error) {
			console.error('Gagal memuat tugas dari localStorage:', error);
		}
	});

	// Simpan tugas ke localStorage saat tugas berubah
	$effect(() => {
		try {
			localStorage.setItem(state.kunci, JSON.stringify(state.tugas));
		} catch (error) {
			console.error('Gagal menyimpan tugas ke localStorage:', error);
		}
	});
</script>

<h1 class="mb-4 text-2xl font-bold">🗓️ Daftar Tugas Harian - {formatTanggal(state.kunci)}</h1>

<div class="mb-4 flex flex-wrap gap-2">
	<input
		class="flex-1 rounded border px-3 py-2 shadow"
		placeholder="Tulis tugas hari ini..."
		bind:value={state.tugasBaru}
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
	<Table data={state.tugas} />
</div>
