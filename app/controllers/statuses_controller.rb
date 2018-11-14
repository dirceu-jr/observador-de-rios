class StatusesController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    # curl -d '{"status":{"station_id":"1","latitude":"5","longitude":"5","ph":"5","orp":"5","od":"5","temperature":"5","co2":"5","conductivity":"5"}}' -H "Content-Type: application/json" -X POST http://localhost:3000/statuses
    def create
        @status = Status.new(status_params)
        if @status.save
            render json: @status
        else
            render json: {error: "invalid request"}
        end
    end

    private
    def status_params
      params.require(:status).permit(:station_id, :latitude, :longitude, :ph, :orp, :od, :temperature, :co2, :conductivity)
    end
    
end