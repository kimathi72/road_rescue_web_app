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
