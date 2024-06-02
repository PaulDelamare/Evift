<script lang="ts">
	import FormLoginRegister from "../FormLoginRegister.svelte";

    // Import Variable
    // For know if it's register or login activated
    export let loginActivated = true;
    // Pass email to register if user do mistake
    export let email = '';
    // Function for stock email in variable do on on:input email
    export let handleEmailChange: (event: Event) => void
</script>

<!-- If login Activated, display form Login -->
{#if loginActivated}
    <!-- Send information to form -->
    <!-- Send Title/Action/Inputs/onSubmit Function/textSubmit/forgotPassword -->
    <FormLoginRegister
        title="Connexion"
        action="?/login"
        inputs={
            // Display Inputs
            [
                // Email Input
                {
                    type: 'text',
                    label: 'Email',
                    name: 'email',
                    value: email,
                    onInput: handleEmailChange
                },
                // Password Input
                {
                    type: 'password',
                    label: 'Mot de passe',
                    name: 'password',
                    value: '',
                },
            ]
        }

        onSubmit = {() => {console.log("submit")}}
        textSubmit="Connexion"
        forgotPassword
    />
{/if}
