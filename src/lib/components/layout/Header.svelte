<script>

    // Imports
	import Burger from "../extra/header/Burger.svelte";
    import Logo from "../svg/Logo.svelte";
	import Navigation from "./Navigation.svelte";

</script>
 
<!-- Bloc for Header -->
<div class="wrap py-2 px-8 between items-end relative">

    <!-- Display Logo -->
    <Logo gradient text link h1/>

    <!-- TODO Add condition for Loged Nav -->
    <!-- For Desktop Display Navigation -->
    <Navigation navClass="tablet:hidden" ulClass="gap-12" hover/>

    <!-- For Responsive Display Burger Menu -->
    <Burger divClass="hidden tablet:block" />
</div>
