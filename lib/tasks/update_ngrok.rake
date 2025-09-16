# lib/tasks/update_ngrok.rake
require "net/http"
require "yaml"

namespace :ngrok do
  desc "Fetch ngrok URL and update config/local_env.yml"
  task :update_url do
    begin
      uri = URI("http://127.0.0.1:4040/api/tunnels")
      response = Net::HTTP.get(uri)
      data = JSON.parse(response)

      # Pick the first HTTPS tunnel
      https_tunnel = data["tunnels"].find { |t| t["public_url"].start_with?("https") }
      raise "No ngrok tunnels found" unless https_tunnel

      new_url = https_tunnel["public_url"]
      puts " Found ngrok URL: #{new_url}"

      env_file = Rails.root.join("config", "local_env.yml")
      env = File.exist?(env_file) ? YAML.load_file(env_file) : {}
      env["CALLBACK_URL"] = new_url

      File.open(env_file, "w") { |f| f.write(env.to_yaml) }
      puts "Updated #{env_file}"
    rescue => e
      puts "Failed to update ngrok URL: #{e.message}"
    end
  end
end
