ActiveAdmin.register Status do
    permit_params :latitude, :longitude, :ph, :orp, :od, :condutivity, :temperature, :co2
end
