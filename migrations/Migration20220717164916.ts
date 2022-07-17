import { Migration } from '@mikro-orm/migrations';

export class Migration20220717164916 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `post` add `content` json not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `post` drop `content`;');
  }

}
