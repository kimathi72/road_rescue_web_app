require "faker"
puts "start seeding"

["Flat Tire ",
 "Engine Trouble",
 "Out Of Fuel",
 "Dead Battery",
 "Locked Out",
 "Road Accident"].map do |s|
  Service.create(name: s)
end
Location.create(city: "Embakasi West", district: "Kariobangi South", latitude: "-1.2594066", longitude: "36.8916509")
Driver.create(name: "driver", email: "driver@driver.com", password: "driver123", phone: "+254711808129")
Admin.create(name: "admin", email: "admin@admin.com", password: "admin123", phone: "+254711808129")
Provider.create(name: "provider", email: "provider@provider.com", password: "provider123", phone: "+254711808129", location_id: Location.first.id)

make = Faker::Vehicle.make
model = Faker::Vehicle.model(make_of_model: make)

Driver.first.vehicles.create(plate_number: Faker::Vehicle.license_plate, make: make, model: model, year: Faker::Vehicle.year)
puts "end seeding "
puts "users #{User.count} services #{Service.count} Vehicles #{Vehicle.count} Locations #{Location.count}"

puts " #{User.count} users"
puts "end of seeding #{Location.count} locations, #{Service.count} services, and #{User.count} users, #{Vehicle.count} vehicles"
