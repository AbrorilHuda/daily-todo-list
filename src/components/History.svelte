<!-- model button untuk history -->

<script lang="ts">
	import { ambilSemuaStorage, formatTanggal } from '$lib/todo.svelte';
	import { goto } from '$app/navigation';

	let showModal = false;
	let selectHistoryTask = '';

	function toggleModal() {
		showModal = !showModal;
	}

	function loopTugas(historytugas: any[]) {
		let tugas = '';
		for (let i = 0; i < historytugas.length; i++) {
			tugas += historytugas[i].teks.toString();
			if (i < historytugas.length - 1) {
				tugas += ', ';
			}
		}
		return tugas.toLowerCase();
	}

	function selectHistory(event: Event) {
		const target = event.target as HTMLInputElement;
		selectHistoryTask = target.value;
	}

	function nextStep() {
		if (selectHistoryTask) {
			goto(`/history/${selectHistoryTask}`);
		} else {
			alert('Please select a job.');
		}
	}
</script>

<!-- Toggle Button -->
<button
	class="cursor-pointer rounded bg-orange-400 px-4 py-2 text-white shadow"
	onclick={toggleModal}
>
	🕧
</button>

<!-- Modal -->
{#if showModal}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-transparent shadow-lg"
	>
		<div class="relative max-h-full w-full max-w-md p-4">
			<div class="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
				<!-- Modal Header -->
				<div
					class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600"
				>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Pilih History</h3>
					<button
						onclick={toggleModal}
						class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"
							><path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/></svg
						>
						<span class="sr-only">Close modal</span>
					</button>
				</div>

				<!-- Modal Body -->
				<div class="p-4 md:p-5">
					<p class="mb-4 text-gray-500 dark:text-gray-400">
						Pilih dari list history di bawah ini dan klik tombol
					</p>
					<ul class="mb-4 space-y-4">
						{#if ambilSemuaStorage().length === 0}
							<h1 class="text-center font-bold text-orange-500">History Tidak ada</h1>
						{/if}
						{#each ambilSemuaStorage() as history, i}
							<li>
								<input
									type="radio"
									id={history.kunci}
									name="job"
									value={history.kunci}
									class="peer hidden"
									onchange={selectHistory}
								/>
								<label
									for={history.kunci}
									class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-900 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:peer-checked:border-blue-600 dark:peer-checked:text-blue-500 dark:hover:bg-gray-500 dark:hover:text-gray-300"
								>
									<div class="block">
										<div class="w-full text-lg font-semibold">{formatTanggal(history.kunci)}</div>
										<div class="w-full text-gray-500 dark:text-gray-400">
											{history.tugas == ''
												? 'Sekarang'
												: loopTugas(history.tugas).slice(0, 30) + '...'}
										</div>
									</div>
									<svg
										class="ms-3 h-4 w-4 text-gray-500 rtl:rotate-180 dark:text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 10"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M1 5h12m0 0L9 1m4 4L9 9"
										/>
									</svg>
								</label>
							</li>
						{/each}
					</ul>
					<button
						onclick={nextStep}
						class="inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Pilih
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
