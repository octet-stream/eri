import { Migration } from '@mikro-orm/migrations';

export class Migration20220715213720 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `role` enum(\'super\', \'regular\') not null default \'regular\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `role`;');
  }

}
