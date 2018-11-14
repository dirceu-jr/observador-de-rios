include ActionView::Helpers::DateHelper

class Photo < ApplicationRecord
    belongs_to :station
    mount_uploader :file, PhotosUploader

    def time_ago
        time_ago_in_words(self.created_at)
    end
end