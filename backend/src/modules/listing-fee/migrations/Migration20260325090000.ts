import { Migration } from "@mikro-orm/migrations"

export class Migration20260325090000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
            AND table_name = 'listing_fee_rule'
        ) THEN
          IF NOT EXISTS (
            SELECT 1
            FROM pg_constraint
            WHERE conname = 'listing_fee_rule_duration_hours_unique'
          ) THEN
            ALTER TABLE "listing_fee_rule"
            ADD CONSTRAINT "listing_fee_rule_duration_hours_unique"
            UNIQUE ("duration_hours");
          END IF;
        END IF;
      END $$;
    `)
  }

  override async down(): Promise<void> {
    this.addSql(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
            AND table_name = 'listing_fee_rule'
        ) THEN
          IF EXISTS (
            SELECT 1
            FROM pg_constraint
            WHERE conname = 'listing_fee_rule_duration_hours_unique'
          ) THEN
            ALTER TABLE "listing_fee_rule"
            DROP CONSTRAINT "listing_fee_rule_duration_hours_unique";
          END IF;
        END IF;
      END $$;
    `)
  }
}