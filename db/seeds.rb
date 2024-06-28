# # # This file should contain all the record creation needed to seed the database with its default values.
# # # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# # #
# # # Examples:
# # #
# # #   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
# # #   Character.create(name: "Luke", movie: movies.first)
require 'net/http'
require 'uri'
require 'faker'

puts 'start seeding features'

features_list =  [
            {
                title: "User Management",
                icon: "fa fa-user",
                url: "/manageUsers",
                description: "Manage driver and responder accounts.",
                role: "admin"
            },
            {
                title: "Request Management",
                icon: "fa fa-bars",
                url: "/manageRequests",
                description: "Monitor all assistance requests in real-time.",
                role: "admin"
            },
            {
                title: "Service Management",
                icon: "fa fa-server",
                url: "/manageServices",
                description: "Define and manage types of services offered.",
                role: "admin"
            },
            {
                title: "Analytics and Reporting",
                icon: "fa fa-bar-chart",
                url: "/reports",
                description: "Access to comprehensive reports on service usage, response times, user feedback.",
                role: "admin"
            },
            {
                title: "Support and Helpdesk",
                icon: "fa fa-ticket",
                url: "/tickets",
                description: "Provide customer support via chat, email, or phone.",
                role: "admin"
            } ,  

            {
                title: "Profile Management",
                icon: "fa fa-user",
                url: "/profile",
                description: "Personal information (name, contact details, vehicle details).",
                role: "driver"
            },
            {
                title: "Request Assistance",
                icon: "fa fa-car",
                url: "/makeRequest", 
                description: "Option to request different types of assistance (e.g., towing, flat tire, battery jump-start, fuel delivery, lockout service).",
                role: "driver"
            },
            {
                title: "Real-time Tracking",
                icon: "fa fa-map-marker",
                url: "/nearbyResponders",
                description: "View nearby responders on a map.",
                role: "driver"
            },
            {
                title: "Communication",
                icon: "fa fa-envelope",
                url: "/communication",
                description: "In-app chat or call with responders.",
                role: "driver"
            },
            {
                title: "Requests History",
                icon: "fa fa-history",
                url: "/manageRequests",
                description: "Record of all past assistance requests and resolutions",
                role: "driver"
            },
            {
                title: "Payment Integration",
                icon: "fa fa-credit-card-alt",
                url: "/paymentIntegration",
                description: "Multiple payment options (M-Pesa, credit/debit card, mobile banking)",
                role: "driver"
            },
            {
                title: "Emergency SoS",
                icon: "fa fa-ambulance",
                url: "/emergencySoS", 
                description: "One-tap SOS button for urgent help.",
                role: "driver"
            },
            {
                title: "Profile Management",
                icon: "fa fa-user",
                url: "/profile", 
                description: "Professional information (name, company, contact details, services offered).",
                role: "responder"
            },
            {
                title: "Availability Status",
                icon: "fa fa-sliders",
                url: "/status", 
                description: "Set and update availability status (online/offline).",
                role: "responder"
            },
            {
                title: "Requests Management",
                icon: "fa fa-bars",
                url: "/manageRequests", 
                description: "View and accept/decline incoming assistance requests.",
                role: "responder"
            },

            {
                title: "Navigation and Tracking",
                icon: "fa fa-map-marker",
                url: "/viewRequest", 
                description: "Integrated map with route optimization to driver's location."
            },
            {
                title: "Communication",
                icon: "fa fa-envelope-o",
                url: "/communication", 
                description: "In-app chat or call with drivers",
                role: "responder"
            },
            {
                title: "Payment Integration",
                icon: "fa fa-money",
                url: "/paymentIntegration", 
                description: "Secure payment receipt through the app.",
                role: "responder"
            },
            
            {
                title: "Incident Reporting",
                icon: "fa fa-commenting",
                url: "/incidentReporting", 
                description: "Report issues or incidents encountered during service provision.",
                role: "responder"
            }            
            
        ]
    


features_list.map do |feature|
    Feature.create(
        title: feature[:title], 
        icon: feature[:icon], 
        url: feature[:url], 
        description: feature[:description], 
        role: feature[:role]
    )
end

puts 'end seeding features'

puts 'start seeding users and location'
max_latitude = 	-1.01665
max_longitude = 	37.06087
min_latitude = 	-1.51665
min_longitude = 	36.26087

