import {DeepPartial, EntityRepository, Repository, SaveOptions} from "typeorm"
import {Service} from "typedi"
import {format} from "date-fns"

import createSlug from "server/lib/helper/util/createSlug"

import Post from "server/entity/Post"

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
    created.createdAt = now
    created.updatedAt = now

    return this.save(created, options)
  }
}

export default PostRepo
