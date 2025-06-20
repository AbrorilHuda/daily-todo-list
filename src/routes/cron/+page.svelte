<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import { tick } from 'svelte';

	const minute = writable('*');
	const hour = writable('*');
	const dayMonth = writable('*');
	const month = writable('*');
	const dayWeek = writable('*');
	const command = writable('echo Hello');

	const cronString = derived(
		[minute, hour, dayMonth, month, dayWeek, command],
		([$minute, $hour, $dayMonth, $month, $dayWeek, $command]) =>
			`${$minute} ${$hour} ${$dayMonth} ${$month} ${$dayWeek} ${$command}`
	);
	let copied = $state(false);
	async function copyToClipboard() {
		try {
			const value = $cronString;
			await navigator.clipboard.writeText(value);
			copied = true;
			await tick();
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			alert('Gagal menyalin. Coba salin manual.');
		}
	}
</script>

<div class="mx-auto max-w-xl space-y-4 p-4">
	<h1 class="text-center text-2xl font-bold">🕒 Cron Schedule Generator</h1>
	<div class="space-y-4 rounded-xl bg-white p-4 shadow">
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="minute" class="block font-medium">Menit (0-59)</label>
				<input id="minute" bind:value={$minute} class="w-full rounded border px-2 py-1" />
			</div>
			<div>
				<label for="hour" class="block font-medium">Jam (0-23)</label>
				<input id="hour" bind:value={$hour} class="w-full rounded border px-2 py-1" />
			</div>
			<div>
				<label for="dayMonth" class="block font-medium">Hari (1-31)</label>
				<input id="dayMonth" bind:value={$dayMonth} class="w-full rounded border px-2 py-1" />
			</div>
			<div>
				<label for="month" class="block font-medium">Bulan (1-12)</label>
				<input id="month" bind:value={$month} class="w-full rounded border px-2 py-1" />
			</div>
			<div>
				<label for="dayWeek" class="block font-medium">Hari (0-7, Minggu = 0/7)</label>
				<input id="dayWeek" bind:value={$dayWeek} class="w-full rounded border px-2 py-1" />
			</div>
		</div>

		<div>
			<label for="command" class="block font-medium">Perintah yang dijalankan</label>
			<input id="command" bind:value={$command} class="w-full rounded border px-2 py-1" />
		</div>

		<div>
			<label for="textarea" class="block font-medium">Output Cron:</label>
			<textarea
				id="textarea"
				readonly
				bind:value={$cronString}
				class="w-full rounded border px-2 py-1 font-mono"
			></textarea>
		</div>

		<button
			onclick={copyToClipboard}
			class="flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-white {copied
				? 'copy-success'
				: 'copy-default bg-blue-600 hover:bg-blue-700'}"
		>
			{#if copied}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="animate-ping-slow h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="animate-fade">Tersalin!</span>
			{:else}
				<span>Salin Cron String</span>
			{/if}
		</button>
	</div>
</div>

<style>
	.copy-success {
		background-color: #10b981; /* green-500 */
		transition: all 0.3s ease-in-out;
		transform: scale(1.05);
	}
	.copy-default {
		transition: all 0.3s ease-in-out;
	}
</style>
