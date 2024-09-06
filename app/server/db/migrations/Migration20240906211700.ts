import {Migration} from "@mikro-orm/migrations"

export class Migration20240906211700 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      "create table `user` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` datetime null default null, `email` varchar(255) not null, `password` varchar(255) not null, `attributes` json not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    )
    this.addSql(
      "alter table `user` add index `user_created_at_index`(`created_at`);"
    )
    this.addSql(
      "alter table `user` add index `user_updated_at_index`(`updated_at`);"
    )
    this.addSql(
      "alter table `user` add index `user_removed_at_index`(`removed_at`);"
    )
    this.addSql("alter table `user` add unique `user_email_unique`(`email`);")

    this.addSql(
      "create table `session` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `expires_at` datetime not null, `attributes` json not null, `user_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    )
    this.addSql(
      "alter table `session` add index `session_created_at_index`(`created_at`);"
    )
    this.addSql(
      "alter table `session` add index `session_updated_at_index`(`updated_at`);"
    )
    this.addSql(
      "alter table `session` add index `session_user_id_index`(`user_id`);"
    )

    this.addSql(
      "create table `post` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` datetime null default null, `title` varchar(255) not null, `content` json not null, `slug` varchar(512) not null, `author_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    )
    this.addSql(
      "alter table `post` add index `post_created_at_index`(`created_at`);"
    )
    this.addSql(
      "alter table `post` add index `post_updated_at_index`(`updated_at`);"
    )
    this.addSql(
      "alter table `post` add index `post_removed_at_index`(`removed_at`);"
    )
    this.addSql("alter table `post` add unique `post_slug_unique`(`slug`);")
    this.addSql(
      "alter table `post` add index `post_author_id_index`(`author_id`);"
    )

    this.addSql(
      "alter table `session` add constraint `session_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;"
    )

    this.addSql(
      "alter table `post` add constraint `post_author_id_foreign` foreign key (`author_id`) references `user` (`id`) on update cascade;"
    )
  }
}
