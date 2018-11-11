class Station < ApplicationRecord
    has_many :photos
    has_many :statuses
end
