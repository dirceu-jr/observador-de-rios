class Station < ApplicationRecord
    has_many :statuses, dependent: :delete_all
    has_many :photos, dependent: :destroy
end
