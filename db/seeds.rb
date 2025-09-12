# require "uri"
# require "net/http"
# require "json"

# url = URI("https://booking-com.p.rapidapi.com/v1/static/cities?country=ke")

# http = Net::HTTP.new(url.host, url.port)
# http.use_ssl = true

# request = Net::HTTP::Get.new(url)
# request["x-rapidapi-key"] = "7f689d933cmshd1f74d015bfa401p106de2jsne64c2d046480"
# request["x-rapidapi-host"] = "booking-com.p.rapidapi.com"

# response = http.request(request)
# locations = JSON.parse(response.read_body)
# lc = []
# locations["result"].map do |location|
#   lc << { city: location["name"], latitude: location["latitude"], longitude: location["longitude"], country: location["country"] }
# end
# lc.map do |l|
#   Location.create(l)
# end

# require "faker"

# roles = ["driver", "provider", "assessor"]
# locations = Location.all
# 10.times do
#   locations.map do |location|
#     role_id = Random.new.rand(0..2)
#     role = roles[role_id]
#     name = Faker::Internet.username
#     email = Faker::Internet.email(name: name, domain: "test")
#     User.create(name: name, email: email, password: "kim123", location_id: location.id, phone: Faker::PhoneNumber.phone_number_with_country_code, role: role)
#   end
# end
# drivers = User.all.filter { |user| user.role == "driver" }
# providers = User.all.filter { |user| user.role == "provider" }
# drivers.map do |driver|
#   make = Faker::Vehicle.make
#   model = Faker::Vehicle.model(make_of_model: make)
#   Vehicle.create(user_id: driver.id, plate_number: Faker::Vehicle.license_plate, make: make, model: model, year: Faker::Vehicle.year)
# end
# coverages = ["individual", "comprehensive", "third-party"]
# Vehicle.all.map do |vehicle|
#   InsurancePolicy.create(vehicle_id: vehicle.id,
#                          end_date: Faker::Date.between_except(from: Date.today, to: 1.year.from_now, excepted: Date.today),
#                          start_date: Faker::Date.between_except(from: 1.year.ago, to: Date.today, excepted: Date.today),
#                          coverage_type: coverages[Random.new.rand(0..2)],
#                          premium_amount: Random.new.rand(500..1200),
#                          status: 0)
# end

# require "faker"
# puts "start seeding"

# ["Flat Tire ",
#  "Engine Trouble",
#  "Out Of Fuel",
#  "Dead Battery",
#  "Lockout Out",
#  "Accident"].map do |s|
#   Service.create(name: s)
# end
# Location.create(city: "Embakasi West", district: "Kariobangi South", latitude: "-1.2594066", longitude: "36.8916509")
# Driver.create(name: "driver", email: "driver@driver.com", password: "driver123", phone: "+254711808129")
# Admin.create(name: "admin", email: "admin@admin.com", password: "admin123", phone: "+254711808129")
# Provider.create(name: "provider", email: "provider@provider.com", password: "provider123", phone: "+254711808129", location_id: Location.first.id)

# make = Faker::Vehicle.make
# model = Faker::Vehicle.model(make_of_model: make)

# Driver.first.vehicles.create(plate_number: Faker::Vehicle.license_plate, make: make, model: model, year: Faker::Vehicle.year)
# puts "end seeding "
# puts "users #{User.count} services #{Service.count} Vehicles #{Vehicle.count} Locations #{Location.count}"

# puts " #{User.count} users"
# puts "end of seeding #{Location.count} locations, #{Service.count} services, and #{User.count} users, #{Vehicle.count} vehicles"
