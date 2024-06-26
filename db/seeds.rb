# # # This file should contain all the record creation needed to seed the database with its default values.
# # # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# # #
# # # Examples:
# # #
# # #   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
# # #   Character.create(name: "Luke", movie: movies.first)
# # require 'faker'

# # puts 'start seeding'

# # features_list =  [
# #             {
# #                 title: "User Management",
# #                 icon: "fa fa-user",
# #                 url: "/manageUsers",
# #                 description: "Manage driver and responder accounts.",
# #                 role: "admin"
# #             },
# #             {
# #                 title: "Request Management",
# #                 icon: "fa fa-bars",
# #                 url: "/manageRequests",
# #                 description: "Monitor all assistance requests in real-time.",
# #                 role: "admin"
# #             },
# #             {
# #                 title: "Service Management",
# #                 icon: "fa fa-server",
# #                 url: "/manageServices",
# #                 description: "Define and manage types of services offered.",
# #                 role: "admin"
# #             },
# #             # {
# #                 title: "Analytics and Reporting",
# #                 icon: "fa fa-bar-chart",
# #                 url: "/reports",
# #                 description: "Access to comprehensive reports on service usage, response times, user feedback.",
# #                 role: "admin"
# #             },
# #             {
# #                 title: "Support and Helpdesk",
# #                 icon: "fa fa-ticket",
# #                 url: "/tickets",
# #                 description: "Provide customer support via chat, email, or phone.",
# #                 role: "admin"
# #             } ,  

# #             {
# #                 title: "Profile Management",
# #                 icon: "fa fa-user",
# #                 url: "/profile",
# #                 description: "Personal information (name, contact details, vehicle details).",
# #                 role: "driver"
# #             },
# #             {
# #                 title: "Request Assistance",
# #                 icon: "fa fa-car",
# #                 url: "/makeRequest", 
# #                 description: "Option to request different types of assistance (e.g., towing, flat tire, battery jump-start, fuel delivery, lockout service).",
# #                 role: "driver"
# #             },
# #             {
# #                 title: "Real-time Tracking",
# #                 icon: "fa fa-map-marker",
# #                 url: "/nearbyResponders",
# #                 description: "View nearby responders on a map.",
# #                 role: "driver"
# #             },
# #             {
# #                 title: "Communication",
# #                 icon: "fa fa-envelope",
# #                 url: "/communication",
# #                 description: "In-app chat or call with responders.",
# #                 role: "driver"
# #             },
# #             {
# #                 title: "Requests History",
# #                 icon: "fa fa-history",
# #                 url: "/manageRequests",
# #                 description: "Record of all past assistance requests and resolutions",
# #                 role: "driver"
# #             },
# #             {
# #                 title: "Payment Integration",
# #                 icon: "fa fa-credit-card-alt",
# #                 url: "/paymentIntegration",
# #                 description: "Multiple payment options (M-Pesa, credit/debit card, mobile banking)",
# #                 role: "driver"
# #             },
# #             {
# #                 title: "Emergency SoS",
# #                 icon: "fa fa-ambulance",
# #                 url: "/emergencySoS", 
# #                 description: "One-tap SOS button for urgent help.",
# #                 role: "driver"
# #             },
# #             {
# #                 title: "Profile Management",
# #                 icon: "fa fa-user",
# #                 url: "/profile", 
# #                 description: "Professional information (name, company, contact details, services offered).",
# #                 role: "responder"
# #             },
# #             {
# #                 title: "Availability Status",
# #                 icon: "fa fa-sliders",
# #                 url: "/status", 
# #                 description: "Set and update availability status (online/offline).",
# #                 role: "responder"
# #             },
# #             {
# #                 title: "Requests Management",
# #                 icon: "fa fa-bars",
# #                 url: "/manageRequests", 
# #                 description: "View and accept/decline incoming assistance requests.",
# #                 role: "responder"
# #             },

# #             {
# #                 title: "Navigation and Tracking",
# #                 icon: "fa fa-map-marker",
# #                 url: "/viewRequest", 
# #                 description: "Integrated map with route optimization to driver's location."
# #             },
# #             {
# #                 title: "Communication",
# #                 icon: "fa fa-envelope-o",
# #                 url: "/communication", 
# #                 description: "In-app chat or call with drivers",
# #                 role: "responder"
# #             },
# #             {
# #                 title: "Payment Integration",
# #                 icon: "fa fa-money",
# #                 url: "/paymentIntegration", 
# #                 description: "Secure payment receipt through the app.",
# #                 role: "responder"
# #             },
            
# #             {
# #                 title: "Incident Reporting",
# #                 icon: "fa fa-commenting",
# #                 url: "/incidentReporting", 
# #                 description: "Report issues or incidents encountered during service provision.",
# #                 role: "responder"
# #             }            
            
# #         ]
    


# # features_list.map do |feature|
# #     puts feature[:title]
# #         Feature.create(
# #             title: feature[:title], 
# #             icon: feature[:icon], 
# #             url: feature[:url], 
# #             description: feature[:description], 
# #             role: feature[:role]
# #         )


# # end

# # puts 'end seeding'
require 'net/http'
require 'uri'
puts 'start seeding'
latitude = 	-1.14665
longitude = 	36.96087

city_country = get_location(latitude: latitude, longitude: longitude)
        
puts city_country


puts 'end seeding'