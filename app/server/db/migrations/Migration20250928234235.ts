import {Migration} from "@mikro-orm/migrations"

export class Migration20250928234235 extends Migration {
  override async up(): Promise<void> {
    this.addSql("alter table `passkey` add `aaguid` varchar(255) null;")
  }

  override async down(): Promise<void> {
    this.addSql("alter table `passkey` drop column `aaguid`;")
  }
}
