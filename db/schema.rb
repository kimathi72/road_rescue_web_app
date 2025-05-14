# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_05_13_103909) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "assessment_photos", force: :cascade do |t|
    t.text "image_url"
    t.bigint "assessment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assessment_id"], name: "index_assessment_photos_on_assessment_id"
  end

  create_table "assessments", force: :cascade do |t|
    t.bigint "claim_id", null: false
    t.string "report_url"
    t.float "estimated_cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "assessor_id", null: false
    t.integer "fault"
    t.index ["assessor_id"], name: "index_assessments_on_assessor_id"
    t.index ["claim_id"], name: "index_assessments_on_claim_id"
  end

  create_table "assessors", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "insurance_id", null: false
    t.index ["insurance_id"], name: "index_assessors_on_insurance_id"
  end

  create_table "claims", force: :cascade do |t|
    t.integer "status"
    t.float "approved_amount"
    t.date "payout_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "incident_id", null: false
    t.bigint "insurance_policy_id", null: false
    t.bigint "assessor_id", null: false
    t.text "insurer_decision"
    t.index ["assessor_id"], name: "index_claims_on_assessor_id"
    t.index ["incident_id"], name: "index_claims_on_incident_id"
    t.index ["insurance_policy_id"], name: "index_claims_on_insurance_policy_id"
  end

  create_table "drivers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "insurance_id", null: false
    t.index ["insurance_id"], name: "index_drivers_on_insurance_id"
  end

  create_table "incident_photos", force: :cascade do |t|
    t.string "image_url"
    t.bigint "incident_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["incident_id"], name: "index_incident_photos_on_incident_id"
  end

  create_table "incidents", force: :cascade do |t|
    t.bigint "vehicle_id", null: false
    t.datetime "date_time"
    t.bigint "location_id", null: false
    t.text "description"
    t.text "police_report_url"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_incidents_on_location_id"
    t.index ["vehicle_id"], name: "index_incidents_on_vehicle_id"
  end

  create_table "insurance_policies", force: :cascade do |t|
    t.string "policy_number"
    t.bigint "insurer_id", null: false
    t.date "start_date"
    t.date "end_date"
    t.integer "coverage_type"
    t.float "premium_amount"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["insurer_id"], name: "index_insurance_policies_on_insurer_id"
  end

  create_table "insurances", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "insurers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "insurance_id", null: false
    t.index ["insurance_id"], name: "index_insurers_on_insurance_id"
  end

  create_table "locations", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.string "city"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "request_id", null: false
    t.string "type"
    t.string "message"
    t.boolean "read_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["request_id"], name: "index_notifications_on_request_id"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "providers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "availability"
  end

  create_table "requests", force: :cascade do |t|
    t.string "request_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.bigint "rescue_provider_id"
    t.bigint "incident_id", null: false
    t.datetime "response_time"
    t.text "rescue_notes"
    t.float "invoice_amount"
    t.bigint "provider_id", null: false
    t.index ["incident_id"], name: "index_requests_on_incident_id"
    t.index ["provider_id"], name: "index_requests_on_provider_id"
    t.index ["rescue_provider_id"], name: "index_requests_on_rescue_provider_id"
  end

  create_table "rescue_providers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "insurance_id"
    t.index ["insurance_id"], name: "index_rescue_providers_on_insurance_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "driver_id"
    t.string "remark"
    t.integer "rating"
    t.integer "response_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "services", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "role"
    t.bigint "location_id"
    t.index ["location_id"], name: "index_users_on_location_id"
  end

  create_table "vehicles", force: :cascade do |t|
    t.bigint "driver_id"
    t.string "make"
    t.string "model"
    t.string "plate_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "year"
    t.bigint "insurance_policy_id"
    t.index ["driver_id"], name: "index_vehicles_on_driver_id"
    t.index ["insurance_policy_id"], name: "index_vehicles_on_insurance_policy_id"
  end

  add_foreign_key "assessment_photos", "assessments"
  add_foreign_key "assessments", "assessors"
  add_foreign_key "assessments", "claims"
  add_foreign_key "assessors", "insurances"
  add_foreign_key "claims", "assessors"
  add_foreign_key "claims", "incidents"
  add_foreign_key "claims", "insurance_policies"
  add_foreign_key "drivers", "insurances"
  add_foreign_key "incident_photos", "incidents"
  add_foreign_key "incidents", "locations"
  add_foreign_key "incidents", "vehicles"
  add_foreign_key "insurance_policies", "insurers"
  add_foreign_key "insurers", "insurances"
  add_foreign_key "notifications", "requests"
  add_foreign_key "notifications", "users"
  add_foreign_key "requests", "incidents"
  add_foreign_key "requests", "providers"
  add_foreign_key "requests", "rescue_providers"
  add_foreign_key "rescue_providers", "insurances"
  add_foreign_key "users", "locations"
  add_foreign_key "vehicles", "drivers"
  add_foreign_key "vehicles", "insurance_policies"
end
