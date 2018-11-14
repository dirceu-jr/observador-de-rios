json.(@station, :id, :navigated, :status_count, :photos_count, :created_at, :updated_at)
json.statuses @statuses, :id, :latitude, :longitude, :ph, :orp, :od, :temperature, :co2, :conductivity, :created_at, :updated_at
json.photos @photos