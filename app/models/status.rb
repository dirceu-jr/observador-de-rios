include ActionView::Helpers::DateHelper

class Status < ApplicationRecord
    belongs_to :station

    def time_ago
        time_ago_in_words(self.created_at)
    end
end
