export function formatDate(date: Date) {
	return new Date(date).toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
}
