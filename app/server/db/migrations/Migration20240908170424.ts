import {Migration} from "@mikro-orm/migrations"

export class Migration20240908170424 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      "create table `post_prev_known_slug` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` datetime null default null, `slug` varchar(512) not null, `post_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    )
    this.addSql(
      "alter table `post_prev_known_slug` add index `post_prev_known_slug_created_at_index`(`created_at`);"
    )
    this.addSql(
      "alter table `post_prev_known_slug` add index `post_prev_known_slug_updated_at_index`(`updated_at`);"
    )
    this.addSql(
      "alter table `post_prev_known_slug` add index `post_prev_known_slug_removed_at_index`(`removed_at`);"
    )
    this.addSql(
      "alter table `post_prev_known_slug` add unique `post_prev_known_slug_slug_unique`(`slug`);"
    )
    this.addSql(
      "alter table `post_prev_known_slug` add index `post_prev_known_slug_post_id_index`(`post_id`);"
    )

    this.addSql(
      "alter table `post_prev_known_slug` add constraint `post_prev_known_slug_post_id_foreign` foreign key (`post_id`) references `post` (`id`) on update cascade;"
    )
  }

  override async down(): Promise<void> {
    this.addSql("drop table if exists `post_prev_known_slug`;")
  }
}
