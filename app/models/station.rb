class Station < ApplicationRecord
    has_many :photos
    has_many :statuses
    has_many_attached :photos
end
