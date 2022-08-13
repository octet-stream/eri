import { Migration } from '@mikro-orm/migrations';

export class Migration20220813023058 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `login` varchar(255) not null, `email` varchar(255) not null, `email_verified` json null, `password` varchar(255) not null, `role` enum(\'super\', \'regular\') not null default \'regular\', primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_login_unique`(`login`);');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');

    this.addSql('create table `post` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null, `content` json not null, `slug` varchar(255) not null, `author_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `post` add unique `post_slug_unique`(`slug`);');
    this.addSql('alter table `post` add index `post_author_id_index`(`author_id`);');

    this.addSql('create table `invitation_code` (`code` varchar(255) not null, `issuer_id` varchar(255) not null, `email` varchar(255) not null, `created_at` datetime not null, primary key (`code`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `invitation_code` add index `invitation_code_issuer_id_index`(`issuer_id`);');

    this.addSql('alter table `post` add constraint `post_author_id_foreign` foreign key (`author_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `invitation_code` add constraint `invitation_code_issuer_id_foreign` foreign key (`issuer_id`) references `user` (`id`) on update cascade;');
  }

}
