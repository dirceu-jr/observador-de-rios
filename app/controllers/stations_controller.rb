class StationsController < ApplicationController

    def index
    end

    def show
        @station = Station.find_by_id(params[:id])
        @statuses = @station.statuses.order(id: :desc).take(7)
        @photos = @station.photos.take(4)
    end
end
