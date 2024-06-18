interface Input {
	type: 'password' | 'text';
	label: string;
	name: string;
	value: string;
	onInput?: (event: Event) => void;
	error: string | undefined;
}

interface GroupInput {
	type: 'group';
	inputs: Input[];
}

export type FormInput = Input | GroupInput;
