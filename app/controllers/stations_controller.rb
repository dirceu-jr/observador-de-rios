class StationsController < ApplicationController
    
    SENSOR_TO_NAME = {
        "ph" => "pH",
        "orp" => "ORP (Potencial de Oxidação)",
        "od" => "Oxigênio Dissolvido",
        "conductivity" => "Condutividade",
        "temperature" => "Temperatura",
        "co2" => "CO2 na superficie"
    }

    SENSOR_TO_CSS_CLASS = {
        "ph" => "success",
        "orp" => "info",
        "od" => "primary",
        "conductivity" => "rose",
        "temperature" => "danger",
        "co2" => "warning"
    }

    def show
        @station = Station.find_by_id(params[:id])
        @statuses = @station.statuses.order(id: :desc).take(7)
        @photos = @station.photos.take(4)
    end

    def details
        @station = Station.find_by_id(params[:id])
        @statuses = @station.statuses.order(id: :desc).take(20)

        @sensor_name = SENSOR_TO_NAME[params[:sensor]]
        @sensor_css_name = SENSOR_TO_CSS_CLASS[params[:sensor]]
    end
end
