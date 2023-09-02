export const makeNameShorter = (name: string, length = 13) => {
	if (name.length <= 13) return name
	return name.slice(0, 4) + '...' + name.slice(name.length - 6, name.length)
}
