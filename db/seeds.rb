require "uri"
require "net/http"
require "json"

url = URI("https://booking-com.p.rapidapi.com/v1/static/cities?country=ke")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["x-rapidapi-key"] = "7f689d933cmshd1f74d015bfa401p106de2jsne64c2d046480"
request["x-rapidapi-host"] = "booking-com.p.rapidapi.com"

response = http.request(request)
locations = JSON.parse(response.read_body)
lc = []
locations["result"].map do |location|
  lc << { city: location["name"], latitude: location["latitude"], longitude: location["longitude"], country: location["country"] }
end
lc.map do |l|
  Location.create(l)
end

["Towing service",
 "Mechanical Breakdown Assistance",
 "Flat Tire / Tire Change",
 "Fuel Delivery",
 "Battery Jump Start",
 "Lockout Assistance",
 "Stuck Vehicle Recovery",
 "Insurance Contact Service",
 "Assessment Request"].map do |s|
  Service.create(name: s)
end

[
  { name: "driver", email: "driver@driver.com", password: "driver123", role: "driver", phone: "+254711808129" },
  { name: "admin", email: "admin@admin.com", password: "admin123", role: "admin", phone: "+254711808129" },
  { name: "assessor", email: "assessor@assessor.com", password: "assessor123", role: "assessor", phone: "+254711808129" },
  { name: "insurer", email: "insurer@driver.com", password: "insurer123", role: "insurer", phone: "+254711808129" },
].map do |user|
  User.create(user)
end
puts "end of seeding #{Location.count} locations, #{Service.count} services, and #{User.count} users"
