ActiveAdmin.register Status do
    permit_params :station_id, :latitude, :longitude, :ph, :orp, :od, :conductivity, :temperature, :co2
end
