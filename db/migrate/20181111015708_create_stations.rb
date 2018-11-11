class CreateStations < ActiveRecord::Migration[5.2]
  def change
    create_table :stations do |t|
      t.string :name
      t.decimal :navigated, precision: 8, scale: 2
      t.integer :status_count
      t.integer :photos_count
      t.boolean :isvisible
      t.timestamps
    end
  end
end
