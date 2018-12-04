class Station < ApplicationRecord
    has_many :statuses, dependent: :destroy
    has_many :photos, dependent: :destroy
end
