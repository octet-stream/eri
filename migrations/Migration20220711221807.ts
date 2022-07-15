import { Migration } from '@mikro-orm/migrations';

export class Migration20220711221807 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `post` add unique `post_slug_unique`(`slug`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `post` drop index `post_slug_unique`;');
  }

}
