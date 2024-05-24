<script>
    import Typewriter from 'svelte-typewriter'

    let text = 0;
    setInterval(() => {
        text ++;
        if(text >= 3) text = 0
    }, 12000);

</script>
  
  
<section class="bg-secondaryGradient h-[50rem] max-h-[94svh]">
    <div class="wrap h-full between px-12 gap-8 tablet:flex-col tablet:py-12 tablet:px-4 tablet:justify-evenly">
        <div class="column w-2/5 mini-desk:w-3/5 text-center gap-8 text-surface-500 tablet:w-full ">
            <Typewriter interval={60} cursor = {false} unwriteInterval = {0}> 
                {#if text == 0}
                    <h2 class="text-shadow-custom">Créez votre événement</h2>
                {:else if text == 1}
                    <h2 class="text-shadow-custom">Rejoingnez un événement</h2>
                {:else if text == 2}
                    <h2 class="text-shadow-custom">Créez votre liste de cadeaux</h2>
                {/if}
            </Typewriter>
            <Typewriter interval={30} cursor = {false} unwriteInterval = {0}>
                {#if text == 0}
                    <h4 class="text-shadow-custom tablet:text-xl">Pour Noël, un anniversaire ou tout autre occasion !</h4>
                {:else if text == 1}
                    <h4 class="text-shadow-custom tablet:text-xl">Pour y participer et consulter l'organisation super simplement !</h4>
                {:else if text == 2}
                    <h4 class="text-shadow-custom tablet:text-xl">Pour que vos proches puissent vous rendre heureux !</h4>
                {/if}
            </Typewriter>
            <a href="/connexion" class="nav px-12 py-2 bg-secondary-500 rounded-xl shadow-custom">
                Je commence
            </a>
        </div>
        <div class="w-[719px] mini-desk:max-w-[400px] tablet:!w-full mockup">
            <img class="w-full" src="/mockup/mockup-evift.png" alt="Mockup du site EVIFT sur appareil mobile et tablette, montrant la page d'accueil avec un événement en vedette et une liste des événements à venir" />
        </div>
    </div>
</section>

<style>
    .mockup {
		animation: bounce 7s infinite ease;
	}
    @keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-30px) rotate(2deg);
		}
		100% {
			transform: translateY(0);
		}
	}

</style>