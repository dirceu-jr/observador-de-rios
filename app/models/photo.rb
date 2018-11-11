class Photo < ApplicationRecord
    belongs_to :station
    mount_uploader :file, PhotosUploader
end