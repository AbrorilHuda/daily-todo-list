<script lang="ts">
	import { state, formatTanggal, tambahTugas, hapusTugas, ubahSelesai } from '$lib/todo.svelte';
	import History from '../components/History.svelte';
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

<div class="mx-auto max-w-xl p-6">
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
		<table class="w-full border-collapse rounded-lg bg-white shadow-sm">
			<thead>
				<tr class="bg-gray-100 text-gray-700">
					<th class="px-4 py-3 text-left font-semibold">Name task</th>
					<th class="px-4 py-3 text-left font-semibold">Descripsion</th>
					<th class="px-4 py-3 text-left font-semibold">Type</th>
					<th class="px-4 py-3 text-left font-semibold">Status</th>
					<th class="w-24 px-4 py-3 text-left font-semibold">Action</th>
				</tr>
			</thead>
			<tbody>
				{#each state.tugas as tugas, i}
					<tr>
						<td class="px-4 py-3 font-bold text-gray-800">{tugas.teks}</td>
						<td>Tugass</td>
						<td>UAS</td>
						<td
							><span
								class="inline-flex items-center rounded-md px-2 py-1 text-sm {tugas.selesai
									? 'bg-green-50 text-green-700 ring-green-600/10 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-400/20'
									: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/10 ring-inset dark:bg-yellow-900/30 dark:text-yellow-400 dark:ring-yellow-400/20'}"
								>{tugas.selesai ? 'Selesai' : 'DiKerjakan'}</span
							>
						</td>
						<td class="px-4 py-3">
							<button
								class="cursor-pointer text-red-500 transition-colors hover:text-red-700"
								onclick={() => hapusTugas(i)}
								aria-label="Hapus tugas"
							>
								🗑
							</button>
							<button
								class="cursor-pointer text-green-500 transition-colors hover:text-green-700"
								onclick={() => ubahSelesai(i)}
								aria-label="Accept Tugas"
							>
								✅
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	/* .line-through {
		text-decoration: line-through;
		color: #888;
	} */
</style>
