import {Migration} from "@mikro-orm/migrations"

export class Migration20260508140455 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      "create table `user` (`id` text not null primary key, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` datetime null, `email` text not null, `email_verified` integer not null default false);"
    )
    this.addSql(
      "create index `user_created_at_index` on `user` (`created_at`);"
    )
    this.addSql(
      "create index `user_updated_at_index` on `user` (`updated_at`);"
    )
    this.addSql(
      "create index `user_removed_at_index` on `user` (`removed_at`);"
    )
    this.addSql("create unique index `user_email_unique` on `user` (`email`);")

    this.addSql(
      "create table `session` (`id` text not null primary key, `created_at` datetime not null, `updated_at` datetime not null, `token` text not null, `expires_at` datetime not null, `ip_address` text null, `user_agent` text null, `user_id` text not null, constraint `session_user_id_foreign` foreign key (`user_id`) references `user` (`id`));"
    )
    this.addSql(
      "create index `session_created_at_index` on `session` (`created_at`);"
    )
    this.addSql(
      "create index `session_updated_at_index` on `session` (`updated_at`);"
    )
    this.addSql(
      "create unique index `session_token_unique` on `session` (`token`);"
    )
    this.addSql(
      "create index `session_user_id_index` on `session` (`user_id`);"
    )

    this.addSql(
      "create table `post` (`id` text not null primary key, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` datetime null, `title` text not null, `slug` text not null, `content` json not null, `author_id` text not null, constraint `post_author_id_foreign` foreign key (`author_id`) references `user` (`id`));"
    )
    this.addSql(
      "create index `post_created_at_index` on `post` (`created_at`);"
    )
    this.addSql(
      "create index `post_updated_at_index` on `post` (`updated_at`);"
    )
    this.addSql(
      "create index `post_removed_at_index` on `post` (`removed_at`);"
    )
    this.addSql("create unique index `post_slug_unique` on `post` (`slug`);")
    this.addSql("create index `post_author_id_index` on `post` (`author_id`);")

    this.addSql(
      "create table `post_prev_known_slug` (`id` text not null primary key, `created_at` datetime not null, `updated_at` datetime not null, `removed_at` datetime null, `slug` text not null, `post_id` text not null, constraint `post_prev_known_slug_post_id_foreign` foreign key (`post_id`) references `post` (`id`));"
    )
    this.addSql(
      "create index `post_prev_known_slug_created_at_index` on `post_prev_known_slug` (`created_at`);"
    )
    this.addSql(
      "create index `post_prev_known_slug_updated_at_index` on `post_prev_known_slug` (`updated_at`);"
    )
    this.addSql(
      "create index `post_prev_known_slug_removed_at_index` on `post_prev_known_slug` (`removed_at`);"
    )
    this.addSql(
      "create unique index `post_prev_known_slug_slug_unique` on `post_prev_known_slug` (`slug`);"
    )
    this.addSql(
      "create index `post_prev_known_slug_post_id_index` on `post_prev_known_slug` (`post_id`);"
    )

    this.addSql(
      "create table `passkey` (`id` text not null primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` text null, `public_key` text not null, `credential_id` text not null, `counter` integer not null, `device_type` text not null, `backed_up` integer not null, `transports` text not null, `aaguid` text null, `user_id` text not null, constraint `passkey_user_id_foreign` foreign key (`user_id`) references `user` (`id`));"
    )
    this.addSql(
      "create index `passkey_created_at_index` on `passkey` (`created_at`);"
    )
    this.addSql(
      "create index `passkey_updated_at_index` on `passkey` (`updated_at`);"
    )
    this.addSql(
      "create index `passkey_user_id_index` on `passkey` (`user_id`);"
    )

    this.addSql(
      "create table `account` (`id` text not null primary key, `created_at` datetime not null, `updated_at` datetime not null, `account_id` text not null, `provider_id` text not null, `access_token` text null, `refresh_token` text null, `access_token_expires_at` datetime null, `refresh_token_expires_at` datetime null, `scope` text null, `password` text null, `id_token` text null, `user_id` text not null, constraint `account_user_id_foreign` foreign key (`user_id`) references `user` (`id`));"
    )
    this.addSql(
      "create index `account_created_at_index` on `account` (`created_at`);"
    )
    this.addSql(
      "create index `account_updated_at_index` on `account` (`updated_at`);"
    )
    this.addSql(
      "create index `account_user_id_index` on `account` (`user_id`);"
    )

    this.addSql(
      "create table `verification` (`id` text not null primary key, `created_at` datetime not null, `updated_at` datetime not null, `identifier` text not null, `value` text not null, `expires_at` datetime not null);"
    )
    this.addSql(
      "create index `verification_created_at_index` on `verification` (`created_at`);"
    )
    this.addSql(
      "create index `verification_updated_at_index` on `verification` (`updated_at`);"
    )
  }
}
