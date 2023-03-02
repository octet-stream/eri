import { Migration } from '@mikro-orm/migrations';

export class Migration20220814180845 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` modify `email_verified` datetime;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` modify `email_verified` json;');
  }

}
