<script lang="ts">
	import { hapusTugas, ubahSelesai } from '$lib/todo.svelte';
	let props = $props();
</script>

<table class="w-full border-collapse rounded-lg bg-white shadow-sm">
	<thead>
		<tr class="bg-gray-100 text-gray-700">
			<th class="px-4 py-3 text-left font-semibold">Name task</th>
			<th class="px-4 py-3 text-left font-semibold">Descripsion</th>
			<th class="px-4 py-3 text-left font-semibold">Type</th>
			<th class="px-4 py-3 text-left font-semibold">Status</th>
			<th class="w-24 px-4 py-3 text-left font-semibold {props.hidden ? 'hidden' : ''}">Action</th>
		</tr>
	</thead>
	<tbody>
		{#each props.data as tugas, i}
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
						class="cursor-pointer text-red-500 transition-colors hover:text-red-700 {props.hidden
							? 'hidden'
							: ''}"
						onclick={() => hapusTugas(i)}
						aria-label="Hapus tugas"
					>
						🗑
					</button>
					<button
						class="cursor-pointer text-green-500 transition-colors hover:text-green-700 {props.hidden
							? 'hidden'
							: ''}"
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
