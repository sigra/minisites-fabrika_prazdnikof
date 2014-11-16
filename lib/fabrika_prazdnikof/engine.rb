module FabrikaPrazdnikof
  class Engine < ::Rails::Engine
    isolate_namespace FabrikaPrazdnikof
  end

  # Don't have prefix method return anything.
  # This will keep Rails Engine from generating all table prefixes with the engines name
  def self.table_name_prefix
  end
end