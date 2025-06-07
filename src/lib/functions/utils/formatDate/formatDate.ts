export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
}

export const formatTime = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
	return new Date(date).toLocaleTimeString('fr-FR', options);
}