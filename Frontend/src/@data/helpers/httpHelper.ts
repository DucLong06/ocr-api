export const httpHelper = () => {
	const customFetch = async (url: any, options: any = {}) => {
		const defaultMethod = "GET"
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}
		const controller = new AbortController()
		options.signal = controller.signal

		options.method = options.method || defaultMethod
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders

		options.body = JSON.stringify(options.body) || false
		if (!options.body) delete options.body

		setTimeout(() => {
			controller.abort()
		}, 3000)

		try {
			const response = await fetch(url, options)
			return await response.json()
		} catch (err) {
			return err
		}
	}

	const get = (url: any, options: any = {}) => customFetch(url, options)

	const post = (url: any, options: any) => {
		options.method = "POST"
		return customFetch(url, options)
	}

	const put = (url: any, options: any) => {
		options.method = "PUT"
		return customFetch(url, options)
	}

	const del = (url: any, options: any) => {
		options.method = "DELETE"
		return customFetch(url, options)
	}

	return {
		get,
		post,
		put,
		del,
	}
}