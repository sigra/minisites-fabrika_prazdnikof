module FabrikaPrazdnikof
  class Page < ActiveRecord::Base
    include FabrikaPrazdnikof::DbConnect
  end
end