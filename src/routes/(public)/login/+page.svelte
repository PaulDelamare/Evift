<script lang="ts">
    import Login from '$lib/components/public/login/Login.svelte';
import PageLayout from '$lib/components/structure/PageLayout.svelte';
    
</script>

<PageLayout>
    <!-- Section with wrap for Display Content -->
    <section class="wrap px-8">
        <!-- Bodrer radius and Overflow hidden for have rounded in the two components -->
        <div class="rounded-xl overflow-hidden">
            <Login />
        </div>
    </section>
</PageLayout>