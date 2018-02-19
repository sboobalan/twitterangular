class CreateTweets < ActiveRecord::Migration[5.1]
  def change
    create_table :tweets do |t|
      t.string :username
      t.string :text
      t.string :status
      t.string :approvedby
      t.string :image

      t.timestamps
    end
  end
end