def my_location (lat:, long:)
    url = URI("https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=#{lat}&longitude=#{long}&range=0")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-key"] = '7f689d933cmshd1f74d015bfa401p106de2jsne64c2d046480'
    request["x-rapidapi-host"] = 'geocodeapi.p.rapidapi.com'
    response = http.request(request)
    result = JSON.parse(response.read_body)
    city_country = {latitude: lat, longitude: long, city: result[0]["City"], country: result[0]["Country"]}
end

5.times do 
    username = Faker::Internet.username 
    email = Faker::Internet.email(name: "#{username}", domain: "gmail.com")
    password = 'driver'
    phone_number = Faker::PhoneNumber.cell_phone
    avatar = Faker::Avatar.image(slug: "#{username}", size: "50x50", format: "jpg") 
    puts ([username, email, password, phone_number, avatar])
    @user = User.create(email: "#{email}", password: "#{password}", password_confirmation: "#{password}", phone: "#{phone_number}", role: 'driver')
    @driver = Driver.create(user_id: @user.id, username: username, photo_url: avatar)
    latitude = rand(min_latitude...max_latitude)
    longitude = rand(min_longitude...max_longitude)
    location = my_location(lat: latitude, long: longitude)
    Location.create(user_id: @user.id, latitude: latitude, longitude: longitude, city: location[:city], country: location[:country])
end

puts 'end seeding drivers and location'

puts 'start seeding rescue_services list'
services = [
    {
        title: "Towing",
        description: " They can tow your vehicle to a repair shop or a safe location if it's immobilized due to a breakdown, accident, or other issues."
    },
    {
        title: "Jump Starts",
        description: "They can jump-start your vehicle's dead battery to get it running again."
    },
    {
        title: "Flat Tire Changes" ,
        description: "Road rescue personnel can replace a flat tire with a spare or provide assistance with changing the tire."
    },
    {
        title: "Fuel Delivery" ,
        description: "If you run out of gas, they can provide a limited amount of fuel to help you reach the nearest gas station."
    },
    {
        title: "Lockout Assistance",
        description: "If you're locked out of your vehicle, they can help you gain access by unlocking the doors."
    },
    {
        title: "Winching and Recovery" ,
        description: "If your vehicle is stuck in a ditch, mud, snow, or another difficult situation, they can use a winch to recover it."

    },
    {
        title: "Battery Replacement",
        description: "Some providers may offer battery replacement services, where they replace your dead battery with a new one."
    },
    {
        title: "Minor Repairs" ,
        description: "In some cases, road rescue personnel may be able to perform minor, on-the-spot repairs to get your vehicle back on the road."
    },
    {
        title: "Vehicle Transport",
        description: "They can transport vehicles to a different location, such as from one city to another, if necessary."
    },
    {
        title: "Motorcycle Towing",
        description: "Some providers specialize in towing motorcycles and other two-wheeled vehicles."
    },
    {
        title: "RV or Trailer Towing",
        description: "Roadside assistance for larger vehicles, such as recreational vehicles or trailers, may also be available."
    },
    {
        title: "Long-Distance Towing",
        description: "For situations where your vehicle needs to be towed a significant distance, some providers offer long-distance towing services."
    },
    {
        title: "Emergency Medical Assistance",
        description: "In some cases, road rescue personnel may provide basic first aid or contact emergency services if there are injuries involved in an accident."
    },
    {
        title: "On-Scene Vehicle Diagnosis",
        description: "They may be able to identify and diagnose common vehicle issues to help you understand the problem."
    },
    
]

services.map do |service|
    Service.create(title: service[:title], description: service[:description])
end

puts 'end seeding rescue_services list'

puts 'start seeding responders and location'
2000.times do 
    name = Faker::Company.name 
    bio = Faker::Lorem.paragraph 
    status = "online"
    email = Faker::Internet.email(name: "#{name}") 
    password = "responder"
    role = "responder"
    phone = Faker::PhoneNumber.cell_phone

    @user = User.create(email: email, password: password, password_confirmation: password, phone: "#{phone}", role: role)
    @responder = Responder.create(user_id: @user.id, name: name, bio: bio, status: status)
    6.times do 
        service_id = rand(0..13)
        Servicelist.create(responder_id: @responder.id, service_id: service_id, )
    end
    latitude = rand(min_latitude...max_latitude)
    longitude = rand(min_longitude...max_longitude)
    location = my_location(lat: latitude, long: longitude)
    Location.create(user_id: @user.id, latitude: latitude, longitude: longitude, city: location[:city], country: location[:country])
end

puts 'end seeding responders and location'