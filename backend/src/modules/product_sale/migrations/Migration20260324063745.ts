import { Migration } from '@mikro-orm/migrations';

export class Migration20260324063745 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "product_sale" ("id" text not null, "product_id" text not null, "order_id" text not null, "line_item_id" text not null, "quantity" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_sale_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_sale_deleted_at" ON "product_sale" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product_sale" cascade;`);
  }

}
