import { Migration } from "@mikro-orm/migrations"

export class Migration20260227100000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table if not exists "listing_fee_rule" ("id" text not null, "duration_hours" integer not null, "fee_bps" integer not null, "is_active" boolean not null default true, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "listing_fee_rule_pkey" primary key ("id"));'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_listing_fee_rule_deleted_at" ON "listing_fee_rule" (deleted_at) WHERE deleted_at IS NULL;'
    )
    this.addSql(
      'CREATE UNIQUE INDEX IF NOT EXISTS "IDX_listing_fee_rule_duration_hours_unique" ON "listing_fee_rule" (duration_hours) WHERE deleted_at IS NULL;'
    )
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "listing_fee_rule" cascade;')
  }
}
