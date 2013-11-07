json.array!(@appointments) do |appointment|
  json.extract! appointment, :time, :description, :month, :day, :year
  json.url appointment_url(appointment, format: :json)
end