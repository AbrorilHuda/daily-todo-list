<script lang="ts">
	let deferredPrompt: any = $state(null);
	let showInstallPrompt = $state(false);

	$effect(() => {
		const handler = (e: Event) => {
			e.preventDefault();
			deferredPrompt = e;
			showInstallPrompt = true;
		};

		window.addEventListener('beforeinstallprompt', handler);
		return () => {
			window.removeEventListener('beforeinstallprompt', handler);
		};
	});

	$effect(() => {
		if (window.matchMedia('(display-mode: standalone)').matches) {
			showInstallPrompt = false;
		}
	});

	async function handleInstall() {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			console.log('Pengguna menerima instalasi PWA');
		} else {
			console.log('Pengguna membatalkan instalasi PWA');
		}

		deferredPrompt = null;
		showInstallPrompt = false;
	}

	function closePrompt() {
		showInstallPrompt = false;
		deferredPrompt = null;
	}
</script>

{#if showInstallPrompt}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-transparent">
		<div class="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
			<h2 class="mb-2 text-xl font-semibold">Install Daily Todo List</h2>
			<p class="mb-4">Ingin menginstall aplikasi ini untuk akses lebih cepat dan offline?</p>
			<div class="flex justify-around">
				<button
					onclick={handleInstall}
					class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					Install
				</button>
				<button
					onclick={closePrompt}
					class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
				>
					Nanti
				</button>
			</div>
		</div>
	</div>
{/if}
