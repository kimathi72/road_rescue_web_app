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

ActiveRecord::Schema[7.0].define(version: 2025_04_28_121305) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "assessments", force: :cascade do |t|
    t.bigint "claim_id", null: false
    t.string "report_url"
    t.float "estimated_cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.bigint "insurance_id", null: false
    t.index ["insurance_id"], name: "index_claims_on_insurance_id"
  end

  create_table "drivers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "insurance_id", null: false
    t.index ["insurance_id"], name: "index_drivers_on_insurance_id"
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

  create_table "requests", force: :cascade do |t|
    t.integer "driver_id"
    t.integer "service_id"
    t.string "request_description"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "location_id", null: false
    t.index ["location_id"], name: "index_requests_on_location_id"
  end

  create_table "rescue_providers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "insurance_id"
    t.bigint "location_id", null: false
    t.index ["insurance_id"], name: "index_rescue_providers_on_insurance_id"
    t.index ["location_id"], name: "index_rescue_providers_on_location_id"
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
    t.string "type"
  end

  add_foreign_key "assessments", "claims"
  add_foreign_key "assessors", "insurances"
  add_foreign_key "claims", "insurances"
  add_foreign_key "drivers", "insurances"
  add_foreign_key "insurers", "insurances"
  add_foreign_key "notifications", "requests"
  add_foreign_key "notifications", "users"
  add_foreign_key "requests", "locations"
  add_foreign_key "rescue_providers", "insurances"
  add_foreign_key "rescue_providers", "locations"
end
