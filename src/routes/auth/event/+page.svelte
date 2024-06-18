<script lang="ts">
	import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<h1>Event</h1>

<form use:enhance action="?/logout" method="post">
    <button type="submit">
        Submit
    </button>

</form>