export class Post {
	public readonly userId: number
	public readonly id: number
	public readonly title: string
	public readonly body: string

	constructor(userId: number,id: number, title: string, body: string) {
        this.userId = userId
		this.id = id
		this.title = title
		this.body = body
	}
}
