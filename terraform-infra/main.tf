# Provider configuration
provider "google" {
  project     = var.project_id
  region      = var.region
  credentials = file(var.credentials_file)
}

# Bucket GCS
resource "google_storage_bucket" "json_bucket" {
  name          = "${var.project_id}-json-bucket"
  location      = var.region
  force_destroy = true
}

# Upload JSON file to GCS
resource "google_storage_bucket_object" "json_file" {
  name   = "test.json"
  bucket = google_storage_bucket.json_bucket.name
  source = "${path.module}/test.json"
}


# BigQuery Dataset
resource "google_bigquery_dataset" "logs_dataset" {
  dataset_id = "json_logs"
  project    = var.project_id
  location   = var.region
}

# BigQuery Table
resource "google_bigquery_table" "logs_table" {
  dataset_id = google_bigquery_dataset.logs_dataset.dataset_id
  table_id   = "test_table"
  project    = var.project_id

  schema = jsonencode([
    {
      name = "message"
      type = "STRING"
      mode = "NULLABLE"
    },
    {
      name = "timestamp"
      type = "TIMESTAMP"
      mode = "NULLABLE"
    },
    {
      name = "level"
      type = "STRING"
      mode = "NULLABLE"
    },
    {
      name = "user"
      type = "STRING"
      mode = "NULLABLE"
    }
  ])
}

output "upload_details" {
  value = {
    bucket_name = google_storage_bucket.json_bucket.name
    object_url  = "gs://${google_storage_bucket.json_bucket.name}/${google_storage_bucket_object.json_file.name}"
  }
}
