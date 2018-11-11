class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.references :station
      t.string :file
      t.timestamps
    end
  end
end
