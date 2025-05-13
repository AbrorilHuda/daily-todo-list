<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="mx-auto max-w-xl p-6">
	{@render children()}
</div>
