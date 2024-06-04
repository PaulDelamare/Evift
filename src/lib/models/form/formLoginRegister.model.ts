interface Input {
	type: 'password' | 'text';
	label: string;
	name: string;
	value: string;
	onInput?: (event: Event) => void;
}

interface GroupInput {
	type: 'group';
	inputs: Input[];
}

export type FormInput = Input | GroupInput;
