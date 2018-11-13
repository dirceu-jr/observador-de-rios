class ChangeCondutivityToConductivity < ActiveRecord::Migration[5.2]
  def change
    remove_column :statuses, :condutivity
    add_column :statuses, :conductivity, :decimal, precision: 8, scale: 2
  end
end
