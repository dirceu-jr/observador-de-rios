class Station < ApplicationRecord
    has_many :statuses
    has_many :photos
end
