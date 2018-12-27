namespace :data do
    desc "Populate past data"
    task :populate_past => :environment do
      50000.times do |i|
        s = Status.new
        s.station_id = 4
        s.latitude = -23.328147
        s.longitude = -51.170940
        s.ph = rand(7)
        s.orp = rand(10)
        s.od = rand(10)
        s.temperature = rand(30)
        s.co2 = rand(10)
        s.conductivity = rand(10)
        s.created_at = Time.now - (i * 300)
        s.updated_at = Time.now - (i * 300)

        s.save

        p Time.now - (i * 300)
      end
    end
  end