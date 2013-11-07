class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.string :time
      t.string :description
      t.integer :month
      t.integer :day
      t.integer :year

      t.timestamps
    end
  end
end
