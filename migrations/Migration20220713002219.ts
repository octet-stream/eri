import { Migration } from '@mikro-orm/migrations';

export class Migration20220713002219 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `invitation_code` (`code` varchar(255) not null, `issuer_id` varchar(255) not null, `email` varchar(255) not null, `created_at` datetime not null, primary key (`code`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `invitation_code` add index `invitation_code_issuer_id_index`(`issuer_id`);');

    this.addSql('alter table `invitation_code` add constraint `invitation_code_issuer_id_foreign` foreign key (`issuer_id`) references `user` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `invitation_code`;');
  }

}
