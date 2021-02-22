const parseData = (data: any) => {
	const arr = []
	for (const key in data) {
		const item = {
			id: key,
			...data[key]
		}
		arr.push(item)
	}
	return arr
}

export { parseData }