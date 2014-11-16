module FabrikaPrazdnikof
  class Photo < ActiveRecord::Base
    include FabrikaPrazdnikof::DbConnect
    extend ::Dragonfly::Model
    extend ::Dragonfly::Model::Validations

    dragonfly_accessor :image do
      storage_options do |a|
        { path: "#{self.key}/#{Time.now.to_i}.#{a.format}" }
      end
      after_assign{|a| a.thumb!('800x') }
      copy_to(:thumb){|a| a.thumb('200x140#ne') }
    end

    dragonfly_accessor :thumb do
      storage_options do |a|
        { path: "#{self.key}/thumbs/#{Time.now.to_i}.#{a.format}" }
      end
    end
  end
end