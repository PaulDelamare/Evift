<script lang="ts">
	import { onMount } from 'svelte';

	type BeforeInstallPromptEvent = Event & {
		prompt: () => void;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	};

	let deferredPrompt: BeforeInstallPromptEvent | null;
	let showInstallButton = false;
	let isIOS = false;
	let isStandalone = false;
	let showInstallMessage = true;

	function setInstalledFlag() {
		localStorage.setItem('pwa_installed', 'true');
		document.cookie = 'pwa_installed=true; path=/; SameSite=Lax';
	}

	onMount(() => {
		isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);

		isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as any).standalone ||
			document.referrer.includes('android-app://');

		if (isStandalone) {
			setInstalledFlag();
			return;
		}

		if (typeof window !== 'undefined' && !isIOS) {
			window.addEventListener('beforeinstallprompt', (event) => {
				event.preventDefault();
				deferredPrompt = event as BeforeInstallPromptEvent;
				showInstallButton = true;

				setTimeout(() => {
					showInstallButton = false;
				}, 20000);
			});

			window.addEventListener('appinstalled', () => {
				showInstallButton = false;
				setInstalledFlag();
				console.info('✅ Application installée avec succès!');
			});
		}
	});

	function installApp() {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.info("✅ L'utilisateur a installé l'app");
					setInstalledFlag();
				} else {
					console.info("❌ L'utilisateur a refusé");
				}
				deferredPrompt = null;
				showInstallButton = false;
			});
		}
	}

	function closeInstallMessage() {
		showInstallMessage = false;
	}
</script>

{#if showInstallButton && !isIOS && !isStandalone}
	<button on:click={installApp} class="install-button bg-primary-500">
		Installer l'application
	</button>
{/if}

{#if isIOS && !isStandalone && showInstallMessage}
	<div class="install-message">
		<button class="close-btn" on:click={closeInstallMessage} aria-label="Fermer">&times;</button>
		<p class="text-center">
			Pour installer cette application, appuyez sur <span class="icon">↑</span> puis sur "Ajouter à l'écran
			d'accueil"
		</p>
	</div>
{/if}

<style>
	.install-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		color: white;
		padding: 10px 20px;
		border-radius: 10px;
		font-size: 16px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border: none;
		cursor: pointer;
		z-index: 1000;
	}

	.install-button:hover {
		background: #4c562a;
	}

	.install-message {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: #630c78;
		color: white;
		padding: 10px 20px;
		border-radius: 10px;
		font-size: 14px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		max-width: 90%;
		text-align: center;
		z-index: 1000;
	}

	.close-btn {
		position: absolute;
		top: 5px;
		right: 10px;
		background: transparent;
		border: none;
		color: white;
		font-size: 22px;
		cursor: pointer;
	}

	.icon {
		font-size: 18px;
		display: inline-block;
		margin: 0 3px;
	}
</style>
