import sanityClient from '@sanity/client'

export const client = sanityClient({
	projectId: 'j1o8b2be',
	dataset: 'production',
	apiVersion: '2021-03-25',
	token: 'skPPF98tL9ol3yw4MoA1HQHTc9KM7L5Rq8SqbVufmyMUWiTSHecHtkoyyuTRdMJoCQ8AumLmTboIC2CFa0a1QTukG4I7bllSPf7X3qoCzX51Qi9ZZYSt6Cxam49eLr2mVM6lVgRcCJMZfoYPtHWB2xAzBk8eGAZeF2rECHfWEtuQHtjX1Jvw',
	useCdn: false,
})