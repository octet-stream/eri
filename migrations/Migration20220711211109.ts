import { Migration } from '@mikro-orm/migrations';

export class Migration20220711211109 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `verification_token` (`token` varchar(255) not null, `expires` datetime not null, `identifier` varchar(255) not null, primary key (`token`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `verification_token` add unique `verification_token_token_identifier_unique`(`token`, `identifier`);');

    this.addSql('create table `user` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `login` varchar(255) not null, `email` varchar(255) not null, `email_verified` json null, `password` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_login_unique`(`login`);');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');

    this.addSql('create table `post` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null, `text` varchar(255) not null, `author_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `post` add index `post_author_id_index`(`author_id`);');

    this.addSql('create table `account` (`id` varchar(255) not null, `user_id` varchar(255) not null, `type` tinyint not null, `provider` varchar(255) not null, `provider_account_id` varchar(255) not null, `refresh_token` varchar(255) null, `access_token` varchar(255) null, `expires_at` int null, `token_type` varchar(255) null, `scope` varchar(255) null, `id_token` varchar(255) null, `session_state` varchar(255) null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `account` add index `account_user_id_index`(`user_id`);');
    this.addSql('alter table `account` add unique `account_provider_provider_account_id_unique`(`provider`, `provider_account_id`);');

    this.addSql('create table `session` (`id` varchar(255) not null, `user_id` varchar(255) not null, `expires` datetime not null, `session_token` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `session` add index `session_user_id_index`(`user_id`);');
    this.addSql('alter table `session` add unique `session_session_token_unique`(`session_token`);');

    this.addSql('alter table `post` add constraint `post_author_id_foreign` foreign key (`author_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `account` add constraint `account_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `session` add constraint `session_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
  }

}
