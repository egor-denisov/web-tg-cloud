export const makeNameShorter = (name: string, length = 13) => {
	if (name.length <= 13) return name
	return name.slice(0, 4) + '...' + name.slice(name.length - 6, name.length)
}

export const iso2date = (date: string) => {
	var d = new Date(date)
	return (
		('0' + d.getDate()).slice(-2) +
		'.' +
		('0' + (d.getMonth() + 1)).slice(-2) +
		'.' +
		d.getFullYear() +
		' ' +
		('0' + d.getHours()).slice(-2) +
		':' +
		('0' + d.getMinutes()).slice(-2)
	)
}

export const formatBytes = (bytes: number, decimals = 2) => {
	if (!+bytes) return '0 Bytes'
	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
