class User < ApplicationRecord
	mount_uploader :dp, DpUploader
	has_many :tweets
end
