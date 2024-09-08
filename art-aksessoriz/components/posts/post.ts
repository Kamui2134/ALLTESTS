export class Post {
	public userId: number | null
	public id: number | null
	public title: string
	public body: string

	constructor(
		userId: number | null = null,
		id: number | null = null,
		title: string = '',
		body: string = ''
	) {
		this.userId = userId
		this.id = id
		this.title = title
		this.body = body
	}
}
