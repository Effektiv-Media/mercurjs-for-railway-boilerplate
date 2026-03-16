import { Migration } from "@mikro-orm/migrations"

export class Migration20260227102000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
            AND table_name = 'configuration_rule'
        ) THEN
          EXECUTE $ins$
            INSERT INTO "configuration_rule" ("id", "rule_type", "is_enabled")
            SELECT 'conf_rule_global_product_catalog', 'global_product_catalog', false
            WHERE NOT EXISTS (
              SELECT 1
              FROM "configuration_rule"
              WHERE "rule_type" = 'global_product_catalog'
                AND "deleted_at" IS NULL
            );
          $ins$;

          EXECUTE $ins$
            INSERT INTO "configuration_rule" ("id", "rule_type", "is_enabled")
            SELECT 'conf_rule_require_product_approval', 'require_product_approval', false
            WHERE NOT EXISTS (
              SELECT 1
              FROM "configuration_rule"
              WHERE "rule_type" = 'require_product_approval'
                AND "deleted_at" IS NULL
            );
          $ins$;

          EXECUTE $ins$
            INSERT INTO "configuration_rule" ("id", "rule_type", "is_enabled")
            SELECT 'conf_rule_product_request_enabled', 'product_request_enabled', true
            WHERE NOT EXISTS (
              SELECT 1
              FROM "configuration_rule"
              WHERE "rule_type" = 'product_request_enabled'
                AND "deleted_at" IS NULL
            );
          $ins$;

          EXECUTE $ins$
            INSERT INTO "configuration_rule" ("id", "rule_type", "is_enabled")
            SELECT 'conf_rule_product_import_enabled', 'product_import_enabled', true
            WHERE NOT EXISTS (
              SELECT 1
              FROM "configuration_rule"
              WHERE "rule_type" = 'product_import_enabled'
                AND "deleted_at" IS NULL
            );
          $ins$;
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
            AND table_name = 'configuration_rule'
        ) THEN
          DELETE FROM "configuration_rule"
          WHERE "id" IN (
            'conf_rule_global_product_catalog',
            'conf_rule_require_product_approval',
            'conf_rule_product_request_enabled',
            'conf_rule_product_import_enabled'
          );
        END IF;
      END $$;
    `)
  }
}
