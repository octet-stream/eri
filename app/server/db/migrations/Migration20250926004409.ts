import {Migration} from "@mikro-orm/migrations"

export class Migration20250926004409 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      "create table `user` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` varchar(255) null default null, `email` varchar(255) not null, `email_verified` tinyint(1) not null default false, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
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
      "create table `session` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `token` varchar(255) not null, `expires_at` datetime not null, `ip_address` varchar(255) null default null, `user_agent` varchar(255) null default null, `user_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    )
    this.addSql(
      "alter table `session` add index `session_created_at_index`(`created_at`);"
    )
    this.addSql(
      "alter table `session` add index `session_updated_at_index`(`updated_at`);"
    )
    this.addSql(
      "alter table `session` add unique `session_token_unique`(`token`);"
    )
    this.addSql(
      "alter table `session` add index `session_user_id_index`(`user_id`);"
    )

    this.addSql(
      "create table `post` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` varchar(255) null default null, `title` varchar(255) not null, `content` json not null, `slug` varchar(512) not null, `author_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
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
      "create table `post_prev_known_slug` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` varchar(255) null default null, `slug` varchar(512) not null, `post_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
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
      "create table `passkey` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) null default null, `public_key` varchar(255) not null, `credential_id` varchar(255) not null, `counter` int unsigned not null default 0, `device_type` varchar(255) not null, `backed_up` tinyint(1) not null, `transports` varchar(255) not null, `user_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    )
    this.addSql(
      "alter table `passkey` add index `passkey_created_at_index`(`created_at`);"
    )
    this.addSql(
      "alter table `passkey` add index `passkey_updated_at_index`(`updated_at`);"
    )
    this.addSql(
      "alter table `passkey` add index `passkey_user_id_index`(`user_id`);"
    )

    this.addSql(
      "create table `account` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `account_id` varchar(255) not null, `provider_id` varchar(255) not null, `access_token` varchar(255) null default null, `refresh_token` varchar(255) null default null, `access_token_expires_at` datetime null default null, `refresh_token_expires_at` datetime null default null, `scope` varchar(255) null default null, `password` varchar(255) null default null, `user_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    )
    this.addSql(
      "alter table `account` add index `account_created_at_index`(`created_at`);"
    )
    this.addSql(
      "alter table `account` add index `account_updated_at_index`(`updated_at`);"
    )
    this.addSql(
      "alter table `account` add index `account_user_id_index`(`user_id`);"
    )

    this.addSql(
      "create table `verification` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `identifier` varchar(255) not null, `value` varchar(255) not null, `expires_at` datetime not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    )
    this.addSql(
      "alter table `verification` add index `verification_created_at_index`(`created_at`);"
    )
    this.addSql(
      "alter table `verification` add index `verification_updated_at_index`(`updated_at`);"
    )

    this.addSql(
      "alter table `session` add constraint `session_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;"
    )

    this.addSql(
      "alter table `post` add constraint `post_author_id_foreign` foreign key (`author_id`) references `user` (`id`) on update cascade;"
    )

    this.addSql(
      "alter table `post_prev_known_slug` add constraint `post_prev_known_slug_post_id_foreign` foreign key (`post_id`) references `post` (`id`) on update cascade;"
    )

    this.addSql(
      "alter table `passkey` add constraint `passkey_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;"
    )

    this.addSql(
      "alter table `account` add constraint `account_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;"
    )
  }
}
