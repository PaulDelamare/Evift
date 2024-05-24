<script lang="ts">

    const stapes = [
        {
            number: '01',
            description: 'Je crée gratuitement mon compte Evift'
        },
        {
            number: '02',
            description: 'J’ajoute ma famille ou mes amis en “Amis”'
        },
        {
            number: '03',
            description: 'Je crée mon évènement en ajoutant mes amis à cette évènement'
        },
        {
            number: '04',
            description: 'Je gère de manière simplifier mon évènement pour qu’il se déroule au mieux'
        }
    ];
    
</script>

<section>
    <div class="wrap w-full between items-start px-8 mini-desk:flex-col mini-desk:gap-12 mini-tablet:px-4">
        <h3 class="w-2/6 mini-desk:w-full mini-desk:text-center">
            Votre évènement crée en <b class="text-gradient">quatres étapes</b>
        </h3>
        <div class="w-3/5 column gap-6 mini-desk:w-full">
            {#each stapes as stape}
                <div class="bg-gradient p-[2px] w-full rounded-lg  hover:scale-105 custom-transition">
                    <div class="w-full flex items-center gap-6 bg-surface-500 px-8 py-4 rounded-[calc(0.5rem_-_2px)] min-h-24 mini-tablet:px-4">
                        <p class="number">{stape.number}</p>
                        <p class="information mini-tablet:text-base">{stape.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
