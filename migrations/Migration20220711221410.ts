import { Migration } from '@mikro-orm/migrations';

export class Migration20220711221410 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `post` add `slug` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `post` drop `slug`;');
  }

}
