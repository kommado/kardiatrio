-- Create "patients" table
CREATE TABLE `patients` (
  `id` integer NULL PRIMARY KEY AUTOINCREMENT,
  `created_at` datetime NULL,
  `updated_at` datetime NULL,
  `deleted_at` datetime NULL,
  `full_name` text NULL,
  `father_name` text NULL,
  `amka` text NULL
);
-- Create index "idx_patients_deleted_at" to table: "patients"
CREATE INDEX `idx_patients_deleted_at` ON `patients` (`deleted_at`);
