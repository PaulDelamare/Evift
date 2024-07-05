/**
 * Converts a string representation of a boolean value to its corresponding boolean value.
 *
 * @param string - The string representation of the boolean value.
 * @return The boolean value corresponding to the input string.
 * @throws If the input string is not a valid boolean representation.
 */
export function convertStringToBoolean(string: string) {
	if (string === 'true') {
		return true;
	} else if (string === 'false') {
		return false;
	} else {
		throw new Error("La chaîne n'est pas un booléen valide");
	}
}
