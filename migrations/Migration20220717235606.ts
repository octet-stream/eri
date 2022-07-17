import { Migration } from '@mikro-orm/migrations';

export class Migration20220717235606 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `post` drop `text`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `post` add `text` varchar(255) not null;');
  }

}
