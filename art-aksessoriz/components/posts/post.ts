export class Post {
	public userId: number
	public id: number
	public title: string
	public body: string

	constructor(
		userId: number = 0,
		id: number = 0,
		title: string = '',
		body: string = ''
	) {
		this.userId = userId
		this.id = id
		this.title = title
		this.body = body
	}
}
