<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="page_404 flex justify-center">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<div class="col-sm-10 col-sm-offset-1 text-center">
					<div class="four_zero_four_bg">
						<h2 class="text-center">{$page.status}</h2>
					</div>

					<div class="contant_box_404 flex flex-col gap-4 items-center">
						<h3 class="h2">Vous avez l'air perdu</h3>

						<p>{$page.error?.message}</p>

						<a href="/" class="link_404 !font-slab uppercase !font-bold bg-gradient px-4 py-2 text-surface-500">Retour à l'accueil</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.page_404 {
		padding: 40px 0;
		background: #fff;
        background-repeat: no-repeat;
	}

	.page_404 img {
		width: 100%;
        background-repeat: no-repeat;
	}

	.four_zero_four_bg {
		background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
		height: 400px;
		background-position: center;
        background-repeat: no-repeat;
	}

	.four_zero_four_bg h1 {
		font-size: 80px;
	}

	.four_zero_four_bg h3 {
		font-size: 80px;
	}

	.contant_box_404 {
		margin-top: -50px;
	}
</style>
