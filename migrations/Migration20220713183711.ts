import { Migration } from '@mikro-orm/migrations';

export class Migration20220713183711 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists `verification_token`;');
  }

  async down(): Promise<void> {
    this.addSql('create table `verification_token` (`token` varchar(255) not null, `expires` datetime not null, `identifier` varchar(255) not null, primary key (`token`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `verification_token` add unique `verification_token_token_identifier_unique`(`token`, `identifier`);');
  }

}
