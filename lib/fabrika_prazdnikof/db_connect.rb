require 'active_support/concern'

module FabrikaPrazdnikof
  module DbConnect
    extend ::ActiveSupport::Concern

    included do
      establish_connection adapter: 'sqlite3', database: "db/fabrika_prazdnikof.sqlite3"
    end
  end
end