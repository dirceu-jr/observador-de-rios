class CreateStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :statuses do |t|
      t.references :station
      t.decimal :latitude, precision: 12, scale: 7
      t.decimal :longitude, precision: 12, scale: 7
      t.decimal :ph, precision: 8, scale: 2
      t.decimal :orp, precision: 8, scale: 2
      t.decimal :od, precision: 8, scale: 2
      t.decimal :condutivity, precision: 8, scale: 2
      t.decimal :temperature, precision: 8, scale: 2
      t.decimal :co2, precision: 8, scale: 2
      t.timestamps
    end
  end
end
