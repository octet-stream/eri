import {DeepPartial, EntityRepository, Repository, SaveOptions} from "typeorm"
import {Service} from "typedi"
import {format} from "date-fns"

import createSlug from "lib/helper/util/createSlug"

import Post from "entity/Post"

const MASK = "yyyy/MM/dd"

@Service()
@EntityRepository(Post)
class PostRepo extends Repository<Post> {
  async createAndSave(
    userId: number,
    post: DeepPartial<Post>,
    options?: SaveOptions
  ): Promise<Post> {
    const created = this.create(post)
    const now = new Date()

    created.slug = `${format(now, MASK)}/${createSlug(post.title)}`
    created.authorId =  userId

    // Set dates for Post manually because we need the creating date in slug
    created.createdAt = now
    created.updatedAt = now

    return this.save(created, options)
  }
}

export default PostRepo
